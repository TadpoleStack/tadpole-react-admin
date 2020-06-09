/**
 * 懒加载模块
 */
import Loadable from 'react-loadable'
import Loading from '@src/components/basics/Loading'

//通用的Loading组件默认使用Loading
export const loadable = (loader, loading = Loading) => {
    return Loadable({
        loader,
        loading,
        delay: 300,
    })
}
