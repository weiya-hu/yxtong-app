// @ts-nocheck
import { Component } from 'react'
import './register.scss'
import { Form , Button} from 'antd';
import InputComponent from './component/inputComponent';
import { util } from '../../utils/user'
import { Link } from 'react-router-dom';

import logoimg from '../../public/images/logo.png'
import warnimg from '../../public/images/warn.png'
import unselectimg from '../../public/images/unselect.png'
import selectimg from '../../public/images/select.png'

export default class Register extends Component {
    state={
        isForget:'',//模式选择，是忘记密码还是注册，候选值有forget,next,register
        warnMessage:'',//input框验证错误
        registermessage:'密码最小长度6个字，最大长度16个字；必须包含字母、数字、不能和用户名相同',
        inviteCode:'',//邀请码默认值
        agree:false,//是否阅读并同意协议的默认值
    }
    nextSubmit=(value)=>{
        console.log(value)
        let mobile = util.validate_mobile(value.mobile),message     
        message = mobile?mobile:util.validate_yzm(value.mobileYZM)   
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
    registerSubmit=(value)=>{
        console.log(value)
        let mobile = util.validate_mobile(value.mobile),message  
        let mobileYZM = util.validate_yzm(value.mobileYZM)
        message = mobile?mobile:(mobileYZM?mobileYZM:util.validate_passwordRegister(value.password))   
        this.setState({warnMessage:message})
        if(!message){
            if(!this.state.agree){
                this.setState({warnMessage:'请阅读并同意《药智网用户须知》'})
            }else{
                console.log('下一步ok')
                console.log(value)
                //接口，免费注册
            }            
        }      
    }
    componentDidMount(){
        let pathname = this.props.location.pathname.split('/')
        this.setState({isForget:pathname[2]})
    }
    render(){
        let isForget = this.state.isForget,warnMessage=this.state.warnMessage,registermessage=this.state.registermessage
        return <div id='register'>
            <div className='content'>
                <div className='logoimg flexl'><img src={logoimg} alt="logo" /></div>
                {(isForget === 'forget')?(
                    <div className='forget'>
                        <div className='forgettitle'>找回密码</div>
                        <div className='forgetform'>
                            <Form
                                onFinish={this.nextSubmit}
                                onFinishFailed={this.nextSubmit}
                            >   
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobile' name='mobile'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobileYZM' name='mobileYZM'/>
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
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobile' name='mobile'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobileYZM' name='mobileYZM'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='password' name='passwordRegister'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='inviteCode' name='inviteCode' defaultValue={this.state.inviteCode}/>
                                </div>
                                <div className='warnnext flexll'>
                                    <div><img src={warnimg} alt="warn" /></div>
                                    <span>{warnMessage?warnMessage:registermessage}</span>
                                </div> 
                                <Button className='forgetnextbt' htmlType="submit">免费注册</Button>
                                <div className='flexl agree' onClick={()=>{this.setState({agree:!this.state.agree})}}>
                                    {this.state.agree?
                                        (<div><img src={selectimg} alt="checked" /></div> ):
                                        (<div><img src={unselectimg} alt="unchecked" /></div> )
                                    }
                                    <span>我已阅读并同意</span>
                                    <Link>《药智网用户须知》</Link>                                   
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