import path from "path";
import glob from "glob";
import { fileURLToPath } from "url";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import { VueLoaderPlugin } from "vue-loader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packs = path.join(__dirname, "app", "javascript", "packs");
const targets = glob.sync(path.join(packs, "**/*.{js,ts,vue}"));
const entry = targets.reduce((entry, target) => {
  const bundle = path.relative(packs, target);
  const ext = path.extname(bundle);
  return Object.assign({}, entry, {
    [bundle.replace(ext, "")]: `${__dirname}/app/javascript/packs/${bundle}`,
  });
}, {});

const config = {
  mode: process.env.NODE_ENV,
  entry,
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
