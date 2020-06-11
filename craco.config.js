const CracoAlias = require("craco-alias");
const CracoAntDesignPlugin = require("craco-antd");
const sassResourcesLoader = require('craco-sass-resources-loader');

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
      }
   ]
}