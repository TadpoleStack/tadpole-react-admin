import React from 'react';
import { Table, Button, Space, Modal, Progress } from 'antd';
import XLSX from 'xlsx';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
let base64 = ''
class DataExport extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource :[],//表格数据
            sortedInfo:null,//排序
            filteredInfo:null,//筛选
            visible:false,
            percent:0,//压缩进度
        }
        this.tableDom = React.createRef()
    }
    
    handleChange = (pagination, filters, sorter) => {
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    }

    /**
     * 获取数据
     */
    getUserList = async ()=>{
        let res = await React.$api.user.getUserList()
        res.data = res.data.map((value,index)=>{
          value.key = index
          return value
        })
        this.setState({dataSource:res.data})
    }
    getBase64 = async ()=>{
        let res = await React.$api.base64.getBase64('img1')
        base64 = res.data
    }
    footer = ()=>{
        return(
            <div>
                <Space>
                    <Button>导出excel表格</Button>
                    <Button>导出txt</Button>
                    <Button onClick={this.dataExport}>导出zip</Button>
                </Space>
            </div>
        )
    }
    ProgressTip = ()=>{
        return(
        <Modal
            visible={this.state.visible}
            closable={false}
            footer={<span></span>}
          >
            <Progress percent={this.state.percent} />
          </Modal>
        )
    }
    /**
     * 数据导出
     */
    dataExport = ()=>{
        const dom = this.tableDom.current
        const xlsx = XLSX.utils.table_to_sheet(dom)  
        const zip = new JSZip()       
        zip.folder("photos").file("Tadpole.txt", "a folder with photos");//folder txt       
        const imgBase64Str = base64//img      
        zip.folder("images").file('img.jpg',imgBase64Str,{base64: true})      
        const excelFolder = zip.folder('excel')//excel      
        const array = new Array(1000)       
        for (let i = 0; i < array.length; i++) {         
            excelFolder.file(`${i}.xlsx`,XLSX.utils.sheet_to_html(xlsx))   
        }
        this.setState({visible:true})
        zip.generateAsync({type : "blob"},(metadata)=>{//生成zip  //currentFile  percent
            let percent = parseInt(metadata.percent)
            if(metadata.percent&&parseInt(metadata.percent))
            this.setState({percent:percent})    
        }).then((blob)=>{
            this.setState({visible:false})
            FileSaver.saveAs(blob, "Tadpole.zip",{ autoBom: true });  
        })
    }

    componentDidMount(){
        this.getUserList()
        this.getBase64()
    }
    render(){
        let { sortedInfo, filteredInfo, dataSource} = this.state
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
              width:100
            },
            {
              title: '体重',
              dataIndex: 'weight',
              key: 'weight',
              sorter: (a, b) => a.weight - b.weight,
              sortOrder: sortedInfo.columnKey === 'weight' && sortedInfo.order,
              width:100
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
              ellipsis: true,
            }
        ];
        return(
            <div>
                <div
                    ref={this.tableDom}>
                    <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    onChange={this.handleChange}
                    pagination={false}
                    scroll={{x:1000, y: 'calc(100vh - 200px)' }}
                    sticky
                    footer={this.footer}
                    ></Table>
                </div>
                <this.ProgressTip></this.ProgressTip>
            </div>
        )
    }
}

export default DataExport;