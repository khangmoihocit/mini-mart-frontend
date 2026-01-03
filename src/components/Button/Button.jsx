import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Button = ({ content, variant = 'primary', disabled, isPrimary = true, ...props }) => {
    const { btn, primaryBtn, seconddaryBtn} = styles;

    return (
        <button 
            className={classNames(btn, {
                    [primaryBtn]: isPrimary,
                    [seconddaryBtn]: !isPrimary
                })}
            disabled={disabled}
            {...props}
        >
            {content}
        </button>
    );
};

Button.propTypes = {
    content: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    disabled: PropTypes.bool
};

Button.defaultProps = {
    variant: 'primary',
    disabled: false
};

export default React.memo(Button);