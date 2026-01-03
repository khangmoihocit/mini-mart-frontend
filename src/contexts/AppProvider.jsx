import { UserInfoProvider } from './UserInfoProvider';
import { AdminProvider } from './AdminProvider';
import { UserProvider } from '@/contexts/UserProvider';
import { CategoryProvider } from '@/contexts/CategoryProvider';

export const AppProvider = ({ children }) => {
    return (
        <UserInfoProvider>
            <CategoryProvider>
                <UserProvider>
                    <AdminProvider>
                        {children}
                    </AdminProvider>
                </UserProvider>
            </CategoryProvider>
        </UserInfoProvider>
    );
};