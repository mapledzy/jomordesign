const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    devtool:'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module:{
        rules: [
            {
                test: /(\.js$|\.jsx$)/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}