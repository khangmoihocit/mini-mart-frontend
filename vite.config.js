import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@styles': path.resolve(__dirname, 'src/assets/styles'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@apis': path.resolve(__dirname, 'src/apis'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@validations': path.resolve(__dirname, 'src/validations')
        }
    }
});
