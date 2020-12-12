
// 地图模块接口
import ajax from "../ajax";

//获取map数据
export const getMapData = (flag,code) => ajax({
  url:`/static/map/${flag&&code?flag+'/'+code:'china'}.json`,
  method:'GET'
})