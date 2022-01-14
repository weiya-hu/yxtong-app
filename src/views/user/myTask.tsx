//@ts-nocheck
import { Component } from "react";
import './myTask.scss'
import MyScore from './component/myScore'
import CommonButton from './component/commonButton'
import Task from './component/task'
import { signInInfo,signIn,tasks,userTasks } from "../../service/user";
import $message from "../component/message/index";
import {imgs} from '../../utils/taskImg'

import signinimg from '../../public/images/user/signin.png'
import signinedimg from '../../public/images/user/signined.png'

import giftimg from '../../public/images/user/gift.png'
import gift7img from '../../public/images/user/gift7.png'
import gift14img from '../../public/images/user/gift14.png'
import gift30img from '../../public/images/user/gift30.png'
import giftSIgnimg from '../../public/images/user/giftSIgn.png'
import giftSIgnNoimg from '../../public/images/user/giftSIgnNo.png'
import dianimg from '../../public/images/user/dian.png'

import emailimg from '../../public/images/user/email.png'
import chaimg from '../../public/images/user/cha.png'

export default class MyTask extends Component{
    state={
         signArr:[1,2,3,4,5,6,7],//签到前六天的循环数组
         signinSuccess:0,//签到成功是否显示
         signInTitle:[
           {name:'连续7天',signInImg:gift7img},
           {name:'连续14天',signInImg:gift14img},
           {name:'连续30天',signInImg:gift30img}],
         signInfo:{giftTitleIndex:-2},
         signInfoAll:{},
         isSignIn:null,
         tasks:[],
    }
    doperfect=(val)=>{
      console.log(val)
    }
    getSign=(num,str)=>{
      let item
      // if(num ===0){
      //    item={index:num-1,start:1,giftIndex:6,giftTitleIndex:-1,score:str.sevenDay.value,daily:str.daily.value}
      // }
      if(num<=6 && num >=0){
         item={index:num-1,start:1,giftIndex:6,giftTitleIndex:-1,score:str.sevenDay.value,daily:str.daily.value}
      }
      if(num === 7){
         item={index:5,start:2,giftIndex:5,giftTitleIndex:0,score:str.sevenDay.value,daily:str.daily.value}
      }
      if(num >=8 && num <=13){
         item={index:num%7-1,start:8,giftIndex:6,giftTitleIndex:0,score:str.fourteenDay.value,daily:str.daily.value}
      }
      if(num === 14){
         item={index:5,start:9,giftIndex:5,giftTitleIndex:1,score:str.fourteenDay.value,daily:str.daily.value}
      }
      if(num <=19 && num>=15){
         item={index:num%15,start:15,giftIndex:6,giftTitleIndex:1,score:str.thirtyDay.value,daily:str.daily.value}
      }
      if(num <=23 && num>=20){
         item={index:num%20,start:20,giftIndex:6,giftTitleIndex:1,score:str.thirtyDay.value,daily:str.daily.value}
      }
      if(num <30 && num>=24){
         item={index:num%24,start:24,giftIndex:6,giftTitleIndex:1,score:str.thirtyDay.value,daily:str.daily.value}
      }
      if(num === 30){
         item={index:num%24,start:24,giftIndex:6,giftTitleIndex:2,score:str.thirtyDay.value,daily:str.daily.value}
      }
      return item
    }
    //签到按钮
    signIn=async()=>{
       const {isSignIn,signInfoAll} = this.state
       if(!isSignIn){
         // const res = await signIn()
         if(1){
            let item = this.getSign(signInfoAll.contDay+1,signInfoAll)
            this.setState({
               signInfo:item,
               signinSuccess:5,
               isSignIn:true
            })
         }
         // res && $message.info(res.message)
       }
    }
    componentDidMount=async()=>{
        const res =await signInInfo()
      //   const rest = await tasks()
        if(res.status){
           let item=this.getSign(res.body.contDay,res.body)
           this.setState({
             signInfo:item,
             signInfoAll:res.body,
             isSignIn:res.body.isSignIn
           })
        }
      //   if(rest.status){
      //    this.setState({
      //       tasks:rest.body
      //    })
      //   }
        const result = await userTasks()
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
            this.setState({tasks:ary})
         }
    }
    render(){
      let {signInTitle,signInfo,signArr,signInfoAll,isSignIn,signinSuccess,tasks,img,imgtxt} = this.state
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
                                 <div className={this.state.signInfo.giftTitleIndex>=index?'font12':'font12 color3'}>{item.name}</div>
                                 <div className="fleximg giftimg"><img src={this.state.signInfo.giftTitleIndex>=index?item.signInImg:giftimg} alt="gift" /></div>
                              </div>
                              {index<=1 && <div className="fleximg dianimg"><img src={dianimg} alt="and" /></div>}
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='flexb sign-arr'>
                     {signArr.map((val,index)=><div className={index<=signInfo.index?"fleximgc sign-in-item sign-item":"fleximgc sign-item"} key={index}>
                        <div className="font12">第{signInfo.start>=15 && index === 6?30 :signInfo.start+index}天</div>
                        {signInfo.giftIndex===index?<div className='fleximg giftimg'><img src={signInfo.index===index?giftSIgnNoimg:giftSIgnimg} alt="gift" /></div>:
                           <div className='fleximg signimg'><img src={index <= signInfo.index?signinedimg:signinimg} alt="signin" /></div>
                        }
                        <div className="font12">{signInfo.giftIndex===index?signInfo.score:signInfo.daily}积分</div> 
                        {signInfo.giftIndex===index && <div className="sign-surprise fleximg">
                              <span>惊喜礼包</span> 
                              <div></div>
                           </div>
                        }
                     </div>)}
                  </div>
                  <div 
                     onClick={this.signIn}
                     className={isSignIn?'signined-button fleximg':'signin-button fleximg'}
                  >{isSignIn?`已连续签到${signInfoAll.contDay+1}天`:'签到'}</div>
               </div>
               {tasks.map((item,index)=><div className='task' key={index}>
                  <div className='task-title'>{item[0].limit_type ===0?'新手任务积分':item[0].limit_type ===1?'每日赚积分':'任务赚积分'}</div>
                     {item.map((val,indx)=><div className='flexb task-item' key={indx}>
                           <div className='flexl'>
                              <div className='fleximg emailimg'><img src={imgs[val.tag]} alt="email" /></div>
                              
                              <Task title={val.name} score={`+${val.value}积分`} />
                           </div>
                           <div>
                              <CommonButton onclicked={this.doperfect} isBefore={!val.finish} wordBefore='去完成' wordAfter='已完成'/>
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