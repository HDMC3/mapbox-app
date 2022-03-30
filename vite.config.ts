import { defineConfig, UserConfigExport } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
    const config: UserConfigExport = {
        root: 'src',
        publicDir: '../public',
        build: {
            outDir: '../dist',
            assetsDir: './'
        }
    };

    config.base = mode === 'production' ? '/' + path.basename(process.cwd()) + '/' : '/';
    return config;
});
