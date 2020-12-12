import React from 'react'
import { Table, Button, Space, Switch, Tooltip} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default class SimpleTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource :[],//表格数据
            rowSelectionType:true,//表格选择类型
            selectedRowKeys:[],//选中项
            loading:false,//加载状态
            sortedInfo:null,//排序
            filteredInfo:null//筛选
        }
    }
    /**
     * 获取数据
     */
    getUserList = async ()=>{
      this.setState({loading:true})
      let res = await React.$api.user.getUserList()
      res.data = res.data.map((value,index)=>{
        value.key = index
        return value
      })
      this.setState({dataSource:res.data,loading:false})
    }
    /**
     * 切换表格单选多选
     */
    toggleSelectType = () => {
      this.setState(state=>({rowSelectionType:!state.rowSelectionType}))
    }
    /**
     * Table组件change事件
     * @param {*} pagination 
     * @param {*} filters 
     * @param {*} sorter 
     */
    handleChange = (pagination, filters, sorter) => {
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }
    /**
     * 清除筛选、排序和选中项
     */
    clearAll = () => {
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
        selectedRowKeys:[]
      });
    }
    /**
     * 选择Table某一项
     * @param {*} selectedRowKeys 
     */
    onSelectChange = selectedRowKeys => {
      this.setState({ selectedRowKeys });
    }

    componentDidMount(){
      this.getUserList()
    }
    render(){
        let { sortedInfo, filteredInfo,selectedRowKeys,rowSelectionType,dataSource,loading} = this.state
        sortedInfo = sortedInfo || {}
        filteredInfo = filteredInfo || {}
        const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              fixed: 'left',
              width:150
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              sorter: (a, b) => a.age - b.age,
              sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
              // sorter: {
              //   compare: (a, b) => a.age - b.age,
              //   multiple: 3,
              // },
              width:100
            },
            {
              title: '性别',
              dataIndex: 'sex',
              key:'sex',
              render:sex=><span>{sex===1?'男':sex===0?'女':'--'}</span>,
              filters:[{text:'男',value:1},{text:'女',value:0}],
              filteredValue: filteredInfo.sex || null,
              onFilter: (value, record) =>record.sex===value,
              width:100
            },
            {
              title: '身高',
              dataIndex: 'height',
              key:'height',
              sorter: (a, b) => a.height - b.height,
              sortOrder: sortedInfo.columnKey === 'height' && sortedInfo.order,
              // sorter: {
              //   compare: (a, b) => a.height - b.height,
              //   multiple: 2,
              // },
              width:100
            },
            {
              title: '体重',
              dataIndex: 'weight',
              key: 'weight',
              sorter: (a, b) => a.weight - b.weight,
              sortOrder: sortedInfo.columnKey === 'weight' && sortedInfo.order,
              // sorter: {
              //   compare: (a, b) => a.weight - b.weight,
              //   multiple: 1,
              // },
              width:100
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
              // ellipsis: true,
              ellipsis: {
                showTitle: false
              },
              render: address => (
                <Tooltip placement="topLeft" title={address}>
                  {address}
                </Tooltip>
              )
            },
            {
              title: '操作',
              key: 'operation',
              width:120,
              // fixed:'right',
              render:item=>(<Space>
                  <Button type={'primary'} shape={'circle'} icon={<EditOutlined />}></Button>
                  <Button danger type={'primary'} shape={'circle'} icon={<DeleteOutlined />}></Button>
                </Space>)
            }
        ]
        let TableTitle = () =>{
          return (
            <Space>
              <Switch checkedChildren="多选" unCheckedChildren="单选" defaultChecked={rowSelectionType} onChange={this.toggleSelectType}/>
              <Button onClick={this.clearAll}>清除排序、筛选、选中项</Button>
            </Space>
          )
        }
        const rowSelection = {
          type:rowSelectionType?'checkbox':'radio',
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        return(
            <div>
                <Table
                  rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns}
                  bordered
                  loading={loading}
                  title={() => <TableTitle></TableTitle>}
                  footer={() => <span>功能：前端分页、排序筛选、多列排序、可控排序筛选、多选单选操作、远程加载数据、页头、页脚、固定头和列、单元格自动省略、自定义单元格省略</span>}
                  onChange={this.handleChange}
                  pagination={{ pageSize: 10 }}
                  scroll={{x:1000, y: 'calc(100vh - 300px)' }}
                  sticky
                ></Table>
            </div>
        )
    }
}