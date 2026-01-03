import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routers from '@/routers/routers';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { AppProvider } from '@/contexts/AppProvider';
import { ToastProvider } from '@/contexts/ToastProvider';
import Sidebar from '@/components/Sidebar/Sidebar';

const LoadingSpinner = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
    }}>
        Đang tải...
    </div>
);

function App() {
    return (
        <ToastProvider>
            <AppProvider>
            <ErrorBoundary>
                <BrowserRouter>
                <Sidebar />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            {routers.map((item, index) => (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={<item.component />}
                                />
                            ))}
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ErrorBoundary>
        </AppProvider>
        </ToastProvider>
    );
}

export default App;
