import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routers from '@/routers/routers';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { AppProvider } from '@/contexts/AppProvider';

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
        <AppProvider>
            <ErrorBoundary>
                <BrowserRouter>
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

                    <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        className="custom-toast-container"
                    />
                </BrowserRouter>
            </ErrorBoundary>
        </AppProvider>
    );
}

export default App;
