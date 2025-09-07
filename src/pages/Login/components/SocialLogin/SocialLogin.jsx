import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.module.scss';
import { UI_MESSAGES } from '@/constants/messages';

const SocialLogin = () => {
    const { textSpec, containerBox } = styles;

    return (
        <>
            <div className={textSpec}>{UI_MESSAGES.OR_LOGIN_WITH}</div>
            <div className={containerBox}>
                <img
                    width="139px"
                    height="36px"
                    src="https://theme.hstatic.net/200000888549/1001374142/14/gp-btn.svg?v=26"
                    alt="google"
                />
                <img
                    width="139px"
                    height="36px"
                    src="https://theme.hstatic.net/200000888549/1001374142/14/fb-btn.svg?v=26"
                    alt="facebook"
                />
            </div>
        </>
    );
};

export default React.memo(SocialLogin);
