//@ts-nocheck
import { Component } from 'react'
import CommonButton from './commonButton'
import { userMycenterInfo,integralToday } from 'service/user'
import './myScore.scss'
import {withRouter} from "react-router-dom";

//一个参数size，对应组件的大小，small\big
class MyScore extends Component<any> {
    state={
        userInfo:{},
        todaySc:null
    }
    exchangeScore=()=>{
        window.location.href='/developmenting.html'
    }
    getScore=async()=>{
        //接口，获取积分
        const {status,body} = await userMycenterInfo()
        const rest = await integralToday()
        status && this.setState({userInfo:body,todaySc:rest.body.today_integral})
    }
    componentDidMount(){
        this.getScore()
    }
    // componentWillUnmount = () => {
    //     this.setState = (state,callback)=>{
    //       return
    //     }
    // }
    render(){
        let {userInfo,todaySc} = this.state
        const {size,todayScore} = this.props
        return <div>
            {size === 'big'?(
                <div className='myscore flexb padding'>
                    <div className='flexl'>
                        <div className='todayscorepre'>
                            <span className='bold'>今日积分：</span>
                            <span className='todayscore bold'>{todayScore>=0?todayScore:todaySc}</span>
                        </div>
                        <div className='todayscorepre fleximg'>
                            <span className='bold'>我的积分：</span>
                            <span className='todayscore bold'>{userInfo.accumulat}</span>
                            {/* <span className='scoremoney'>约{userInfo.balance}元</span> */}
                        </div>
                    </div>
                    {/* <div>
                        <CommonButton onclicked={this.exchangeScore} isBefore={true} wordBefore='立即兑换' wordAfter='已兑换'/>
                    </div> */}
                </div>
            ):(
                <div className='myscore flexb'>
                    <div className='flexcbl' style={{height:'100%'}}>
                        <div className='flexl todayscorepre-up'>
                            <div className='todayscorepre'>
                                <span className='bold'>今日积分：</span>
                                <span className='todayscore bold'>{todayScore>=0?todayScore:todaySc}</span>
                            </div>
                            <div className='todayscorepre '>
                                <span className='bold'>赠送代币券：</span>
                                <span className='todayscore bold'>0</span>
                            </div>
                        </div>
                        
                        <div className='todayscorepre fleximg'>
                            <span className='bold'>我的积分：</span>
                            <span className='todayscore bold'>{todayScore>=0?userInfo.accumulat+todayScore:userInfo.accumulat}</span>
                            {/* <span className='scoremoney'>约{userInfo.balance}元</span> */}
                        </div>
                        
                    </div>
                    {/* <div>
                        <CommonButton onclicked={this.exchangeScore} isBefore={true} wordBefore='立即兑换' wordAfter='已兑换'/>
                    </div> */}
                </div>
            )}
            
        </div>
    }
    
}
export default withRouter(MyScore);