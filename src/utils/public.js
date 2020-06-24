const TOKEN = 'Tadpole_TOKEN'

/**
 * 设置token
 * @param {token} token 
 */
export const setToken = token => {
   localStorage.setItem(TOKEN, token)
}
/**
 * 获取token
 */
export const getToken = () => {
   localStorage.getItem(TOKEN)
}
/**
 * 删除token
 */
export const clearToken = () => {
   localStorage.removeItem(TOKEN)
}