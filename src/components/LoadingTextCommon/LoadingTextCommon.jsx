import React from 'react';
import styles from './styles.module.scss';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingTextCommon = () => {
    const {loading} = styles;
    return (
        <AiOutlineLoading3Quarters className={loading}/>
    );
};

export default LoadingTextCommon;