import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import Toolbar from '@/pages/Admin/components/Toolbar/Toolbar';
import { formatErrorMessage } from '@/utils/helpers';
import userService from '@/apis/userService';
import { use } from 'react';

// const users = [
//     {
//         id: '1',
//         fullName: 'Nguyễn Văn An',
//         email: 'nguyenvana@example.com',
//         phoneNumber: '0987654321',
//         address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
//         password: 'hashed_password_1',
//         isActive: true,
//         dateOfBirth: '1990-05-15',
//         role: { id: 1, name: 'ADMIN' },
//         createdAt: '2023-10-27T10:00:00',
//         updatedAt: '2023-10-27T10:00:00'
//     },
//     {
//         id: '2',
//         fullName: 'Trần Thị Bích',
//         email: 'tranbich@example.com',
//         phoneNumber: '0912345678',
//         address: '456 Đường Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh',
//         password: 'hashed_password_2',
//         isActive: true,
//         dateOfBirth: '1995-02-20',
//         role: { id: 2, name: 'USER' },
//         createdAt: '2023-11-01T14:30:00',
//         updatedAt: '2023-11-05T09:15:00'
//     },
//     {
//         id: '3',
//         fullName: 'Lê Minh Cường',
//         email: 'lecuong@example.com',
//         phoneNumber: '0334567890',
//         address: '789 Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội',
//         password: 'hashed_password_3',
//         isActive: true,
//         dateOfBirth: '1988-11-30',
//         role: { id: 2, name: 'USER' },
//         createdAt: '2024-01-10T08:00:00',
//         updatedAt: '2024-01-10T08:00:00'
//     },
//     {
//         id: '4',
//         fullName: 'Phạm Thị Dung',
//         email: 'phamthidung@example.com',
//         phoneNumber: '0778901234',
//         address: '101 Đường Võ Văn Tần, Quận 3, TP. Hồ Chí Minh',
//         password: 'hashed_password_4',
//         isActive: false,
//         dateOfBirth: '2001-07-19',
//         role: { id: 2, name: 'USER' },
//         createdAt: '2024-02-20T11:20:00',
//         updatedAt: '2024-03-15T16:45:00'
//     },
//     {
//         id: '5',
//         fullName: 'Hoàng Văn Em',
//         email: 'hoangvanem@example.com',
//         phoneNumber: '0889012345',
//         address: '212 Đường Hai Bà Trưng, Quận Hoàn Kiếm, Hà Nội',
//         password: 'hashed_password_5',
//         isActive: true,
//         dateOfBirth: '1999-10-10',
//         role: { id: 2, name: 'USER' },
//         createdAt: '2024-04-01T18:00:00',
//         updatedAt: '2024-04-01T18:00:00'
//     }
// ];
const UserList = () => {
    const {
        tableContainer,
        productTable,
        actions,
        editBtn,
        deleteBtn
    } = styles;

    const [users, setUsers] = useState([]);

    const getAllUsers = async ()=>{
        try{
            const response = await userService.getAll();
            setUsers(response.data.result);
        }catch(error){
            console.log(formatErrorMessage(error));
        }
    }

    useEffect(()=>{
        getAllUsers();
    }, []);

    return (
        <div>
            {/* Header */}
            <HeaderMainContent
                title={'Danh sách người dùng'}
                navigate={'Dashboard > Khách hàng > Danh sách người dùng'}
            />

            {/* Toolbar */}
            <Toolbar />

            {/* Bảng sản phẩm */}
            <div className={tableContainer}>
                <table className={productTable}>
                    <thead>
                        <tr>
                            <th>
                                <input type='checkbox' />
                            </th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Is Active</th>
                            <th>Ngày sinh</th>
                            <th>Quyền</th>
                            <th>Ngày tạo</th>
                            <th>Cập nhật lần cuối</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <input type='checkbox' />
                                </td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>{item.isActive ? 'Đang hoạt động' : 'Đã khóa'}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.role.name}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>

                                <td>
                                    <div className={actions}>
                                        <button className={editBtn}>Sửa</button>
                                        <button className={deleteBtn}>
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
