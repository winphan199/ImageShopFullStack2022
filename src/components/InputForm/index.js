import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';
import { useState, useEffect } from 'react';
import { IconBrand } from '../Icons/Icons';
import CloseBtn from '../CloseBtn';
import validator from '~/services/validate';

const cx = classNames.bind(styles);

function InputForm({ type = 'login', onClick }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidUserName, setIsValidUserName] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (type === 'register') {
            setIsLogin(false);
        } else if (type === 'login') {
            setIsLogin(true);
        }
    }, [type]);

    useEffect(() => {
        if (isLogin) {
            setIsValid(isValidUserName && isValidPassword);
        } else {
            setIsValid(isValidFirstName && isValidLastName && isValidUserName && isValidPassword);
        }
    }, [isValidFirstName, isValidLastName, isValidUserName, isValidPassword, isLogin]);

    const handleValidate = (setter, rules) => {
        const isValidValue = validator({
            errForm: cx('form-item__error-msg'),
            rules,
        });

        setter(isValidValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isValid);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <div className={cx('logo')}>
                    <IconBrand className={cx('logo-img')} />
                    <h3>{isLogin ? 'Login' : 'Register'}</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={cx('form')} id="submit-form">
                {!isLogin && (
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
                {!isLogin && (
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
                            handleValidate(setIsValidUserName, [
                                validator.isRequired(e.target),
                                validator.isEmail(e.target),
                            ]);

                            setEmail(e.target.value);
                        }}
                        onFocus={(e) =>
                            handleValidate(setIsValidUserName, [
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
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <CloseBtn onClick={onClick} />
        </div>
    );
}

export default InputForm;
