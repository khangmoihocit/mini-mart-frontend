import React, { createContext, useEffect, useState } from 'react';
// import { getInfo } from '@/apis/authService';
import Cookies from 'js-cookie';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('userId'));

    useEffect(() => {
        if (userId) {
            // getInfo(userId)
            //     .then(res => {
            //         setUserInfo(res.data.data);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
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
