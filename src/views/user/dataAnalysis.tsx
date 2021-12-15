// @ts-nocheck
import { Component } from "react";
import './dataAnalysis.scss'
import DataOverview from "./component/dataOverview/dataOverview";

export default class DataAnalysis extends Component{
    state={
        overView:[
            {num:2488,
             yesterday:7
            },
            {num:30,
             yesterday:0
            },
            {num:450,
            yesterday:7
            },
            {num:8,
            yesterday:0
            },
        ],
        overViewTxt:['阅读（播放）数','收藏总数','分享总数','评论总数'],
        dayName:['最近7天','最近14天','最近30天','最近90天'],
        dayNameActive:0,
        overViewTxts:['阅读（播放）数','收藏数','分享数','评论数'],
        overViewTxtsActive:0

    }
    componentDidMount(){

    }
    render(){
      let overViewTxt=this.state.overViewTxt,dayName=this.state.dayName,overViewTxts=this.state.overViewTxts
      let dayNameActive=this.state.dayNameActive,overViewTxtsActive=this.state.overViewTxtsActive
      return<div className='data-analysis'>
            <div className='back'>
                <div className='font16 bold'>数据总览</div>
                <div className='flexb data-analysis-back-item'>
                    {
                      this.state.overView.map((item,index)=>{
                        return(<DataOverview item={item} txt={overViewTxt[index]}/>)
                      })
                    }
                </div>
            </div>
            <div className='back mtop'>
              <div className='font16 bold'>数据趋势</div>
              <div className='flexb data-title'>
                <div className='flexl'>
                  {dayName.map((item,index)=>(
                    <div 
                      className={dayNameActive===index?'day-name fleximg day-name-active':'day-name fleximg'}
                      onClick={()=>{this.setState({dayNameActive:index})}}
                    >{item}</div>
                  ))}
                </div>
                <div>
                  {overViewTxts.map((item,index)=>{
                    return(
                      <div>
                        
                      </div>
                    )})}
                </div>
              </div>
            </div>
        </div> 
    }
}