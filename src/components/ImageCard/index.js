import classNames from 'classnames/bind';
import styles from './ImageCard.module.scss';

const cx = classNames.bind(styles);

function ImageCard({ onClick, className, ...params }) {
    const styles = [className, 'container'];

    return (
        <div className={cx(styles)}>
            <div className={cx('img-container')} onClick={onClick}>
                <img
                    src="https://cdn.osxdaily.com/wp-content/uploads/2021/06/windows-11-wallpaper-23-scaled.jpg"
                    alt="sieu nhan"
                    className={cx('img')}
                />
            </div>
            <div className={cx('desc')}>
                <p className={cx('author')}>Hung Phan</p>
            </div>
        </div>
    );
}

export default ImageCard;
