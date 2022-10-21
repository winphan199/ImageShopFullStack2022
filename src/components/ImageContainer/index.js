import classNames from 'classnames/bind';
import styles from './ImageContainer.module.scss';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ImageCard from '../ImageCard';
import Modal from '../Modal';
import ImageFullScreen from '../ImageFullScreen';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function ImageContainer() {
    const uploadUrl = 'https://imageshop-d8a14-default-rtdb.europe-west1.firebasedatabase.app/images.json';
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [images, setImages] = useState([]);

    const [fullSizeImage, setFullSizeImage] = useState({
        src: '',
        alt: '',
    });

    useEffect(() => {
        fetchImages();
        setIsloading(false);
    }, []);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleshowImage = (image) => {
        setFullSizeImage({ src: image.url, alt: image.alt });
        handleShowModal();
    };

    const fetchImages = async () => {
        const res = await fetch(uploadUrl);
        const data = await res.json();

        const fetchedImages = [];

        for (const key in data) {
            fetchedImages.push({
                id: key,
                url: data[key].url,
                name: data[key].name,
                alt: data[key].description,
            });
        }

        setImages(fetchedImages);
    };

    return (
        <div className={cx('container')}>
            {!isLoading ? (
                <ResponsiveMasonry columnsCountBreakPoints={{ 740: 1, 750: 2, 900: 4 }}>
                    <Masonry gutter="20px">
                        {images.map((image) => {
                            return (
                                <ImageCard
                                    key={image.id}
                                    onClick={() => handleshowImage(image)}
                                    src={image.url}
                                    alt={image.alt}
                                    author={image.name}
                                />
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            ) : (
                <Loading width="36px" height="36px" className={cx('loading')} />
            )}

            {showModal && (
                <Modal onClick={handleShowModal}>
                    <ImageFullScreen
                        src={
                            fullSizeImage
                                ? fullSizeImage.src
                                : 'https://cdn.osxdaily.com/wp-content/uploads/2021/06/windows-11-wallpaper-23-scaled.jpg'
                        }
                        alt={fullSizeImage ? fullSizeImage.alt : 'sieu nhan'}
                        onClick={handleShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default ImageContainer;
