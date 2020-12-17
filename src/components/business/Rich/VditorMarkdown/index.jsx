import React from 'react'
import Vditor from 'vditor'
import "vditor/src/assets/scss/index.scss"

class VditorMarkdown extends React.Component{
    state = {
        vditor : null
    }

    initVditor = ()=>{
        const vditor = new Vditor('vditor', {
            height: 600,
            mode:'sv',
            toolbarConfig: {
              pin: true,
            },
            cache: {
              enable: false,
            },
            after () {
              vditor.setValue('Hello, Vditor + React!')
            },
          })
        this.setState({vditor})          
    }
    componentDidMount(){
        this.initVditor()
    }

    render(){
        return(
            <div className="markdown-page">
                <div id="vditor"></div>
            </div>
        )
    }
}

export default VditorMarkdown