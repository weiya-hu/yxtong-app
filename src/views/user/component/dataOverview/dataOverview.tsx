
import { Component } from 'react'
import './dataOverview.scss'
import upimg from '../../../../public/images/user/up.png'

type DataOverviewState={
    item:{
        num:number;
        yesterday:number;
    };
    txt:string
    
}

export default class DataOverview extends Component<DataOverviewState> {
    render(){
        let item = this.props.item;
        return <div className='overview-item flexcbl'>
            <div className='num'>{item.num.toLocaleString('en-US')}</div>
            <div className='flexb'>
                <div className='font12 color2'>{this.props.txt}</div>
                <div className='flexr font12 color2'>
                    昨日：
                    <div className='flexl'>
                        {/* <div className='fleximg upimg'><img src={upimg} alt="up" /></div> */}
                        <span className='yesterday'>{item.yesterday}</span>
                    </div>
                </div>
            </div>
        </div>
    }
    
}