import { createContext, useCallback, useMemo, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);

    // Memoize callback functions để tránh re-render không cần thiết
    const handleSetType = useCallback((newType) => {
        setType(newType);
    }, []);

    const handleToggleSidebar = useCallback(() => {
        setIsOpenSidebar(prev => !prev);
    }, []);

    const handleSetSidebar = useCallback((isOpen) => {
        setIsOpenSidebar(isOpen);
    }, []);

    // Memoize context value để tránh re-render các consumer
    const contextValue = useMemo(() => ({
        type,
        setType: handleSetType,
        isOpenSidebar,
        setIsOpenSidebar: handleSetSidebar,
        toggleSidebar: handleToggleSidebar
    }), [type, isOpenSidebar, handleSetType, handleSetSidebar, handleToggleSidebar]);

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};
