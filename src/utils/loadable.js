import Loadable from 'react-loadable'
import Loading from 'components/basics/Loading'

//通用的Loading组件默认使用Loading
export default (loader, loading = Loading) => {
   return Loadable({
      loader,
      loading
   });
}