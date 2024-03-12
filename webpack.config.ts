import path from "path";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config";
import {entriesList} from "./config/build/entriesList";

function createConfig(env: BuildEnv): webpack.Configuration {
    const src =path.resolve(__dirname, "src");
    const page = env.page || "";

    const paths: BuildPaths = {
        entry: entriesList(src, page),
        build: path.resolve(__dirname, "build"),
        html: path.resolve(__dirname, "public", "index.html"),
        src
    };
    const mode = env.mode || "development";
    const isDev = mode === "development";
    const PORT = env.port || 3000;
    const apiUrl = env.apiUrl || "http://local.sps38.pro";

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        apiUrl,
        port: PORT
    });
    return config;
}

export default createConfig;