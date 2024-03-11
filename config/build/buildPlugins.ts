import {BuildOptions} from "./types/config";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export function buildPlugins(options: BuildOptions):webpack.WebpackPluginInstance[] {
    const {
        paths,
        isDev,
        apiUrl
    } = options;

    const plugin = [
        new HtmlWebpackPlugin( {
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        }),
        new webpack.DefinePlugin({
            __API__:JSON.stringify(apiUrl)
        })
    ]
    if(isDev) {
        plugin.push(
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshPlugin({overlay:false})
        )
    }
    return plugin;
}