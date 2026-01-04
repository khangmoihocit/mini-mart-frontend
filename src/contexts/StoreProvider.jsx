import React, { createContext, useEffect, useState } from 'react';
// import { getInfo } from '@/apis/authService';
import Cookies from 'js-cookie';
import userService from '@/apis/userService';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('userId'));

    useEffect(() => {
        if (userId) {
            userService.getMyInfo()
                .then(res => {
                    setUserInfo(res.data.result);
                    console.log('User info loaded:', res.data.result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]);

    return (
        <StoreContext.Provider
            value={{ userInfo, setUserInfo, setUserId }}
        >
            {children}
        </StoreContext.Provider>
    );
};
