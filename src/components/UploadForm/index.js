import { auth, db, storage, ref, uploadBytesResumable, getDownloadURL } from '~/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import classNames from 'classnames/bind';
import styles from './UploadForm.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseBtn from '../CloseBtn';
import validator from '~/services/validate';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '~/configs/routes';

const cx = classNames.bind(styles);

function UploadForm({ onClick }) {
    const navigate = useNavigate();
    const uploadURL = 'https://imageshop-d8a14-default-rtdb.europe-west1.firebasedatabase.app/images.json';
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isValidFile, setIsValidFile] = useState(false);
    const [isValidDescription, setIsValidDescription] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [btnContent, setBtnContent] = useState(() => {
        return 'Upload';
    });

    useEffect(() => {
        setIsValid(isValidFile && isValidDescription);
    }, [isValidFile, isValidDescription]);

    useEffect(() => {
        if (loading || isUploading) {
            setBtnContent(<Loading width="16px" height="16px" />);
            return;
        } else {
            setBtnContent('Upload');
        }

        if (user) {
            fetchUserName();
        }
    }, [user, loading, error, isUploading]);

    const handleValidate = (setter, rules) => {
        const isValidValue = validator({
            errForm: cx('form-item__error-msg'),
            rules,
        });

        setter(isValidValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        const storageRef = ref(storage, `images/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setIsUploading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            },
            async () => {
                let url = await getDownloadURL(uploadTask.snapshot.ref);
                let res = await fetch(uploadURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        url,
                        name,
                        description,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                res = await res.json();
                setIsUploading(false)
                if (res.name) {
                    toast.success('Upload Successful', {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    setTimeout(() => {

                        navigate(routes.home);
                    }, 1000)
                }
                console.log(res);
            },
        );
    };

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            // console.log(data.name);
        } catch (err) {
            console.error(err);
            toast.error('An error occured while fetching user data', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <div className={cx('logo')}>
                    <h3>Upload your photo</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={cx('form')} id="submit-form">
                <div className={cx('form-item')}>
                    <label htmlFor="file" className={cx('form-item__label')}>
                        File
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="file"
                        name="file"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                            handleValidate(setIsValidFile, [validator.isRequired(e.target)]);
                            setFile(e.target.files[0]);
                        }}
                        onFocus={(e) => handleValidate(setIsValidFile, [validator.isRequired(e.target)])}
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>

                <div className={cx('form-item')}>
                    <label htmlFor="description" className={cx('form-item__label')}>
                        Description
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={(e) => {
                            handleValidate(setIsValidDescription, [validator.isRequired(e.target)]);

                            setDescription(e.target.value);
                        }}
                        onFocus={(e) => handleValidate(setIsValidDescription, [validator.isRequired(e.target)])}
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>

                <button disabled={!isValid} type="submit" className={cx('submit-btn')}>
                    <p>{btnContent}</p>
                </button>
            </form>
            <CloseBtn onClick={onClick} />
        </div>
    );
}

export default UploadForm;
