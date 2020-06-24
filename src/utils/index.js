/**
 * 添加全局方法
 */
import * as code from './code'
import * as EventEmitter from './EventEmitter'
import * as loadable from './loadable'
import * as publicFn from './public'
const global_method = { ...code, ...EventEmitter, ...loadable, ...publicFn }

const addGlobalMethods = React => {
   for (const key in global_method) {
      if (!React.hasOwnProperty(`$${key}`) && global_method.hasOwnProperty(key)) {
         React[`$${key}`] = global_method[key]
      }
   }
}

export default addGlobalMethods