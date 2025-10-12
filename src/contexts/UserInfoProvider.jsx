import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import userService from '@/apis/userService';

export const UserInfoContext = createContext();
export const UserInfoProvider = ({ children }) => {
    const [userCurrent, setUserCurrent] = useState(null);
    const [token, setToken] = useState(Cookies.get('token') || null);

    const getMyInfo = async () => {
        if (token) {
            try {
                const response = await userService.getMyInfo();
                setUserCurrent(response.data.result);
            }
            catch (error) {
                console.log(formatErrorMessage(error));
            }
        }
        else {
            setUserCurrent(null);
        }
    };

    useEffect(() => {
        getMyInfo();
    }, []);

    const contextValue = {
        userCurrent,
        setUserCurrent,
        token,
        setToken
    };
    return (
        <UserInfoContext.Provider value={contextValue}>
            {children}
        </UserInfoContext.Provider>
    );
};


