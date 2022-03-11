

import { Component } from 'react'
import './phoneBindLogin.scss'
import { Form , Button} from 'antd';
import InputComponent from 'views/login/component/inputComponent';
import { util } from 'utils/user'

import {doBindPhone} from 'service/login'
import $message from 'views/component/message';


import logoimg from 'public/images/logow.png'
import warnimg from 'public/images/warn.png'
import unselectimg from 'public/images/unselect.png'
import selectimg from 'public/images/select.png'

export default class phoneBindLogin extends Component {
    state={
        warnMessage:'',//input框验证错误
        inviteCode:sessionStorage.getItem('inviteCode')?sessionStorage.getItem('inviteCode'):'',//邀请码默认值
        agree:false,//是否阅读并同意协议的默认值
        mobileValue:'',
        acode:'86',
        captchaShow:false,//图形验证码是否显示
        header:'',//用户微信头像
        name:'',//用户微信名
    }
    
    registerSubmit=async(value)=>{
        console.log(value)
        let mobile = util.validate_mobile(value.mobile),message  
        let {captchaShow} = this.state
        if(captchaShow){
            let captcha =  util.validate_captcha(value.captcha)
            message = mobile?mobile:captcha?captcha:util.validate_yzm(value.sms)
        }else{
            message = mobile?mobile:util.validate_yzm(value.sms)
        }
        this.setState({warnMessage:message})
        if(!message){
            if(!this.state.agree){
                this.setState({warnMessage:'请阅读并同意《药智网用户须知》'})
            }else{
                console.log('meiwenti')
                value.acode='+'+value.acode
                const res =await doBindPhone({...value,type:3})
                $message.info(res.message)
                if(res.status){
                    window.location.href='/'
                }else{
                    if(res.errno && res.body>=3 || res.message==='captcha: 不能为空'){
                        this.setState({captchaShow:true})
                    }else{
                        $message.info(res.message)
                    }
                    
                }            
                
            }            
        }      
    }
    toIndex=()=>{
        window.location.href='/'
    }
    getUrlParam=(name)=>{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substring(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    componentDidMount(){
        document.title = '康州数智-绑定手机号码'
        document.body.style.overflow='hidden'
        this.setState({
            header:this.getUrlParam('headimgurl'),//用户微信头像
            name:this.getUrlParam('nickname'),//用户微信名
        })
    }
    render(){
        let {warnMessage,mobileValue,acode,captchaShow,header,name} = this.state
        return <div id='register'>
            <div className='content'>
                <div className='logoimg fleximg'><img src={logoimg} alt="logo" onClick={this.toIndex} /></div>
                
                    <div className='forget'>
                        <div className='forgettitle'>手机号绑定</div>
                        <div className='fleximgc wx-info'>
                            <div className='headerimg fleximg'><img src={header} alt="header" /></div>
                            <div>{name}</div>
                        </div>
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
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='invite_code' name='inviteCode' defaultValue={this.state.inviteCode}/>
                                </div>
                                {
                                    warnMessage && <div className='warnnext flexll'>
                                    <div><img src={warnimg} alt="warn" /></div>
                                    <span>{warnMessage}</span>
                                </div> 
                                }
                                
                                <Button className='forgetnextbt' htmlType="submit">绑定手机</Button>
                                <div className='flexl agree' onClick={()=>{this.setState({agree:!this.state.agree})}}>
                                    {this.state.agree?
                                        (<div><img src={selectimg} alt="checked" /></div> ):
                                        (<div><img src={unselectimg} alt="unchecked" /></div> )
                                    }
                                    <span>我已阅读并同意</span>
                                    <span className='Link'>《药智网用户须知》</span>
                                    {/* <Link>《药智网用户须知》</Link>                                    */}
                                </div>
                            </Form>
                        </div>
                    </div>
               
            </div>
        </div>
    }
    
}