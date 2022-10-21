import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';
import { useState, useEffect, useLayoutEffect } from 'react';
import { IconBrand } from '../Icons/Icons';
import CloseBtn from '../CloseBtn';
import validator from '~/services/validate';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function InputForm({ type = 'login', onClick }) {
    const [user, loading, error] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [btnContent, setBtnContent] = useState(() => {
        return isLoginMode ? 'Login' : 'Register';
    });

    useLayoutEffect(() => {
        if (type === 'register') {
            setIsLoginMode(false);
        } else if (type === 'login') {
            setIsLoginMode(true);
        }
    }, [type]);

    useEffect(() => {
        if (isLoginMode) {
            setIsValid(isValidEmail && isValidPassword);
        } else {
            setIsValid(isValidFirstName && isValidLastName && isValidEmail && isValidPassword);
        }
    }, [isValidFirstName, isValidLastName, isValidEmail, isValidPassword, isLoginMode]);

    useEffect(() => {
        if (loading) {
            setBtnContent(<Loading width="16px" height="16px" />);
            return;
        } else {
            setBtnContent(isLoginMode ? 'Login' : 'Register');
        }

        if (user) {
        }
    }, [user, loading, error, isLoginMode]);

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

        if (isLoginMode) {
            const err = await logInWithEmailAndPassword(email, password);

            if (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                toast.success('Login Sucessful!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
                onClick();
            }
        } else {
            const err = await registerWithEmailAndPassword(firstName + ' ' + lastName, email, password);
            console.log(err);

            if (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                toast.success('Register Sucessful!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
                onClick();
            }
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <div className={cx('logo')}>
                    <IconBrand className={cx('logo-img')} />
                    <h3>{isLoginMode ? 'Login' : 'Register'}</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={cx('form')} id="submit-form">
                {!isLoginMode && (
                    <div className={cx('form-item')}>
                        <label htmlFor="firstName" className={cx('form-item__label')}>
                            First Name
                        </label>
                        <input
                            className={cx('form-item__input')}
                            id="first-name"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                                handleValidate(setIsValidFirstName, [validator.isRequired(e.target)]);
                                setFirstName(e.target.value);
                            }}
                            onFocus={(e) => handleValidate(setIsValidFirstName, [validator.isRequired(e.target)])}
                        />
                        <p className={cx('form-item__error-msg')}></p>
                    </div>
                )}
                {!isLoginMode && (
                    <div className={cx('form-item')}>
                        <label htmlFor="lastName" className={cx('form-item__label')}>
                            Last Name
                        </label>
                        <input
                            className={cx('form-item__input')}
                            id="last-name"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                                handleValidate(setIsValidLastName, [validator.isRequired(e.target)]);

                                setLastName(e.target.value);
                            }}
                            onFocus={(e) => handleValidate(setIsValidLastName, [validator.isRequired(e.target)])}
                        />
                        <p className={cx('form-item__error-msg')}></p>
                    </div>
                )}
                <div className={cx('form-item')}>
                    <label htmlFor="email" className={cx('form-item__label')}>
                        Email
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            handleValidate(setIsValidEmail, [
                                validator.isRequired(e.target),
                                validator.isEmail(e.target),
                            ]);

                            setEmail(e.target.value);
                        }}
                        onFocus={(e) =>
                            handleValidate(setIsValidEmail, [
                                validator.isRequired(e.target),
                                validator.isEmail(e.target),
                            ])
                        }
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>
                <div className={cx('form-item')}>
                    <label htmlFor="password" className={cx('form-item__label')}>
                        Password
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            handleValidate(setIsValidPassword, [
                                validator.isRequired(e.target),
                                validator.exceedMinLength(e.target, 8),
                            ]);
                            setPassword(e.target.value);
                        }}
                        onFocus={(e) =>
                            handleValidate(setIsValidPassword, [
                                validator.isRequired(e.target),
                                validator.exceedMinLength(e.target, 8),
                            ])
                        }
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>

                <button disabled={!isValid} type="submit" className={cx('submit-btn')}>
                    <p>{btnContent}</p>
                </button>
            </form>
            <CloseBtn onClick={onClick} className={cx('close-btn')} />
        </div>
    );
}

export default InputForm;
