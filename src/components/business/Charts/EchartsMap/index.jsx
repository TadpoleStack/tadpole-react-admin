import React from 'react'
// import * as mapUtils from 'element-china-area-data'
import './index.scss'
class EchartsMap extends React.Component{
    state = {
        Instance:null,//echarts实例
        currMap:null,//当前地图
        mapHistory:[],//切换地图历史记录
        once:false,//事件监听只监听一次
        changeAnimateSign:'in'//切换地图根据向下为 in 向上为 out
    }
    echartsBox = React.createRef()
    getMapData = async (nextMapData={})=> {
        let res = await React.$api.map.getMapData(nextMapData.level,nextMapData.adcode)
        React.$Echarts.registerMap(nextMapData.name?nextMapData.name:'china',res.data)
        this.setState({currMap:res.data})
        this.setOptions(res.data,nextMapData.name)
    }
    setOptions = (map,mapName)=>{
        const { Instance, once, changeAnimateSign } = this.state
        let regions = []//regions自定义区域类型
        let scatter = []//描点数据
        map.features.forEach((v,i) => {
            regions.push({name:v.properties.name,itemStyle:{areaColor:i<4?'red':'#6fc9fd'}})
            if(i===0)scatter.push({name:v.properties.name,value:v.properties.center})
        })
        let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}'
            },
            backgroundColor:'rgba(25,50,85,1)',
            geo: {
              map: mapName?mapName:'china',
              roam:true,
              zoom:1,
              nameMap:{china:'中国'},
              label: {show:true,color:'#fff'},
              itemStyle: {
                  areaColor: '#6fc9fd',
                  borderColor: '#6DBEEB',
                  shadowColor: 'rgba(0,54,255, .3)',
                  shadowBlur: 10                
              },
              emphasis: {
                label:{color:'#fff'},
                itemStyle:{
                    areaColor: '#49F5E4',
                    borderColor:'#eee'
                }
              },
              regions:regions
            },
            series:[
                {
                    type:'effectScatter',
                    coordinateSystem:'geo',
                    symbolSize:12,
                    itemStyle:{color:'yellow'},
                    emphasis:{
                        itemStyle:{color:'orange'}
                    },
                    data:scatter
                }
            ],
            animationDuration:1000,
            animationEasing:'cubicOut',
            animationDurationUpdate:1000
          }
        
        this.echartsBox.current.setAttribute('class',`echarts-map hide-${changeAnimateSign}`)
        setTimeout(() => {
            Instance.setOption(option,true)
            if(!once){//只监听一次
                Instance.on('dblclick',item=>{
                    this.echartsClick(item)
                })
                Instance.getZr().on('dblclick', e=> {
                    if (!e.target)this.clickBlank()
                });
                window.addEventListener('resize',()=>{Instance.resize()})
                this.setState({once:true})
            }
            this.echartsBox.current.setAttribute('class',`echarts-map normal-${changeAnimateSign}`)
            setTimeout(() => {this.echartsBox.current.setAttribute('class',`echarts-map show-${changeAnimateSign}`)}, 100);
        }, 400);
    }
    echartsClick = item => {
        const {currMap, mapHistory} = this.state
        if(item.componentType==='geo'){
            const nextMapData = currMap.features.find(v=>v.properties.name===item.name)
            if(nextMapData&&currMap.features.length!==1){
                this.setState({changeAnimateSign:'in'})
                let temp = mapHistory.slice()
                temp.push(nextMapData.properties)
                this.setState({mapHistory:[...new Set(temp)]})
                this.getMapData(nextMapData.properties)
            }
        }
    }

    clickBlank = () =>{
        const {mapHistory} = this.state
        this.setState({changeAnimateSign:'out'})
        this.setState({mapHistory:mapHistory.slice(0,mapHistory.length-1)})
        let item = this.state.mapHistory[this.state.mapHistory.length-1]
        if(item)this.getMapData(item)
        else this.getMapData()
    }

    componentDidMount(){
        const Instance = React.$Echarts.init(this.echartsBox.current,'light')
        this.setState({Instance:Instance})
        this.getMapData()
    }
    render(){
        return(
            <div className="echarts-map-page">
                <div ref={this.echartsBox} className="echarts-map">EchartsMap</div>
            </div>
        )
    }
}

export default EchartsMap;