import { UserInfoProvider } from './UserInfoProvider';
import { AdminProvider } from './AdminProvider';
import { UserProvider } from '@/contexts/UserProvider';
import { CategoryProvider } from '@/contexts/CategoryProvider';
import { SideBarProvider } from '@/contexts/SidebarProvider';
import { StoreProvider } from '@/contexts/StoreProvider';

export const AppProvider = ({ children }) => {
    return (
        <StoreProvider>
            <SideBarProvider>
                <UserInfoProvider>
                    <CategoryProvider>
                        <UserProvider>
                            <AdminProvider>
                                {children}
                            </AdminProvider>
                        </UserProvider>
                    </CategoryProvider>
                </UserInfoProvider>
            </SideBarProvider>
        </StoreProvider>
    );
};