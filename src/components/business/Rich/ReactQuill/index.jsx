import React from 'react'
import { Card } from 'antd'
import ReactQuillEdit from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import {ResponsiveContext} from '@src/context'

class ReactQuill extends React.Component{
    static contextType = ResponsiveContext;
    state = {
        value:''
    }
    setValue = (value,...arg)=>{
        this.setState({value})
    }
    render(){
        const {value} = this.state
        return(
            <div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    <div style={{width:this.context==='PC'?'50%':'100%'}}>
                        <Card>
                            <ReactQuillEdit className="quill-edit-box" theme="snow" value={value} onChange={this.setValue}>
                            </ReactQuillEdit>
                        </Card>
                    </div>
                    <div style={{width:this.context==='PC'?'50%':'100%'}}>
                        <Card title={'所见即所得——富文本(ReactQuill)'}>
                            <div style={{minHeight:'580px'}} dangerouslySetInnerHTML={{__html:value}}></div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReactQuill