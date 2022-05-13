import { Component } from 'react'
import './inputComponent.scss'
import { Form, Select} from 'antd'
import {areaNum} from 'public/js/areaNum'
import downselectimg from 'public/images/downselect.png'
import openimg from 'public/images/open.png'
import closeimg from 'public/images/close.png'
import { util } from 'utils/user'
import {sendSms,sendSmsreg,captcha,sendResetsms} from 'service/login'

import message from 'views/component/message/index'

const { Option } = Select;
//五个参数，name：组件的标识，formName：表单name，和后端传的数据名有关，title：组件前面的label，可传可不传，在登录密码、确认密码这两个中必传，defaultValue一般指邀请码的默认值
// GETFalseMessage：组件传给父组件的值，是组件表单验证后的message，没有错误传的空字符串''
export default class InputComponent extends Component<any> {
    constructor(props){
        super( props)    
    }
    userInputRef = null
    state={
        countryCode:'86',//国家区号的默认值
        getYZMflag:false,//获取验证码的开关，为true后才能获取验证码，到时候后为FALSE关闭
        mobileYZMnum:120,
        YZMtxt:'获取验证码',//后面会切换为重获验证码
        password:'',//用于切换密码框的input为password或者text时的赋值
        ispassword:true,//用于切换密码框的input为password或者text
        mobileInput:'',
        captcha:''

    }
    selectChange=(val,option)=>{
        console.log(val,option)
        this.setState({
            countryCode:val
        })
        this.props.Acode(val)
    }
    getYZm=async()=>{
        let {mobileValue,acode,type}=this.props
        let msg = util.validate_mobile(mobileValue)
        if(msg){
            this.props.GETFalseMessage(msg)
        }else{
            let flag = true
            this.setState({
                getYZMflag:flag,
            })
            if(flag){
                //接口，获取接口发验证码     
                let timer = setInterval(()=>{                
                    let num = this.state.mobileYZMnum
                    if(num>1){
                        this.setState({
                            mobileYZMnum:num - 1
                        })
                    }else{
                        flag = false
                        this.setState({
                            getYZMflag:flag,
                            mobileYZMnum:120,
                            YZMtxt:'重获验证码'
                        })
                        clearInterval(timer)
                    }                 
                },1000)
                let data={
                    acode:'+'+acode,
                    mobile:mobileValue
                }

                const res =  type==='register'?await sendSmsreg(data):type==='reset'?await sendResetsms(data) : await sendSms(data)
                if(res.status){
                    message.info(res.message)
                }
            }
        }
        
    }
    inputBlur=(e,name)=>{
        const value = e.target.value
        let message
        switch(name){
            case 'mobile':
                message = util.validate_mobile(value)
                break;
            case 'mobileYZM':
                message = util.validate_yzm(value)                
                break;
            case 'password':
                message = util.validate_password(value)
                break;
            case 'passwordRegister':
                message = util.validate_passwordRegister(value)
                break;
            case 'captcha':
                message = util.validate_captcha(value)
                break;
        }
        this.props.GETFalseMessage(message)
    }
    passwordChange=(e)=>{
        this.setState({password : e.target.value})
    }
    getCaptcha=async()=>{
        const res= await captcha()
        res.status && this.setState({captcha:res.body})
    }
    componentDidMount=()=>{
        this.props.name==='captcha' && this.getCaptcha()
        this.userInputRef?.focus()
    }
    render(){
        let component
        const {name,formName,title,defaultValue,height}=this.props;
        const {ispassword,countryCode,captcha}=this.state;
        switch(name){
            case 'mobile':
                component =(
                    <div className={height?'phone flexl height':'phone flexl'}  >    
                        <div className='phoneselectpre '>
                            <Form.Item name="acode" initialValue={countryCode}>
                                <Select className='phoneselect' onChange={(val,option)=>{this.selectChange(val,option)}}>
                                    {areaNum.map((item,index)=><Option key={index} value={item.tel}>{item.name}</Option>)}
                                                                     
                                </Select>  
                            </Form.Item>                      
                        </div> 
                        <div className='flexl countrycode'>
                            <div className='countrycodetxt'>+{countryCode}</div>
                            <div className='fleximg downselectimg'>
                                <img src={downselectimg}/>
                            </div>
                            <div className='line'></div>
                            <Form.Item 
                                name={formName}
                            >
                                <input 
                                    autoComplete='new-password'  
                                    // value = { this.state.mobileInput} 
                                    onChange={(e)=>{this.setState({mobileInput :e.target.value });this.props.MobileValue(e.target.value)}} 
                                    type="tel" 
                                    placeholder='请输入手机号' 
                                    // ref={(ref) => {
                                    //     this.userInputRef = ref
                                    // }}
                                    onBlur={(e)=>{this.inputBlur(e,name)}}
                                />
                            </Form.Item>
                        </div>
                                   
                    </div>
                )
                break;
            case 'mobileYZM':
                component = (
                    <div id='mobileYZM'  className={height?'phone flexb height':'phone flexb'}>
                        <div className='flexl'>
                            <div className='yzmTXT'>{title?title:'验证码'}</div>
                            <Form.Item name={formName}>
                                <input 
                                    autoComplete='new-password' 
                                    // value = { this.state.YZMinput } 
                                    // onChange={(e)=>{this.setState({YZMinput :e.target.value })}} 
                                    type="text" 
                                    placeholder='请输入验证码' 
                                    onBlur={(e)=>{this.inputBlur(e,name)}}
                                />
                            </Form.Item>
                        </div>
                        {this.state.getYZMflag?                        
                        <div className='getyzmTXTtime getyzmTXT'>{this.state.mobileYZMnum}'后重新获取</div>:
                        <div className='getyzmTXT' onClick={this.getYZm}>{this.state.YZMtxt}</div> }     
                    
                    </div>
                )
                break;
            case 'captcha':
                component = (
                    <div  id='capture' className={height?'height flexb':'flexb'}>
                        <div  className='capture phone flexb'>
                            <Form.Item name={formName}>
                                <input 
                                    autoComplete='new-password' 
                                    // value = { this.state.YZMinput } 
                                    // onChange={(e)=>{this.setState({YZMinput :e.target.value })}} 
                                    type="text" 
                                    placeholder='请输入验证码' 
                                    onBlur={(e)=>{this.inputBlur(e,name)}}
                                />
                            </Form.Item>
                        </div>
                        <div className='fleximg captchaimg' onClick={ this.getCaptcha}><img src={captcha} alt="captcha" /></div>
                    </div>
                )
                break;
            case 'userName':
                component = (
                    <div id='userName'  className={height?'phone flexl height':'phone flexl'}>
                        <div className='flexl'>
                            <div className='yzmTXT'>{title?title:'账户'}</div>
                            <Form.Item name={formName}>
                                <input 
                                    autoComplete='new-password' 
                                    type="tel" 
                                    placeholder='请输入手机号' 
                                    onBlur={(e)=>{this.inputBlur(e,'mobile')}}
                                />
                            </Form.Item>
                        </div>                          
                    </div>
                )
                break;
            case 'password':
                component = (
                    <div id='userName'  className={height?'phone flexb height':'phone flexb'}>

                            <div className='flexl'>
                                <div className='yzmTXT'>{title?title:'密码'}</div>
                                <Form.Item name={formName}>
                                    {ispassword?
                                        <input 
                                            autoComplete='new-password' 
                                            type="password" 
                                            onBlur={(e)=>{this.inputBlur(e,name)}}
                                            value={this.state.password} onChange={this.passwordChange} 
                                            placeholder='请输入密码' 
                                        />:
                                        <input 
                                            autoComplete='new-password' 
                                            type="text" 
                                            value={this.state.password} 
                                            onBlur={(e)=>{this.inputBlur(e,name)}}
                                            onChange={this.passwordChange} 
                                            placeholder='请输入密码' 
                                        />
                                    }
                                </Form.Item>
                            </div>                                
                            <div>
                                {ispassword?
                                    <img src={closeimg} onClick={()=>{this.setState({ispassword:!this.state.ispassword})}} alt="close" />:
                                    <img src={openimg} onClick={()=>{this.setState({ispassword:!this.state.ispassword})}} alt="open" />   
                                }
                            </div>                       
                    </div>
                )
                break;
            case 'passwordRegister':       
                component = (
                    <div id='passwordRegister'  className={height?'phone flexb height':'phone flexb'}>
                        <div className='flexl'>
                            <div className='yzmTXT'>{title?title:'登录密码'}</div>
                            <Form.Item name={formName}>
                                {ispassword?
                                    <input 
                                        autoComplete='new-password' 
                                        type="password" 
                                        onBlur={(e)=>{this.inputBlur(e,name)}}
                                        value={this.state.password} onChange={this.passwordChange} 
                                        placeholder='请输入密码' 
                                    />:
                                    <input 
                                        autoComplete='new-password' 
                                        type="text" 
                                        value={this.state.password} 
                                        onBlur={(e)=>{this.inputBlur(e,name)}}
                                        onChange={this.passwordChange} 
                                        placeholder='请输入密码' 
                                    />
                                }
                            </Form.Item>
                        </div>                                
                    <div>
                        {ispassword?
                            <img src={closeimg} onClick={()=>{this.setState({ispassword:!this.state.ispassword})}} alt="close" />:
                            <img src={openimg} onClick={()=>{this.setState({ispassword:!this.state.ispassword})}} alt="open" />   
                        }
                    </div>                       
                </div>
                )
                break;
            case 'passwordSure':
                component = (
                    <div id='userName'  className={height?'phone flexb height':'phone flexb'}>
                        <div className='flexl'>
                            <div className='yzmTXT'>{title?title:'登录密码'}</div>
                            <Form.Item name={formName}>
                                {ispassword?
                                    <input 
                                        autoComplete='new-password' 
                                        type="password" 
                                        onBlur={(e)=>{this.inputBlur(e,name)}}
                                        value={this.state.password} onChange={this.passwordChange} 
                                        placeholder='请输入密码' 
                                    />:
                                    <input 
                                        autoComplete='new-password' 
                                        type="text" 
                                        value={this.state.password} 
                                        onBlur={(e)=>{this.inputBlur(e,name)}}
                                        onChange={this.passwordChange} 
                                        placeholder='请输入密码' 
                                    />
                                }
                            </Form.Item>
                        </div>                                
                    <div>
                        {ispassword?
                            <img src={closeimg} onClick={()=>{this.setState({ispassword:!this.state.ispassword})}} alt="close" />:
                            <img src={openimg} onClick={()=>{this.setState({ispassword:!this.state.ispassword})}} alt="open" />   
                        }
                    </div>                       
                </div>
                )
                break;
            case 'inviteCode':
                    component = (
                        <div id='inviteCode'  className={height?'phone flexb height':'phone flexb'}>
                            <div className='flexl'>
                                <div className='yzmTXT'>{title?title:'邀请码'}</div>
                                <Form.Item name={formName} >
                                    <input 
                                        autoComplete='new-password' 
                                        type="text" 
                                        defaultValue={defaultValue} 
                                        // disabled={defaultValue?true:false}
                                        placeholder='请输入邀请码' 
                                    />
                                </Form.Item>
                            </div>                                
                            <span className='filling'>选填</span>                      
                        </div>
                    )
                    break;
        }
        return component
    
    }
}