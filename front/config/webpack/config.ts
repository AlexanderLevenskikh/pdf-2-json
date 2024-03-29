import { Configuration } from 'webpack';
import path from 'path';
import { webpackOutputPart } from './output';
import { webpackOptimizationPart } from './optimization';
import { webpackTypescriptRule } from './rules/typescript';
import { webpackCssRule } from './rules/css';
import { webpackFileRule } from './rules/file';
import { webpackDefinePlugin } from './plugins/define';
import { webpackMiniCssPlugin } from './plugins/miniCss';
import { webpackHTMLPlugin } from './plugins/html';
import { webpackForkTsCheckerPlugin } from './plugins/forkTsChecker';
import { webpackDevServerHMRPlugin } from './plugins/devServerHMR';
import { webpackDevServerPart } from './devServer';
import { webpackContext } from './context';
import { webpackTSXRule } from './rules/typescriptJSX';
import { webpackLessRule } from './rules/less';
import { webpackLessAntdRule } from './rules/less-antd';

export enum WebpackModeEnum {
    Production = 'production',
    Development = 'development',
}

export interface IWebpackEnv {
    mode: WebpackModeEnum,
    wds: boolean,
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = ({ mode, wds }: IWebpackEnv): Configuration => {
    const isProductionMode = mode === WebpackModeEnum.Production;
    const publicPath = '/';

    const entryPoint = path.resolve(
        './src',
        'index.tsx',
    );
    const entry = {
        bundle: [
            entryPoint,
        ],
    };

    const output = webpackOutputPart({
        publicPath,
        filename: isProductionMode ? '[name].[hash].js' : '[name].js',
        path: path.resolve(webpackContext, 'dist'),
    });

    const devtool = isProductionMode ? false : 'inline-source-map';

    const optimization = webpackOptimizationPart(isProductionMode);

    const title = 'pdf2json';

    const configFile = path.resolve(webpackContext, 'babel.config.js');

    const rules = [
        webpackTSXRule({
            wds,
            include: /src/,
            configFile,
        }),
        webpackTypescriptRule({
            include: /src/,
            configFile,
        }),
        webpackLessRule({
            isProduction: isProductionMode,
            include: /src/,
            exclude: /node_modules/,
            postCSSConfigDirPath: webpackContext,
        }),
        webpackLessAntdRule({
            isProduction: isProductionMode,
            include: /antd/,
            postCSSConfigDirPath: webpackContext,
        }),
        webpackFileRule({
            include: /src|img/,
        }),
    ];

    const plugins = [
        webpackDefinePlugin({
            wds,
            isProductionMode,
        }),
        webpackMiniCssPlugin('[name].[contenthash].css'),
        webpackHTMLPlugin({
            title,
            templatePath: path.resolve(webpackContext, 'templates/index.html'),
        }),
        webpackForkTsCheckerPlugin(path.resolve(webpackContext, 'tsconfig.json')),
        ...(wds ? [webpackDevServerHMRPlugin()] : []),
    ];

    const resolve = {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            'root': path.resolve(webpackContext, 'src'),
        },
    };

    const devServer = webpackDevServerPart();

    return {
        mode,
        entry,
        output,
        devtool,
        optimization,
        module: { rules },
        plugins,
        resolve,
        ...(wds ? { devServer } : {}),
    };
};

export default webpackConfig;
