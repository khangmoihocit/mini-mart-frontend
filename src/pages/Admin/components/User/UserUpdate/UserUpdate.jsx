import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import InputCommon from '@/components/InputCommon/InputCommon';
import { AdminContext } from '@/contexts/AdminProvider';
import Button from '@/pages/Admin/components/Button/Button';
import Message from '@/components/Message/Message';
import { formatErrorMessage } from '@/utils/helpers';
import userService from '@/apis/userService';
import toast from '@/utils/toast';
import { useUsers } from '@/hooks/useUsers';

const UserUpdate = () => {
    const { container, wrapForm, inputDate } = styles;
    const { selectedUser, setType, setSelectedUser } = useContext(AdminContext);
    const [errorMessage, setErrorMessage] = useState('');
    const { getAllUsers } = useUsers();

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        roleName: 'USER'
    });

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setType('user-list');
        setSelectedUser(null);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedUser);
        try {
            const response = await userService.update(selectedUser.id, userData);
            toast.success('Cập nhật người dùng thành công!');
            setType('user-list');
            setSelectedUser(null);
            setErrorMessage('');
            getAllUsers();
        } catch (error) {
            setErrorMessage(formatErrorMessage(error));
        }
    };

    useEffect(() => {
        if (selectedUser) {
            setUserData({
                fullName: selectedUser.fullName || '',
                email: selectedUser.email || '',
                phoneNumber: selectedUser.phoneNumber || '',
                address: selectedUser.address || '',
                isActive: selectedUser.isActive !== undefined ? selectedUser.isActive : true,
                dateOfBirth: formatDateForInput(selectedUser.dateOfBirth),
                roleName: selectedUser.role?.name || 'USER'
            });
        }
    }, [selectedUser]);

    return (
        <div className={container}>
            {!selectedUser ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    Không có dữ liệu người dùng để cập nhật
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className={wrapForm}>
                        <InputCommon label={'Họ và tên'} name={'fullName'} value={userData.fullName} onChange={handleInputChange} />
                        <InputCommon label={'Địa chỉ'} name={'address'} value={userData.address} onChange={handleInputChange} />
                    </div>

                    <div className={wrapForm}>
                        <InputCommon label={'Email'} name={'email'} value={userData.email} onChange={handleInputChange} />
                        <InputCommon label={'Số điện thoại'} name={'phoneNumber'} value={userData.phoneNumber} onChange={handleInputChange} />
                    </div>

                    <div className={wrapForm}>
                        <div className={inputDate}>
                            <label>Quyền</label>
                            <select name="roleName" value={userData.roleName} onChange={handleInputChange}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className={inputDate}>
                            <label style={{ marginRight: '10px' }}>Ngày sinh</label>
                            <input type="date" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} />
                        </div>
                    </div>

                    {errorMessage && (<Message type="error" content={errorMessage} />)}

                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <div style={{ width: '100px' }}>
                            <Button content={"Lưu"} isPrimary={true} type="submit" onClick={handleSubmit} />
                        </div>
                        <div style={{ width: '100px' }}>
                            <Button content={"Hủy"} isPrimary={false} onClick={handleCancel} />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserUpdate;