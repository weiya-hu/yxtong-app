//@ts-nocheck
import { Component } from "react";
import './myTask.scss'
import MyScore from './component/myScore'
import CommonButton from './component/commonButton'
import Task from './component/task'
import { signIn,userTasks,isSignIns } from "service/user";
import {imgs} from 'utils/taskImg'

import signinimg from 'public/images/user/signin.png'
import signinedimg from 'public/images/user/signined.png'

import giftimg from 'public/images/user/gift.png'
import gift7img from 'public/images/user/gift7.png'
import gift14img from 'public/images/user/gift14.png'
import gift30img from 'public/images/user/gift30.png'
import giftSIgnimg from 'public/images/user/giftSIgn.png'
import giftSIgnNoimg from 'public/images/user/giftSIgnNo.png'
import dianimg from 'public/images/user/dian.png'

import chaimg from 'public/images/user/cha.png'

export default class MyTask extends Component{
    state={
         signArr:[1,2,3,4,5,6,7],//签到前六天的循环数组
         signinSuccess:0,//签到成功是否显示
         signInTitle:[
           {name:'连续7天',signInImg:gift7img,val:7},
           {name:'连续14天',signInImg:gift14img,val:14},
           {name:'连续30天',signInImg:gift30img,val:30}],
         signInfo:{giftTitleIndex:-2},
         signInfoAll:{},
         isSignIn:false,
         contDay:0,//签到天数
         signList:[],
         tasks:[],
    }
    doperfect=(val)=>{
      console.log(val)
    }
    getIntegral(day:number){//获取积分
      switch (day) {
          case 7 :
              return this.state.signList[1]&&this.state.signList[1].value
              break;
          case 14 :
              return this.state.signList[2]&&this.state.signList[2].value
              break;
          case 30 :
              return this.state.signList[3]&&this.state.signList[3].value
              break;
          default :
              return this.state.signList[0]&&this.state.signList[0].value
              break;
      }
    }
    //签到按钮
    signIn=async()=>{
       const {isSignIn} = this.state
       if(!isSignIn){
         const {body,status} = await signIn()
         if(status){
            const result = await userTasks()
            const res = await isSignIns()
            this.setState({
               isSignIn:res.body,
               contDay:result.body.signin[0].completed,
               signinSuccess:body,  //签到获得的分数看接口是哪个参数再改一下
            })
            console.log(this.state)
         }
         // res && $message.info(res.message)
       }
    }
    componentDidMount=async()=>{
        const result = await userTasks()
        const res = await isSignIns()
        if(result.status){
            const tasks=result.body.tasks
            let arr=[],ary=[],limitType=tasks[0].limit_type
            for(let i=0;i<tasks.length;i++){
               if(tasks[i].limit_type === limitType){
                  arr.push(tasks[i])
               }else {
                  ary.push(arr)
                  arr=[]
                  arr.push(tasks[i])
                  limitType=tasks[i].limit_type
               }
               if(i === tasks.length-1){
                  ary.push(arr)
               }
            }
            this.setState({
               tasks:ary,
               signList:result.body.signin,
               isSignIn:res.body,
               contDay:result.body.signin[0].completed,
            },()=>{console.log(this.state.contDay);
            })
         }
    }
    render(){
      let {signInTitle,isSignIn,signinSuccess,tasks,contDay} = this.state
      let dateArr:any = []
      // contDay = 28
      if(contDay<7){
         dateArr = [1,2,3,4,5,6,7]
      }else if(contDay>=7&&contDay<14){
         dateArr = [8,9,10,11,12,13,14]
      }else if(contDay>=14&&contDay<24){
         dateArr = [contDay,contDay+1,contDay+2,contDay+3,contDay+4,contDay+5,30]
      }else{
         dateArr = [24,25,26,27,28,29,30]
      }
      return(
          <div className='myTask flexbl'>
             <div className='myTask-son'>
               <MyScore size='small'/>
               <div className='signin'>
                  <div className="flexbl">
                     <div className='flexcbl title'>
                        <span>惊喜福利</span>
                        <div className='font12'>连续7天、14天、30天签到额外赠送积分</div>
                     </div>
                     <div className="myTask-gift flexr">
                        {signInTitle.map((item,index)=><div key={index} className="flexl">
                              <div className="fleximgc">
                                 <div className={contDay>=item.val?'font12':'font12 color3'}>{item.name}</div>
                                 <div className="fleximg giftimg"><img src={contDay>=item.val?item.signInImg:giftimg} alt="gift" /></div>
                              </div>
                              {index<=1 && <div className="fleximg dianimg"><img src={dianimg} alt="and" /></div>}
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='flexb sign-arr'>
                     {dateArr.map((val,index)=><div className={val<=contDay?"fleximgc sign-in-item sign-item":"fleximgc sign-item"} key={index}>
                        <div className="font12">第{val}天</div>
                        {index==dateArr.length-1?<div className='fleximg giftimg'><img src={val<=contDay?giftSIgnNoimg:giftSIgnimg} alt="gift" /></div>:
                           <div className='fleximg signimg'><img src={val<=contDay?signinedimg:signinimg} alt="signin" /></div>
                        }
                        <div className="font12">{this.getIntegral(val)}积分</div>
                        {index==dateArr.length-1&& <div className="sign-surprise fleximg">
                              <span>惊喜礼包</span> 
                              <div></div>
                           </div>
                        }
                     </div>)}
                  </div>
                  <div 
                     onClick={this.signIn}
                     className={isSignIn?'signined-button fleximg':'signin-button fleximg'}
                  >{isSignIn?`已连续签到${contDay}天`:'签到'}</div>
               </div>
               {tasks.map((item,index)=><div className='task' key={index}>
                  <div className='task-title'>{item[0].limit_type ===0?'新手任务积分':item[0].limit_type ===1?'每日赚积分':'任务赚积分'}</div>
                     {item.map((val,indx)=><div className='flexb task-item' key={indx}>
                           <div className='flexl'>
                              <div className='fleximg emailimg'><img src={imgs[val.tag].img} alt={val.tag} /></div>
                              
                              <Task title={val.name} score={`+${val.value}积分`} />
                           </div>
                           <div className="pointer">
                              <CommonButton onclicked={this.doperfect} isBefore={!val.finish} wordBefore={imgs[val.tag].beforeText} wordAfter='已完成'/>
                           </div>
                        </div> 
                     )}
                  </div>
               )}
             </div>
             {/* <div className='ggao'>
                <img src={emailimg} alt="广告" />
              </div> */}
            
            {signinSuccess>0 &&
               <div className='popup'>
               <div className='congratulation'>
                  <div 
                     onClick={()=>{this.setState({signinSuccess:false})}}
                     className='chaimg fleximg'
                     ><img src={chaimg} alt="cha" /></div>
                  <div>
                     <div className='signin-success'>签到成功</div>
                     <div className='signin-score'>恭喜您，获得{signinSuccess}积分</div>
                  </div>
               </div>
               
               </div>
            }
          </div>
       )
    }
} 