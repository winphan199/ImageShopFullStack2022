import classNames from 'classnames/bind';
import styles from './ImageContainer.module.scss';
import { useState } from 'react';
import ImageCard from '../ImageCard';
import Modal from '../Modal';
import ImageFullScreen from '../ImageFullScreen';

const cx = classNames.bind(styles);

function ImageContainer() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className={cx('grid', 'container')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-3')}>
                    <ImageCard onClick={handleShowModal} />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard onClick={handleShowModal} />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard onClick={handleShowModal} />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard onClick={handleShowModal} />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard onClick={handleShowModal} />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
                <div className={cx('col', 'l-3')}>
                    <ImageCard />
                </div>
            </div>
            {showModal && (
                <Modal onClick={handleShowModal}>
                    <ImageFullScreen
                        src="https://cdn.osxdaily.com/wp-content/uploads/2021/06/windows-11-wallpaper-23-scaled.jpg"
                        alt="sieu nhan"
                        onClick={handleShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default ImageContainer;
