
// 获取base64
import ajax from "../ajax";

//获取map数据
export const getBase64 = name => ajax({
  url:`/static/base64/${name}.txt`,
  method:'GET'
})