import React from 'react';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { text } = styles;
    const navigate = useNavigate();

    return (
        <>
            <div className={text}>Home page</div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '300px'
                }}
            >
                {' '}
                <div style={{ width: '250px' }}>
                    <Button
                        content={'page login'}
                        variant={'secondary'}
                        onClick={() => {
                            navigate('/login');
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default HomePage;
