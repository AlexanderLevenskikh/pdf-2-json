import { DefinePlugin, Plugin } from 'webpack';

export interface IWebpackDefinePluginArgs {
    wds: boolean;
    isProductionMode: boolean;
}

export const webpackDefinePlugin = ({ wds, isProductionMode }: IWebpackDefinePluginArgs): Plugin => {
    return new DefinePlugin({
        IS_WDS: wds,
        IS_PRODUCTION_MODE: isProductionMode,
    });
};
