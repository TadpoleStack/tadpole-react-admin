import React from 'react'
import { Table} from 'antd';

export default class SimpleTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource :[],
            loading:false,
        }
    }
    getUserList = async ()=>{
      this.setState({loading:true})
      let res = await React.$api.user.getUserList()
      res.data = res.data.map((value,index)=>{
        value.key = index
        return value
      })
      setTimeout(()=>{//延迟一下展现表格加载数据动画
        this.setState({dataSource:res.data,loading:false})
      },2000)
    }
    componentDidMount(){
      this.getUserList()
    }
    render(){
        const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              // sorter: (a, b) => a.age - b.age
              sorter: {
                compare: (a, b) => a.age - b.age,
                multiple: 3,
              },
            },
            {
              title: '性别',
              dataIndex: 'sex',
              key:'sex',
              render:sex=><span>{sex===1?'男':sex===0?'女':'--'}</span>
            },
            {
              title: '身高',
              dataIndex: 'height',
              key:'height',
              // sorter: (a, b) => a.height - b.height
              sorter: {
                compare: (a, b) => a.height - b.height,
                multiple: 2,
              },
            },
            {
              title: 'weight',
              dataIndex: 'weight',
              key: 'weight',
              // sorter: (a, b) => a.weight - b.weight
              sorter: {
                compare: (a, b) => a.weight - b.weight,
                multiple: 1,
              },
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            }
        ]
        return(
            <div>
                <Table
                  rowSelection={{type:'checkbox'||'radio'}}
                  dataSource={this.state.dataSource}
                  columns={columns}
                  bordered
                  loading={this.state.loading}
                  title={() => <div align="center">SimpleTable</div>}
                  footer={() => <span>功能：前端分页、排序、多列排序、多选、单选、远程加载数据、页头、页脚</span>}
                ></Table>
            </div>
        )
    }
}