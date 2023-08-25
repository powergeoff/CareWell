const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const analyzePlugins = process.env.analyze === 'yes' ? [new BundleAnalyzerPlugin()] : [];

const ie11Support = [
  'query-string',
  'strict-uri-encode',
  'split-on-first',
  'recoil',
  'yup',
  'js-base64',
  'd3[w-]+',
];
const excludeNodeModulesButSupportIE11 = new RegExp(
  `node_modules[\\\\,/](?!(${ie11Support.join('|')})[\\\\,/]).*`
);

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: ['./src/index.tsx'],
  },
  stats: {
    builtAt: true,
    modules: false,
  },
  target: ['web', 'es5'],
  output: {
    path: path.resolve(__dirname, '../CareWell.Back/wwwroot'),
    publicPath: '/',
    filename: '[name].js?[contenthash]',
  },
  optimization: {
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(((j|t)sx?)|(s?css))$/,
        exclude: /node_modules/,
        use: (info) => [
          {
            loader: 'prettier-loader',
            options: JSON.stringify({ filepath: info.realResource, ignoreInitial: true }),
          },
        ],
      },
      {
        test: /\.(m?j|t)sx?$/,
        loader: 'ts-loader',
        exclude: excludeNodeModulesButSupportIE11,
        options: { transpileOnly: true },
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css?[contenthash]',
      chunkFilename: '[id].css?[contenthash]',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: false,
      chunks: ['app'],
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: { enabled: true, files: './src/**/*.{ts,tsx,js,jsx}', options: { fix: true } },
      formatter: 'basic',
    }),
    {
      apply(compiler) {
        compiler.hooks.done.tap('CleanUpStatsPlugin', (stats) => {
          const children = stats.compilation.children;
          if (Array.isArray(children))
            stats.compilation.children = children.filter(
              (child) => child.name.indexOf('mini-css-extract-plugin') !== 0
            );
        });
      },
    },
    ...analyzePlugins,
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devtool: isDev ? 'eval-source-map' : false,
  performance: {
    maxEntrypointSize: Math.pow(10, 6), // 1 MB
    maxAssetSize: Math.pow(10, 6), // 1 MB
  },
};
