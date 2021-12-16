// @ts-nocheck
import { Component } from "react";
import './lineChart.scss'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart  } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DatasetComponentOption,
  ToolboxComponent ,
//   DataZoomComponent ,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  ToolboxComponent,
//   DataZoomComponent ,
  TransformComponent,
  LineChart ,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default class LineCharts extends Component{
    constructor(props){
        super(props)
        this.chart=null
    }

    initChart = () => {
        // renderer 用于配置渲染方式 可以是 svg 或者 canvas
        const renderer = 'canvas';
        return new Promise(resolve => {
            setTimeout(() => {
                this.chart = echarts.init(document.getElementById('chart'), null, {
                    renderer,
                    width: 'auto',
                    height: 'auto'
                });
                resolve();
            }, 0);
        });
    }
    async componentDidMount() {
        // 初始化图表
        await this.initChart();
        // 将传入的配置(包含数据)注入
        this.setOption(this.props.data)
    }
    setOption=(data)=>{
        console.log(data)
        let option = {
            animation: true,
            title: {
                show:data.length === 0,
                left: 'center',
                top:'center',
                text: '暂无数据',
            },
            tooltip: {
                show:true,
                triggerOn: 'mousemove|click',
                position: function (pt) {
                    return [pt[0], 130];
                }
            },
            grid:{
                x:30,
                x2:30,
                y:40,
                y2:30
            },
            xAxis: {
                type: 'category',
                offset:10,
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:'#DCDCDC',
                        width:1
                    }
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#363636',
                      },
                },
                axisTick: {
                    inside: true,
                    alignWithLabel:true
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:'#DCDCDC',
                        width:1
                    }
                },
                axisTick: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {

                    inside: false,
                    textStyle: {
                        color: '#363636',
                      },
                    formatter: '{value}\n'
                },
                z: 10
            },

            series: [
                {
                    name: 'name',
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 5,
                    sampling: 'average',
                    itemStyle: {
                        color: '#4193EE '
                    },
                    stack: 'a',
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(25, 135, 255, 0.15)'
                        }, {
                            offset: 1,
                            color: 'rgba(255, 255, 255, 0.15)'
                        }])
                    },
                    data: data
                }
        
            ]
        };
        this.chart.setOption(option,true);
    }
    render(){
        return <div id='chart'></div>
    }
}