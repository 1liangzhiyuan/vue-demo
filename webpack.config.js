// 使用commonjs规范，定义配置
module.exports = {
    // 开发环境
    mode: 'development',
    // 解决问题 
    resolve: {
        // vue入口文件
        alias: {
            // 以vue结尾
            'vue$': 'vue/dist/vue.js'
        },
        // 默认拓展名
        // extensions: ['.js']
    },
    // 入口文件
    entry: {
        '00': './modules/00.js',
        '00-2': './modules/00-2.js',
    },
    // 发布
    output: {
        filename: '[name].js'
    },
    // 模块
    module: {
        // 加载机
        rules: [
            // webpack3.0还要处理es6
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     option: {
            //         presets: ['@babel/preset-env']
            //     }
            // },
            // css
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            // less
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            // sass
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
        ]
    }
}