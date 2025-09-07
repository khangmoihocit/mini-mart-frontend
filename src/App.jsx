import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/routers/routers';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

// Loading component
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
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
