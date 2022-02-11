
import React,{ Component } from 'react'
import './loginComponent.scss'
import { Form , Button} from 'antd';
import InputComponent from './inputComponent';
import { util } from 'utils/user'
import { Link } from 'react-router-dom';
import {dologin,getUser} from 'service/login'
import $message from 'views/component/message';

import store from "store/index";
import { setUserInfo} from "store/actionCreators.js";

import weiboimg from 'public/images/weibo.png'
import qqimg from 'public/images/QQ.png'
import wechartimg from 'public/images/wechart.png'
import warnimg from 'public/images/warn.png'

export default class LoginComponent extends Component {
    state={
       loginSwitch:0,
       warnMessage:'',
       mobileValue:'',
       acode:'86',
       captchaShow:false,
    }
    
    submit=async(value)=>{
        console.log(value)
        let {loginSwitch} = this.state,message
        if(loginSwitch){    
            let username = util.validate_mobile(value.mobile)
           
            if(value.captcha){
                let captcha =  util.validate_captcha(value.captcha)
                message = username?username:captcha?captcha:util.validate_password(value.pass) 
            }else{
                 message = username?username:util.validate_password(value.pass) 
            }
            
        }else{
            let mobile = util.validate_mobile(value.mobile)  
            
            if(value.captcha){
                let captcha =  util.validate_captcha(value.captcha)
                message = mobile?mobile:captcha?captcha:util.validate_yzm(value.sms)   
            }else{
                message = mobile?mobile:util.validate_yzm(value.sms)
            }
                
        }
        this.setState({warnMessage:message})
        value.acode && (value.acode='+'+value.acode)
        if(!message){
            let data:API.UserLogin = {
                type:loginSwitch?2:1,
                ...value,
            }
            const res = await dologin(data)
            let url =window.location.search
            if(res.status){
                let userInfoRes= await getUser()
                store.dispatch(setUserInfo(JSON.stringify(userInfoRes.body)))
                if(url){
                    window.location.href=url.split('=')[1]
                }else{
                    window.location.href='/'
                }
                $message.info(res.message)
            }else{
                if(res.errno && res.body>=3 || res.message==='captcha: 不能为空'){
                    this.setState({captchaShow:true})
                }else{
                    $message.info(res.message)
                }
                
            }
                    
        }
    }

    render(){
        let {loginSwitch,warnMessage,mobileValue,acode,captchaShow} = this.state
        return(
            <div id='logincomponent'>
                <div className='loginswitch flexl'>
                    <div 
                        onClick={()=>{this.setState({loginSwitch:0,warnMessage:''})}}
                        className={loginSwitch == 0?'fleximg activeborder':'fleximg'}>
                            手机号登录
                    </div>
                    <div 
                        onClick={()=>{this.setState({loginSwitch:1,warnMessage:''})}}
                        className={loginSwitch == 1?'fleximg activeborder':'fleximg'}>
                        账户登录
                    </div>
                </div>
                <Form
                    className=" topForm"
                    onFinish={this.submit}
                    onFinishFailed={this.submit}
                >
                        {!loginSwitch?(
                            <div>
                                <div className='marg'>
                                    <InputComponent 
                                        GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                        formName='mobile' 
                                        name='mobile' 
                                        MobileValue={(val)=>{this.setState({mobileValue:val})}} 
                                        Acode={(val)=>{this.setState({acode:val})}}
                                    />
                                </div>
                                {captchaShow && <div className='marg'>
                                    <InputComponent 
                                        GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                        formName='captcha' 
                                        name='captcha' 
                                    />
                                </div>
                                }                                  
                                <div className='marg'>
                                    <InputComponent 
                                        GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                        formName='sms' 
                                        name='mobileYZM' 
                                        mobileValue={mobileValue}
                                        acode={acode}
                                    />
                                </div>                                                               
                            </div>
                    ):(
                        <div>   
                            <div className='marg'>
                                <InputComponent 
                                    GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                    formName='mobile' 
                                    name='mobile' 
                                    MobileValue={(val)=>{this.setState({mobileValue:val})}} 
                                    Acode={(val)=>{this.setState({acode:val})}}
                                />
                                {/* <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobile' name='userName'/> */}
                            </div>
                            {captchaShow && <div className='marg'>
                                    <InputComponent 
                                        GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                        formName='captcha' 
                                        name='captcha' 
                                    />
                                </div>
                            }
                            <div className='marg'>
                                <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='pass' name='password'/>
                            </div>                                        
                        </div>
                    )}
                    {warnMessage && 
                        <div className='warn flexl'>
                            <div><img src={warnimg} alt="warn" /></div>
                            <span>{warnMessage}</span>
                        </div>
                    }
                    
                    <Button className='loginbt' htmlType="submit">登录</Button>
                </Form>
                {loginSwitch?
                    <div className='forget flexb'>
                        <Link to='/app/register/forget'><span>忘记密码？</span></Link>
                        
                        <Link to='/app/register/register'><span>免费注册</span></Link>
                    </div>:
                    <div></div>
                }
                <div className='fleximg'>
                    <div className='fleximg wechartimg'>
                        <img src={wechartimg}/>
                    </div>
                    <div className='fleximg wechartimg'>
                        <img src={qqimg}/>
                    </div>
                    <div className='fleximg wechartimg'>
                        <img src={weiboimg}/>
                    </div>
                </div>
            </div>
        )
    }
}