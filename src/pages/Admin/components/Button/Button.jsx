import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Button = ({ content, isPrimary = true, ...props }) => {
    const { btn, primaryBtn, seconddaryBtn } = styles;
    return (
        <div>
            <button
                className={classNames(btn, {
                    [primaryBtn]: isPrimary,
                    [seconddaryBtn]: !isPrimary
                })}
                {...props}
            >
                {content}
            </button>
        </div>
    );
};

export default Button;
