import { UserInfoProvider } from './UserInfoProvider';
import { AdminProvider } from './AdminProvider';
import { UserProvider } from '@/contexts/UserProvider';

export const AppProvider = ({ children }) => {
    return (
        <UserInfoProvider>
            <UserProvider>
                <AdminProvider>
                    {children}
                </AdminProvider>
            </UserProvider>
        </UserInfoProvider>
    );
};