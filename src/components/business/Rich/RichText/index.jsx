import React from 'react';
import { Card } from 'antd'
import BraftEditor from 'braft-editor';// 引入编辑器组件
import 'braft-editor/dist/index.css';// 引入编辑器样式
import 'braft-editor/dist/output.css';//美化输出后的样式
import {ResponsiveContext} from '@src/context'

class RichText extends React.Component{
    static contextType = ResponsiveContext;
    constructor(props){
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(null),// 创建一个空的editorState作为初始值
            editorHTML: ''
        }
        this.editorInstance = React.createRef()
    }

    handleEditorChange = editorState => {
        let editorHTML = editorState.toHTML()
        this.setState({editorState, editorHTML})
    }

    saveContent = async ()=>{
        //接口保存HTML(聚焦状态下ctrl+s)
        //this.editorInstance.getValue()通过实例方法获取编辑器内容
        //通过 toHTML方法转换成HTML字段
        // console.info(this.editorInstance.getValue().toHTML())
    }

    componentDidMount(){
        /** 后台服务器数据
         * this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
         */
        this.setState({
            editorState: BraftEditor.createEditorState('<p>青山不改绿水长流，咋们后会有期！</p><p></p>')
        })
    }

    render(){
        const { editorState, editorHTML } = this.state
        return(
            <div className="richtext-page" style={{height:'100%'}}>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    <div style={{width:this.context==='PC'?'50%':'100%'}}>
                        <Card>
                            <BraftEditor 
                                ref={instance => this.editorInstance = instance}
                                value={editorState}
                                onChange={this.handleEditorChange}
                                onSave={this.saveContent}
                            ></BraftEditor>
                        </Card>
                    </div>
                    <div style={{width:this.context==='PC'?'50%':'100%'}}>
                        <Card title={'所见即所得——富文本(BraftEditor)'}>
                            <div style={{minHeight:'580px'}} dangerouslySetInnerHTML={{__html:editorHTML}}></div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default RichText;