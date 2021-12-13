import { Component } from "react";
import './myTask.scss'
import MyScore from './component/myScore'
import CommonButton from './component/commonButton'
import Task from './component/task'

import signinimg from '../../public/images/user/signin.png'
import signinedimg from '../../public/images/user/signined.png'
import score7img from '../../public/images/user/score7.png'
import emailimg from '../../public/images/user/email.png'
import chaimg from '../../public/images/user/cha.png'

export default class MyTask extends Component{
    state={
        isSignin:false,//是否签到
        signinDay:2,//签到天数
        signArr:[1,2,3,4,5,6],//签到前六天的循环数组
        signinSuccess:false,//签到成功是否显示
    }
    doperfect=(val)=>{
      console.log(val)
    }
    render(){
      let isSignin = this.state.isSignin,signinDay=this.state.signinDay
       return(
          <div className='myTask flexbl'>
             <div className='myTask-son'>
               <MyScore/>
               <div className='signin'>
               <div className='flexb title'>
                  <span>惊喜福利</span>
                  <div
                     className={isSignin?'signined-button':'signin-button fleximg'}
                     >{isSignin?`已连续签到2天`:'签到'}</div>
               </div>
               <div className='font12'>连续7天、14天、30天签到额外赠送积分</div>
               <div className='flexb sign-arr'>
                  {this.state.signArr.map((val)=>(
                     <div className={(val <=signinDay)?'scored score':'score'}>
                     <div className='fleximg signimg'><img src={(val <=signinDay)?signinedimg:signinimg} alt="signin" /></div>
                     <div>+100积分</div>
                     </div>
                     ))}
               </div>
               <div className='score-7 fleximg position'>
                  <div className='fleximg score7img'><img src={score7img} alt="score" /></div>
                  <div className='font12'>+100积分，额外赠送500积分</div>   
                  <div className='surprise fleximg'><span className=''>惊喜大奖</span> </div>
               </div>
               </div>
               <div className='task'>
               <div className='task-title'>新手任务积分</div>
               <div className='flexb task-item'>
                  <div className='flexl'>
                     <div className='fleximg emailimg'><img src={emailimg} alt="email" /></div>
                     <Task title='完成邮箱安全认证' score='+200积分' />
                  </div>
                  <div>
                     <CommonButton onclicked={this.doperfect} isBefore={true} wordBefore='去完善' wordAfter='已完善'/>
                  </div>
               </div> 
               <div className='flexb task-item'>
                  <div className='flexl'>
                     <div className='fleximg emailimg'><img src={emailimg} alt="email" /></div>
                     <Task title='完成邮箱安全认证' score='+200积分' />
                  </div>
                  <div>
                     <CommonButton onclicked={this.doperfect} isBefore={true} wordBefore='去完善' wordAfter='已完善'/>
                  </div>
               </div>
               <div className='flexb task-item'>
                  <div className='flexl'>
                     <div className='fleximg emailimg'><img src={emailimg} alt="email" /></div>
                     <Task title='完成邮箱安全认证' score='+200积分' />
                  </div>
                  <div>
                     <CommonButton onclicked={this.doperfect} isBefore={true} wordBefore='去完善' wordAfter='已完善'/>
                  </div>
               </div>
               </div>
             </div>
             <div className='ggao'>
                <img src={emailimg} alt="广告" />
              </div>
            
            {this.state.signinSuccess &&
               <div className='popup'>
               <div className='congratulation'>
                  <div 
                     onClick={()=>{this.setState({signinSuccess:false})}}
                     className='chaimg fleximg'
                     ><img src={chaimg} alt="cha" /></div>
                  <div>
                     <div className='signin-success'>签到成功</div>
                     <div className='signin-score'>恭喜您，获得100积分</div>
                  </div>
               </div>
               
               </div>
            }
          </div>
       )
    }
} 