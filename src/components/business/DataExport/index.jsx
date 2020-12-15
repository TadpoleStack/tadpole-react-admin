import React from 'react';
import { Table, Button, Space, Modal, Progress } from 'antd';
import XLSX from 'xlsx';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
const TadpoleFaceUrl = `https://s.gravatar.com/avatar/4770ccdd197bff1ab146a978c26cca6a?s=512&r=X`

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
     * 图片转base64
     */
    toBase64 = (params={})=>{
        return new Promise(resolve=>{
            try {       
                params.type = params.type?params.type:'png'
                params.quality = params.quality?params.quality:1
                let image = new Image();
                image.setAttribute('crossOrigin', 'anonymous');
                image.src = params.url?params.url:params.img.src;
                image.onload = ()=>{
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    let base64 = canvas.toDataURL(`image/${params.type}`,params.quality)
                    resolve(base64)
                }
            } catch (error) {
                resolve(error)
            }
        },reject=>{
            reject('')
        })
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
    dataExport = async ()=>{
        const dom = this.tableDom.current
        const xlsx = XLSX.utils.table_to_sheet(dom)  
        const zip = new JSZip()       
        zip.folder("documents").file("Tadpole.txt", "a folder with document");//folder txt       
        let imgBase64Str = await this.toBase64({url:TadpoleFaceUrl,type:'jpeg'})//img  
        imgBase64Str = imgBase64Str.replace('data:image/jpeg;base64,','')    
        zip.folder("images").file('img.jpg',imgBase64Str,{base64: true})      
        const excelFolder = zip.folder('excel')//excel      
        const array = new Array(1000)
        for (let i = 0; i < array.length; i++) {         
            excelFolder.file(`${i}.xlsx`,XLSX.utils.sheet_to_html(xlsx))   
        }
        this.setState({visible:true})
        const blob = await zip.generateAsync({type : "blob"},(metadata)=>{//生成zip  //currentFile  percent
            let percent = parseInt(metadata.percent)
            if(metadata.percent&&parseInt(metadata.percent))
            this.setState({percent:percent})    
        })
        this.setState({visible:false})
        FileSaver.saveAs(blob, "Tadpole.zip",{ autoBom: true });  
        
    }

    componentDidMount(){
        this.getUserList()
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
                    title={this.footer}
                    ></Table>
                </div>
                <this.ProgressTip></this.ProgressTip>
            </div>
        )
    }
}

export default DataExport;