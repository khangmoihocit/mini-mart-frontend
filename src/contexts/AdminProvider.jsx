import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('dashboard');

    const values = { type, setType };

    return (
        <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
    );
};
