import React, { useState } from 'react';
import LoadingOverlay, { InlineLoading, LoadingButton, SkeletonLoader } from '../LoadingOverlay/LoadingOverlay';

const LoadingDemo = () => {
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const simulateApi = (setter, duration = 2000) => {
        setter(true);
        setTimeout(() => setter(false), duration);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Loading Components Demo</h1>
            
            {/* Standalone Loading */}
            <section style={{ marginBottom: '40px' }}>
                <h2>1. Standalone Loading</h2>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <button onClick={() => simulateApi(setIsLoading1)}>
                        Show Standalone Loading
                    </button>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '16px', minHeight: '200px' }}>
                    <LoadingOverlay 
                        isLoading={isLoading1} 
                        message="Đang tải dữ liệu từ server..."
                        size="medium"
                    />
                </div>
            </section>

            {/* Overlay Loading */}
            <section style={{ marginBottom: '40px' }}>
                <h2>2. Overlay Loading (với content)</h2>
                <button onClick={() => simulateApi(setIsLoading2)}>
                    Show Overlay Loading
                </button>
                <LoadingOverlay 
                    isLoading={isLoading2} 
                    message="Đang xử lý yêu cầu..."
                    size="large"
                >
                    <div style={{ 
                        padding: '40px', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px', 
                        marginTop: '16px',
                        background: '#f8fafc'
                    }}>
                        <h3>Nội dung trang</h3>
                        <p>Đây là nội dung sẽ bị che khi loading...</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                            <div style={{ flex: 1, height: '100px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                            <div style={{ flex: 1, height: '100px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                </LoadingOverlay>
            </section>

            {/* Inline Loading */}
            <section style={{ marginBottom: '40px' }}>
                <h2>3. Inline Loading</h2>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <p>Dữ liệu đang được tải: <InlineLoading message="Vui lòng chờ..." size="small" /></p>
                    <p>Trạng thái xử lý: <InlineLoading message="Đang xử lý..." size="medium" /></p>
                </div>
            </section>

            {/* Loading Button */}
            <section style={{ marginBottom: '40px' }}>
                <h2>4. Loading Button</h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <LoadingButton 
                        loading={buttonLoading}
                        loadingText="Đang lưu..."
                        onClick={() => simulateApi(setButtonLoading, 3000)}
                    >
                        Lưu dữ liệu
                    </LoadingButton>
                    
                    <LoadingButton 
                        loading={false}
                        style={{ background: '#10b981' }}
                    >
                        Button bình thường
                    </LoadingButton>
                    
                    <LoadingButton 
                        loading={true}
                        loadingText="Đang gửi..."
                        style={{ background: '#f59e0b' }}
                    >
                        Button luôn loading
                    </LoadingButton>
                </div>
            </section>

            {/* Skeleton Loader */}
            <section style={{ marginBottom: '40px' }}>
                <h2>5. Skeleton Loader</h2>
                <button onClick={() => simulateApi(setIsLoading3, 3000)}>
                    Show Skeleton
                </button>
                <div style={{ 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    marginTop: '16px',
                    background: 'white'
                }}>
                    {isLoading3 ? (
                        <SkeletonLoader rows={5} columns={4} />
                    ) : (
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ width: '20%', height: '20px', background: '#3b82f6', borderRadius: '4px' }}></div>
                                <div style={{ width: '30%', height: '20px', background: '#10b981', borderRadius: '4px' }}></div>
                                <div style={{ width: '25%', height: '20px', background: '#f59e0b', borderRadius: '4px' }}></div>
                                <div style={{ width: '25%', height: '20px', background: '#ef4444', borderRadius: '4px' }}></div>
                            </div>
                            <p>Dữ liệu thực đã được tải!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Usage Examples */}
            <section style={{ marginBottom: '40px' }}>
                <h2>6. Các kích thước khác nhau</h2>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                        <p>Small:</p>
                        <LoadingOverlay isLoading={true} size="small" message="Small loading" />
                    </div>
                    <div>
                        <p>Medium:</p>
                        <LoadingOverlay isLoading={true} size="medium" message="Medium loading" />
                    </div>
                    <div>
                        <p>Large:</p>
                        <LoadingOverlay isLoading={true} size="large" message="Large loading" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoadingDemo;