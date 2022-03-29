//@ts-nocheck
import { Component } from "react";
import { Table, Pagination } from 'antd'
import './profit.scss'
import moment from 'moment'
import MyScore from "./component/myScore";
import {integralRecord} from 'service/user'
import { withRouter } from 'react-router-dom';

const columns = [
    {
        title: '时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align:'center' as 'center',
        width:290
    },
    {
        title: '积分',
        dataIndex: 'value',
        key: 'value',
        align:'center' as 'center',
        width:290
    },
    {
        title: '明细',
        dataIndex: 'detail',
        key: 'detail',
        align:'center' as 'center',
        width:290,
        
    },
];

class Profit extends Component{
    constructor(props){
        super(props)
    }
    state={
        current:1,//分页当前页
        pageSize:10,//每页条数
        profitList:[],
        profit:{}
    }
    getList=async(current,size)=>{
        let data={
            current: current,
            size: size
        }
        const res = await integralRecord(data)
        if(res.status){
            let {records} = res.body
            if(records.length) {
                for(let i=0;i<records.length;i++){
                    records[i].create_time=moment(records[i].create_time).format('YYYY-MM-DD HH:mm:ss')
                }
            } 
            this.setState({
                profitList:records,
                profit:res.body,
                current:current,//分页当前页
                pageSize:size,
            })
        }
    }
    componentDidMount=async()=>{
        let {current,pageSize}=this.state
        this.getList(current,pageSize)
        
    }
    render(){
        let {profitList,profit,current,pageSize} =this.state
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
                        dataSource={profitList} 
                        columns={columns} 
                        pagination={false}
                    />
                    <div className='flexr pagination paginations'>
                        <Pagination 
                            onChange={this.getList}
                            total={profit.total} 
                            current={current} 
                            pageSize={pageSize} 
                            size='small'
                        />
                    </div>
                </div>

                
            </div>
        )
    }
}

export default withRouter(Profit);