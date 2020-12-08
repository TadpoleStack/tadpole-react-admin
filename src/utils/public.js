const TOKEN = 'Tadpole_TOKEN'

/**
 * 设置token
 * @param {token} token 
 */
export const setToken = token => {
   sessionStorage.setItem(TOKEN, token)
}
/**
 * 获取token
 */
export const getToken = () => sessionStorage.getItem(TOKEN)
/**
 * 删除token
 */
export const clearToken = () => {
   sessionStorage.removeItem(TOKEN)
}
/**
 * 替换eval避免报错
 * @param {eval解析} fn 
 */
export const evil = fn => {
   let Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
   return new Fn('return ' + fn)();
 }