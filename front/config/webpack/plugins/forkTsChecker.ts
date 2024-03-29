import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Plugin } from 'webpack';

export const webpackForkTsCheckerPlugin = (tsconfigPath: string): Plugin => {
    return new ForkTsCheckerWebpackPlugin({
        tsconfig: tsconfigPath,
        reportFiles: [
            'src/**/*.{ts,tsx}',
            '!src/**/test.ts',
        ],
        async: true,
        useTypescriptIncrementalApi: false,
        checkSyntacticErrors: true,
        memoryLimit: 4096,
    });
};
