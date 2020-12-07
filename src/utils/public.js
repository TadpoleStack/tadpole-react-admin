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