import { Component } from 'react'
import * as ReactDOM from 'react-dom';
import './popupLogin.scss'
import { Form , Button} from 'antd';
import InputComponent from './component/inputComponent';
import { util } from '../../utils/user'
import {BrowserRouter as Router, Link } from 'react-router-dom';
import {dologin} from '../../service/login'
import $message from '../component/message';

import weiboimg from '../../public/images/weibo.png'
import qqimg from '../../public/images/QQ.png'
import wechartimg from '../../public/images/wechart.png'
import warnimg from '../../public/images/warn.png'
import mainbackground from '../../public/images/mainbackground.jpg'
import chaimg from '../../public/images/cha.png'

interface PopupLoginState{
    show?:(val:boolean)=>void
}

export default class PopupLogin extends Component<PopupLoginState> {
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
            if(res.status){
                localStorage.setItem('accessToken',res.body);
                window.location.href = window.location.href
            }else{
                if(res.errno && res.body>=3 || res.message==='captcha: 不能为空'){
                    this.setState({captchaShow:true})
                }
            }
                $message.info(res.message)
        }
    }
    close=()=>{
        this.props.show(false)
    }
    componentDidMount(){
        localStorage.removeItem('accessToken')
    }
    render(){
        let {loginSwitch,warnMessage,mobileValue,acode,captchaShow}=this.state
        return (
            <div className='popuplogin-item fleximg' id='popuplogin-item'>0
                <div className='flexll popuplogin'>
                    <div className='fleximgtop mainimg' style={{height:'100px'}}>
                        <img src={mainbackground} alt="main" />
                    </div>
                    <div className='loginmain'>
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
                                    <div >
                                        <div className='marg'>
                                            <InputComponent  
                                                GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                                formName='mobile' 
                                                name='mobile' 
                                                height='short'
                                                MobileValue={(val)=>{this.setState({mobileValue:val})}} 
                                                Acode={(val)=>{this.setState({acode:val})}}
                                            />
                                        </div> 
                                        {captchaShow && <div className='marg'>
                                            <InputComponent 
                                                GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                                height='short'
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
                                                height='short'
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
                                        height='short'
                                        MobileValue={(val)=>{this.setState({mobileValue:val})}} 
                                        Acode={(val)=>{this.setState({acode:val})}}
                                    />
                                    </div>   
                                    {captchaShow && <div className='marg'>
                                            <InputComponent 
                                                GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} 
                                                height='short'
                                                formName='captcha' 
                                                name='captcha' 
                                            />
                                        </div>
                                        }  
                                    <div className='marg'>
                                        <InputComponent  GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='pass' name='password' height='short'/>
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
                        {loginSwitch ?
                            <div className='forget flexb'>
                                <Link to='/app/register/forget'><span>忘记密码？</span></Link>
                                
                                <Link to='/app/register/register'><span>免费注册</span></Link>
                            </div>:
                            <div></div>
                        }
                        <div className='fleximg'>
                            <div className={!loginSwitch?'fleximg wechartimg':'fleximg wechartimg wechartimguser'}>
                                <img src={wechartimg}/>
                            </div>
                            <div className={!loginSwitch?'fleximg wechartimg':'fleximg wechartimg wechartimguser'}>
                                <img src={qqimg}/>
                            </div>
                            <div className={!loginSwitch?'fleximg wechartimg':'fleximg wechartimg wechartimguser'}>
                                <img src={weiboimg}/>
                            </div>
                        </div>
                    </div>
                    <div className='chaimg fleximgtop' onClick={this.close}>
                        <img src={chaimg} alt="×" />
                    </div>
                </div>
            </div>
        )
        
    }
    
}
// 挂载容器到页面
 function createMessage(dom){
    let el = document.getElementById('popuplogin-item');
    // 这一步是必要的的，因为在执行到这里的时候，页面还没有挂载，所以获取不到el节点
    if (!el) {
        el = document.createElement('div')
        el.className = 'popuplogin-item'
        el.id = 'popuplogin-item'
        
    }
    dom.append(el)
    ReactDOM.render( <PopupLogin />, el);
  }