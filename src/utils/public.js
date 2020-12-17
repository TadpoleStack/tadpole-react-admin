import CryptoJS from 'crypto-js'
import screenfull from 'screenfull'
import printJS from 'print-js'
const TOKEN = 'Tadpole_TOKEN'

/**
 * base64加密解密
 */
const base64Encode = (str)=> {
   return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1)
          })
  )
}
/**
 * base64解密
 */
const base64Decode = (str)=> {
   return decodeURIComponent(atob(str).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))
}
/**
 * 设置token
 * @param {token} token 
 */
const setToken = token => {
   sessionStorage.setItem(TOKEN, base64Encode(token))
}
/**
 * 获取token
 */
const getToken = () => base64Decode(sessionStorage.getItem(TOKEN))
/**
 * 删除token
 */
const clearToken = () => {
   sessionStorage.removeItem(TOKEN)
}
/**
 * 替换eval避免报错
 * @param {eval解析} fn 
 */
const evil = fn => {
   let Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
   return new Fn('return ' + fn)();
 }

export {
   base64Encode,
   base64Decode,
   setToken,
   getToken,
   clearToken,
   evil,
   CryptoJS,
   screenfull,
   printJS
}