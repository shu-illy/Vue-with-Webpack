import path from "path";
import { fileURLToPath } from "url";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import { VueLoaderPlugin } from "vue-loader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    application: path.resolve(
      __dirname,
      "./app/javascript/packs/application.js"
    ),
  },
  output: {
    filename: "js/[name]-[contenthash].js",
    chunkFilename: "js/[name]-[contenthash].chunk.js",
    hotUpdateChunkFilename: "js/[id]-[hash].hot-update.js",
    path: path.resolve(__dirname, "./public/packs"),
    publicPath: "/packs/",
  },
  resolve: {
    extensions: [".js", ".ts", ".vue"],
    modules: [path.resolve(__dirname, "./app/javascript"), "node_modules"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { test: /\.vue(\.erb)?$/, use: [{ loader: "vue-loader" }] },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: ["/\\.vue$/"] },
        exclude: "/node_modules/",
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      output: "manifest.json",
      publicPath: true,
    }),
    new VueLoaderPlugin(),
  ],
};

export default config;
