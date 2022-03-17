//@ts-nocheck
import { Component } from 'react'
import './register.scss'
import { Form , Button} from 'antd';
import InputComponent from './component/inputComponent';
import { util } from 'utils/user'
import {doreg} from 'service/login'
import $message from 'views/component/message';


import logoimg from 'public/images/logow.png'
import warnimg from 'public/images/warn.png'
import unselectimg from 'public/images/unselect.png'
import selectimg from 'public/images/select.png'

export default class Register extends Component {
    state={
        isForget:'',//模式选择，是忘记密码还是注册，候选值有forget,next,register
        warnMessage:'',//input框验证错误
        registermessage:'密码长度在6~18之间,不能只是数字或字母',
        inviteCode:sessionStorage.getItem('inviteCode')?sessionStorage.getItem('inviteCode'):'',//邀请码默认值
        agree:false,//是否阅读并同意协议的默认值
        mobileValue:'',
        acode:'86',
    }
    nextSubmit=(value)=>{
        console.log(value)
        let mobile = util.validate_mobile(value.mobile),message     
        message = mobile?mobile:util.validate_yzm(value.sms)   
        this.setState({warnMessage:message})
        if(!message){
            value.countryCode = value.countryCode?value.countryCode:'86'
            console.log('下一步ok')
            console.log(value)
            //接口，下一步
            this.setState({isForget:'next'})
        }
        
    }
    okSubmit=(value)=>{
        console.log(value)
        let registerPassword = util.validate_passwordRegister(value.registerPassword),message     
        message = registerPassword?registerPassword:util.validate_passwordRegister(value.surePassword)   
        if(!message && value.registerPassword === value.surePassword){
            console.log('下一步ok')
            //接口，完成
        }       
    }
    registerSubmit=async(value)=>{
        console.log(value)
        let mobile = util.validate_mobile(value.mobile),message  
        let mobileYZM = util.validate_yzm(value.sms)
        message = mobile?mobile:(mobileYZM?mobileYZM:util.validate_passwordRegister(value.pass))   
        this.setState({warnMessage:message})
        if(!message){
            if(!this.state.agree){
                this.setState({warnMessage:'请阅读并同意《药智网用户须知》'})
            }else{
                value.acode='+'+value.acode
                const res =await doreg({...value})
                if(res.status){
                    window.location.href='/'
                }            
                $message.info(res.message)
            }            
        }      
    }
    toIndex=()=>{
        window.location.href='/'
    }
    componentDidMount(){
        let { location } = this.props as { location }
        let pathname = location.pathname.split('/')
        this.setState({isForget:pathname[3]})
        document.title = pathname[3] === 'forget' ? '康州数智-找回密码':pathname[3] === 'register'?'康州数智-注册':'康州数智-找回密码'
        console.log(pathname[3])
        document.body.style.overflow='hidden'
    }
    render(){
        let {isForget,warnMessage,registermessage,mobileValue,acode} = this.state
        return <div id='register'>
            <div className='content'>
                <div className='logoimg fleximg'><img src={logoimg} alt="logo" onClick={this.toIndex} /></div>
                {(isForget === 'forget')?(
                    <div className='forget'>
                        <div className='forgettitle'>找回密码</div>
                        <div className='forgetform'>
                            <Form
                                onFinish={this.nextSubmit}
                                onFinishFailed={this.nextSubmit}
                            >   
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
                                {warnMessage && 
                                    <div className='warn flexl'>
                                        <div><img src={warnimg} alt="warn" /></div>
                                        <span>{warnMessage}</span>
                                    </div>
                                }
                                <Button className='forgetnextbt' htmlType="submit">下一步</Button>
                            </Form>
                        </div>
                    </div>
                ):(isForget === 'register')?(
                    <div className='forget'>
                        <div className='forgettitle'>新用户注册</div>
                        <div className='forgetform'>
                            <Form
                                onFinish={this.registerSubmit}
                                onFinishFailed={this.registerSubmit}
                            >
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
                                        type='register'
                                    />
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='pass' name='passwordRegister'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='invite_code' name='inviteCode' defaultValue={this.state.inviteCode}/>
                                </div>
                                {
                                    warnMessage && <div className='warnnext flexll'>
                                    <div><img src={warnimg} alt="warn" /></div>
                                    <span>{warnMessage}</span>
                                </div> 
                                }
                                
                                <Button className='forgetnextbt' htmlType="submit">免费注册</Button>
                                <div className='flexl agree' onClick={()=>{this.setState({agree:!this.state.agree})}}>
                                    {this.state.agree?
                                        (<div><img src={selectimg} alt="checked" /></div> ):
                                        (<div><img src={unselectimg} alt="unchecked" /></div> )
                                    }
                                    <span>我已阅读并同意</span>
                                    <span className='Link' onClick={()=>{this.props.history.push('/app/useragreement')}}>《药智网用户须知》</span>
                                </div>
                            </Form>
                        </div>
                    </div>
                ):(
                    <div className='forget'>
                        <div className='forgettitle'>找回密码</div>
                        <div className='forgetform'>
                            <Form
                                onFinish={this.okSubmit}
                                onFinishFailed={this.okSubmit}
                            >
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='registerPassword' name='passwordSure' title='登录密码'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='surePassword' name='passwordSure' title='确认密码'/>
                                </div>
                                <div className='warnnext flexll'>
                                    <div><img src={warnimg} alt="warn" /></div>
                                    <span>{registermessage}</span>
                                </div>                               
                                <Button className='forgetnextbt' htmlType="submit">完成</Button>
                            </Form>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    }
    
}