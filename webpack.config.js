const glob = require('glob')

const HtmlWebpackPlugin = require("html-webpack-plugin")

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
        chunkFilename:'js/[name].js'
    },

    optimization:{
        splitChunks:{
            chunks:'all',
            name:'vendor'
        }
    },

    plugins:[
        // new HtmlWebpackPlugin({
        //     template:'./src/index.html',
        //     filename:'pages/index.html',
        //     chunks:['index','vendor'],
        //     inject:true
        // }),
        // new HtmlWebpackPlugin({
        //     template:'./src/about.html',
        //     filename:'pages/about.html',
        //     chunks:['about','vendor'],
        //     inject:true
        // })
    ].concat(htmlPages)
}