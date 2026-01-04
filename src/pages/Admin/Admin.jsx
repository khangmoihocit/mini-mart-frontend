import Header from '@/pages/Admin/components/Header/Header';
import MainContent from '@/pages/Admin/components/MainContent/MainContent';
import Sidebar from '@/pages/Admin/components/Sidebar/Sidebar';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { use } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { formatErrorMessage } from '@/utils/helpers';
import userService from '@/apis/userService';

const Admin = () => {
    const { containerAdmin1, containerRight } = styles;
    useEffect(async ()=>{
        const token = Cookies.get('token');
        if(!token){
            window.location.href = '/login';
            return;
        }

        try{
            const user = (await userService.getMyInfo()).data.result;
            if(user.role.name !== 'ADMIN'){
                window.location.href = '/login';
                return;
            }
        }catch(err){
            toast.error(formatErrorMessage(err));
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className={containerAdmin1}>
            <Sidebar />
            <div className={containerRight}>
                <Header />
                <MainContent />
            </div>
        </div>
    );
};

export default Admin;
