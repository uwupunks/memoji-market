const webpack = require('webpack'); 
const path = require("path");
const fs = require("fs");
const cracoBabelLoader = require("craco-babel-loader");

// manage relative paths to packages
const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: {
    alias: {
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
      vm: require.resolve("vm-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url"),
      
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          process: "process/browser.js",
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [resolvePackage("node_modules/cosmjs-types"),
          resolvePackage("node_modules/@stablelib/random"),
          resolvePackage("node_modules/@walletconnect/utils"),

          
        ],
      },
    },
  ],
};
