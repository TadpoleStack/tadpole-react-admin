const CracoAlias = require("craco-alias");
const CracoAntDesignPlugin = require("craco-antd");
const sassResourcesLoader = require('craco-sass-resources-loader');
const imageOptimizer = require('craco-image-optimizer-plugin');

module.exports = {
   plugins: [
      {//路径别名
         plugin: CracoAlias,
         options: {
            source: "options",
            baseUrl: "./",
            aliases: {
               "@public": "./",
               "@src": "./src/",
            }
         }
      },
      {
         plugin: CracoAntDesignPlugin
      },
      {
         plugin: sassResourcesLoader,
         options: {
            resources: 'public/global/variable.scss',
         },
      },
      {
         plugin: imageOptimizer,
         options: {
           mozjpeg: {
             progressive: true,
             quality: 65,
           },
           optipng: {
             enabled: false,
           },
           pngquant: {
             quality: [0.65, 0.9],
             speed: 4,
           },
           gifsicle: {
             interlaced: false,
           },
           webp: {
             quality: 75,
           },
         },
       }
   ]
}