import React from 'react';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';

const HomePage = () => {
    const {text} = styles;

    return (
        <>
        <div className={text}>
            Home page
        </div>

        <Button content={"test primary"} variant={'secondary'}/>
        <Button content={"test primary"} variant={'tertiary'}/>

        </>
        
    );
};

export default HomePage;