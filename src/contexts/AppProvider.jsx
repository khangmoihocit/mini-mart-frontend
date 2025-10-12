import { UserInfoProvider } from './UserInfoProvider';
import { AdminProvider } from './AdminProvider';

export const AppProvider = ({ children }) => {
    return (
        <UserInfoProvider>
            <AdminProvider>
                {children}
            </AdminProvider>
        </UserInfoProvider>
    );
};