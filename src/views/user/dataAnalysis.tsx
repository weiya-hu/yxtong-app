
import { Component } from "react";
import { Table, Pagination ,ConfigProvider  } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import './dataAnalysis.scss'
import DataOverview from "./component/dataOverview/dataOverview";
import LineCharts from "./component/lineChart/lineChart";
import {dataScreening} from '../../service/user'

import selectimg from '../../public/images/user/select.png'
import unselectimg from '../../public/images/user/unselect.png'



let dataSource = []
for(let i=0;i<10;i++){
    dataSource.push(
        {
            key: i,
            time: '2020-02-18',
            read: 32*i,
            collect: 99-i*3,
            share:3*i,
            comment:10*i
          }
    )
}
const columns = [
    {
        title: '时间',
        dataIndex: 'time',
        align:'center' as 'center',
        width:200
    },
    {
      title: '阅读（播放）数',
      dataIndex: 'read',
      sorter: (a, b) => a.read - b.read,
      align:'center' as 'center',
      width:175
    },
    ,
    {
      title: '收藏数',
      dataIndex: 'collect',
      align:'center' as 'center',
      width:175,
      sorter: (a, b) => a.collect - b.collect,
    },
    ,
    {
      title: '分享数',
      dataIndex: 'share',
      align:'center' as 'center',
      width:175,
      sorter: (a, b) => a.share - b.share,
    },
    ,
    {
      title: '评论数',
      dataIndex: 'comment',
      align:'center' as 'center',
      width:175,
      sorter: (a, b) => a.comment - b.comment,
    }
];
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
        overViewTxt:['阅读（播放）数','收藏总数','分享总数','评论总数'],//数据总览的数据类型
        dayName:['最近7天','最近14天','最近30天','最近90天'],//图表中时间段
        dayNameActive:0,//图表中时间段active
        overViewTxts:['阅读（播放）数','收藏数','分享数','评论数'],//图表中数据类型
        overViewTxtsActive:0,//图表中数据类型active
        chartData:[],
        current:1,//分页当前页
        pageSize:5,//每页条数
    }
    setOption=()=>{

    }
    getDataScreening=async()=>{
      let analysisId=sessionStorage.getItem('analysisId'),data={};
      if(analysisId){
        data={newsId:analysisId}
      }
      const res = await dataScreening(data)
      console.log(res)
    }
    componentDidMount(){
      let arr=[]
      for(let i=0;i<7;i++){
        let item = [''+i+i*i+3,i+i*i+3]
        arr.push(item)
      }
      console.log(arr)
      this.setState({chartData:arr})
      this.getDataScreening()
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
                      key={index}
                      className={dayNameActive===index?'day-name fleximg day-name-active':'day-name fleximg'}
                      onClick={()=>{this.setState({dayNameActive:index})}}
                    >{item}</div>
                  ))}
                </div>
                <div className='flexr'>
                  {overViewTxts.map((item,index)=>{
                    return(
                      <div 
                        key={index}
                        className='flexr data-title-overview-item'
                        onClick={()=>{this.setState({overViewTxtsActive:index})}}
                      >
                        <div className='selectimg fleximg'><img src={overViewTxtsActive === index?selectimg:unselectimg} alt="select" /></div>
                        <div>{item}</div>
                      </div>
                    )})}
                </div>
              </div>
              <div>
                  <LineCharts data={this.state.chartData}/>
              </div>
            </div>
            <div className='back mtop'>
              <div className='font16 bold'>分日报表</div>
              <div className='score_detailed'>
              <ConfigProvider locale={zhCN}>
                <Table 
                    rowClassName={(record,index)=>index%2 === 1?'row-active':''}
                    size='middle' 
                    showHeader={true} 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={false}
                />
                </ConfigProvider>
                <div className='flexr pagination paginations'>
                    <Pagination 
                      total={dataSource.length} current={this.state.current} pageSize={this.state.pageSize} size='small'/>
                </div>
              </div>
            </div>
        </div> 
    }
}