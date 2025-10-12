import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import userService from '@/apis/userService';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userCurrent, setUserCurrent] = useState(null);
    const [token, setToken] = useState(Cookies.get('token'));

    const getMyInfo = async () =>{
        if(token){
            try {
                const response = await userService.getMyInfo();
                setUserCurrent(response.data.result);
            } catch (error) {
                console.log(formatErrorMessage(error));
            }
        }else{
            setUserCurrent(null);
        }
    }

    useEffect(() => {
        getMyInfo();
    }, [token]);

    const contextValue = {
        type,
        setType,
        isOpenSidebar,
        setIsOpenSidebar,
        selectedUser,
        setSelectedUser,
        userCurrent,
        setToken
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};