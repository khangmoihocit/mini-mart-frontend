import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Button = ({ content, variant = 'primary', disabled, isPrimary = true, ...props }) => {
    const { btn, primaryBtn, secondaryBtn } = styles;

    return (
        <button 
            className={classNames(btn, {
                    [primaryBtn]: isPrimary,
                    [secondaryBtn]: !isPrimary
                })}
            disabled={disabled}
            {...props}
        >
            {content}
        </button>
    );
};

export default React.memo(Button);