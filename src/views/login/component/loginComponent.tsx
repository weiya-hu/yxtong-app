import React,{ Component } from 'react'
import './loginComponent.scss'
import { Form , Button} from 'antd';
import InputComponent from './inputComponent';
import { util } from '../../../utils/user'
import { Link } from 'react-router-dom';
import {token,dologin,captcha} from '../../../service/login'

import weiboimg from '../../../public/images/weibo.png'
import qqimg from '../../../public/images/QQ.png'
import wechartimg from '../../../public/images/wechart.png'
import warnimg from '../../../public/images/warn.png'

export default class LoginComponent extends Component {
    state={
       loginSwitch:0,
       warnMessage:'',
       mobileValue:'',
       acode:'86'
    }
    formRef = React.createRef()
    
    submit=async(value)=>{
        console.log(value)
        let {loginSwitch} = this.state,message
        if(loginSwitch){    
            let username = util.validate_mobile(value.mobile)
            message = username?username:util.validate_password(value.pass) 
            
        }else{
            let mobile = util.validate_mobile(value.mobile)     
            message = mobile?mobile:util.validate_yzm(value.sms)    
        }
        this.setState({warnMessage:message})
        value.acode && (value.acode='+'+value.acode)
        if(!message){
            let data:API.UserLogin = {
                type:loginSwitch?2:1,
                ...value,
            }
            const res = await dologin(data)
            if(res.status){
                localStorage.setItem('token',res.body);

            }
        }
    }

    componentDidMount=async()=>{
        let tokens =localStorage.getItem('token')
        if(!tokens){
            const res = await token()
            localStorage.setItem('token',res.body)
        }        
    }
    
    render(){
        let {loginSwitch,warnMessage,mobileValue,acode} = this.state
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
                    // ref={this.formRef}
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
                        <Link to='/APP/register/forget'><span>忘记密码？</span></Link>
                        
                        <Link to='/APP/register/register'><span>免费注册</span></Link>
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