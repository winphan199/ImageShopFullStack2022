import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';
import { IconBrand } from '../Icons/Icons';
import Button from '../Button';
import Modal from '../Modal';
import InputForm from '../InputForm';

// import { imgs } from '~/assets/imgs';

const cx = classnames.bind(styles);

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const handleShowLoginModal = () => {
        setModalType('login');
        setShowModal(true);
    };

    const handleShowRegisterModal = () => {
        setModalType('register');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={cx('header')}>
            <div className={cx('grid', 'header__container')}>
                <div className={cx('header__content')}>
                    <div className={cx('logo')}>
                        <IconBrand className={cx('logo-img')} />
                        <h3>Pinterest</h3>
                    </div>
                    <div className={cx('actions')}>
                        <Button
                            title="Log in"
                            type="button"
                            className={cx('button', 'button--primary')}
                            onClick={handleShowLoginModal}
                        />
                        <Button
                            title="Register"
                            type="button"
                            className={cx('button')}
                            onClick={handleShowRegisterModal}
                        />
                        {/* <Button title="Upload" type="button" className={cx('button', 'button--primary')} />
                        <div className={cx('avatar')}>
                            <img src={imgs.defaultAvatar} alt="default avatar" className={cx('avatar__img')} />
                        </div> */}
                        {showModal && (
                            <Modal onClick={handleCloseModal}>
                                <InputForm type={modalType} onClick={handleCloseModal} />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
