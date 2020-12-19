const glob = require('glob')
const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")


var htmlPages= glob.sync('./src/*.html')
.map(path => {
    //path example './src/about.html'

    var chunk = path.replace('.html','').replace('./src/','')

    return new HtmlWebpackPlugin({
        template:path,
        filename:`pages/${chunk}.html`,
        chunks:[chunk,'vendor'],
        inject:true
    })
})

module.exports = {
    entry:{
        index: './src/js/index.js',
        about: './src/js/about.js',
    },

    output:{
        filename: 'js/[name]/[name].js',
        chunkFilename:'js/[name].js',
        path:path.resolve(__dirname,'dist')
    },
devServer:{
    contentBase:path.resolve(__dirname,'dist','pages')
},
    optimization:{
        splitChunks:{
            chunks:'all',
            name:'vendor'
        }
    },
module:{
    rules:[
        {
            test:/\.vue$/,
            loader:'vue-loader'
        }
    ]
},
    plugins:[
        // new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ].concat(htmlPages)
}