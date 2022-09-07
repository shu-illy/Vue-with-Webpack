const path = require("path");
const glob = require("glob");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { VueLoaderPlugin } = require("vue-loader");

const packs = path.join(__dirname, "app", "javascript", "packs");
const targets = glob.sync(path.join(packs, "**/*.{js,ts,vue}"));
const entry = targets.reduce((entry, target) => {
  const bundle = path.relative(packs, target);
  const ext = path.extname(bundle);
  return Object.assign({}, entry, {
    [bundle.replace(ext, "")]: `${__dirname}/app/javascript/packs/${bundle}`,
  });
}, {});

module.exports = {
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

// 参考：simpackerインストールで自動的に生成されるwebpack.config.js
// const path = require("path");
// const WebpackAssetsManifest = require("webpack-assets-manifest");

// const { NODE_ENV } = process.env;
// const isProd = NODE_ENV === "production";

// module.exports = {
//   mode: isProd ? "production" : "development",
//   devtool: "source-map",
//   entry: {
//     application: path.resolve(__dirname, "app/javascript/application.js"),
//   },
//   output: {
//     path: path.resolve(__dirname, "public/packs"),
//     publicPath: "/packs/",
//     filename: isProd ? "[name]-[hash].js" : "[name].js",
//   },
//   resolve: {
//     extensions: [".js"],
//   },
//   plugins: [
//     new WebpackAssetsManifest({
//       publicPath: true,
//       output: "manifest.json",
//     }),
//   ],
// };
