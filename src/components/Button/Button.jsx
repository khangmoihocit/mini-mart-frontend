import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

//tertiary 
const Button = ({content, variant = 'primary', ...props}) => {
    const {btn} = styles;

    return (
        <div>
            <button className={classNames(btn, styles[variant])}
            
            {...props}
            >
                {content}
            </button>
        </div>
    );
};

export default Button;