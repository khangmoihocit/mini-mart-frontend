import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Message = ({ content, type }) => {
    const { message, error, success } = styles;

    return (
        <div className={classNames(message, {
            [error]: type === 'error',
            [success]: type === 'success'
        })}>
            {content}
        </div>
    );
};

export default Message;