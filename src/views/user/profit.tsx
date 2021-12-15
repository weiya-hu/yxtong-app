// @ts-nocheck
import { Component } from "react";
import { Table, Pagination } from 'antd'
import './profit.scss'
import MyScore from "./component/myScore";

let dataSource = []
for(let i=0;i<10;i++){
    dataSource.push(
        {
            key: i,
            time: '2020-02-18 16:12:23',
            score: 32,
            detail: '下载PDF文档',
          },
    )
}
const columns = [
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        align:'center',
        width:290
    },
    {
        title: '积分',
        dataIndex: 'score',
        key: 'score',
        align:'center',
        width:290
    },
    {
        title: '明细',
        dataIndex: 'detail',
        key: 'detail',
        align:'center',
        width:290,
        
    },
];
export default class Profit extends Component{
    constructor(props){
        super(props)
    }
    state={
        current:1,//分页当前页
        pageSize:5,//每页条数
    }
    render(){
        return(
            <div className='profit'>
                <MyScore size='big' />
                <div className='score_detailed'>
                    <div className='tableHeader flexb'>
                        <div>时间</div>
                        <div>积分</div>
                        <div>明细</div>
                    </div>
                    <Table 
                        rowClassName={(record,index)=>index%2 === 1?'row-active':''}
                        size='middle' 
                        showHeader={false} 
                        dataSource={dataSource} 
                        columns={columns} 
                        pagination={false}
                    />
                    <div className='flexr pagination paginations'>
                        <Pagination total={dataSource.length} current={this.state.current} pageSize={this.state.pageSize} size='small'/>
                    </div>
                </div>

                
            </div>
        )
    }
}