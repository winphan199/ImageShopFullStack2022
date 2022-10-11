import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import IconBrand from '../Icons/Icons';
import Button from '../Button';
import { imgs } from '~/assets/imgs';

const cx = classnames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('grid', 'header__container')}>
                <div className={cx('header__content')}>
                    <div className={cx('logo')}>
                        <IconBrand className={cx('logo-img')} />
                        <h3>Pinterest</h3>
                    </div>
                    <div className={cx('actions')}>
                        {/* <Button title="Log in" type="button" className={cx('button', 'button--primary')} />
                        <Button title="Log out" type="button" className={cx('button')}/> */}
                        <Button title="Upload" type="button" className={cx('button', 'button--primary')} />
                        <div className={cx('avatar')}>
                            <img src={imgs.defaultAvatar} alt="default avatar" className={cx('avatar__img')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
