
// 用户模块接口
import ajax from "../ajax";

// 用户登录
export const login = data => ajax({
    url: '/account/login',
    method: 'POST',
    data
})
//模拟数据json
export const getUserList = () => ajax({
  url:'/static/analogData/user.json',
  method:'GET'
})