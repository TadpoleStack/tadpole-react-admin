import React from 'react'
import { Table} from 'antd';

export default class SimpleTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource :[]
        }
    }
    componentDidMount(){
        const dataSource = [{
            key: '1',
            name: 'Tadpole',
            age: 23,
            address: '陕西省西安市雁塔区永利国际金融中心',
          },
          {
            key: '2',
            name: 'Tadpole2',
            age: 24,
            address: '浙江省杭州市余杭区思创医惠产业园',
          }]
        this.setState({dataSource:dataSource})
    }
    render(){
        const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            }
        ]
        return(
            <div>
                <Table dataSource={this.state.dataSource} columns={columns}></Table>
            </div>
        )
    }
}