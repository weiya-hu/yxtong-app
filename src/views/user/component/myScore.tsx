import { Component } from 'react'
import CommonButton from './commonButton'
import './myScore.scss'
//一个参数size，对应组件的大小，小不用传，默认是小的
export default class MyScore extends Component<any> {
    constructor(props){
        super(props)
    }
    exchangeScore=(val)=>{
        console.log(val)
    }
    componentDidMount(){
        //接口，获取积分
    }
    render(){
        return <div className={this.props.size?'myscore flexb padding':'myscore flexb'}>
            <div className='flexl'>
                <div className='todayscorepre'>
                    <span className='bold'>今日积分：</span>
                    <span className='todayscore bold'>2080</span>
                </div>
                <div className='todayscorepre fleximg'>
                    <span className='bold'>我的积分：</span>
                    <span className='todayscore bold'>580</span>
                    <span className='scoremoney'>约25.5元</span>
                </div>
                
            </div>
            <div>
                <CommonButton onclicked={this.exchangeScore} isBefore={true} wordBefore='立即兑换' wordAfter='已兑换'/>
            </div>
        </div>
    }
    
}