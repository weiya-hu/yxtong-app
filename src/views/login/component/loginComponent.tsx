import React,{ Component } from 'react'
import './loginComponent.scss'
import { Select ,Form , Button} from 'antd';
import InputComponent from './inputComponent';
import { util } from '../../../utils/user'
import { Link } from 'react-router-dom';

import weiboimg from '../../../public/images/weibo.png'
import qqimg from '../../../public/images/QQ.png'
import wechartimg from '../../../public/images/wechart.png'
import warnimg from '../../../public/images/warn.png'

const { Option } = Select;
export default class LoginComponent extends Component {
    state={
       loginSwitch:0,
       warnMessage:''
    }
    formRef = React.createRef()
    
    submit=(value)=>{
        console.log(value)
        let swtch = Object.keys(value)[1],message
        if(swtch === 'countryCode'){    
            let mobile = util.validate_mobile(value.mobile)     
            message = mobile?mobile:util.validate_yzm(value.mobileYZM)    
            value.countryCode = value.countryCode?value.countryCode:'86'
        }else{
            let username = util.validate_mobile(value.userName)
            message = username?username:util.validate_password(value.password) 
        }
        this.setState({warnMessage:message})
        if(!message){
            console.log('ok')
            console.log(value)
            //接口，登录
        }
    }

    componentDidMount(){
        //接口，国家区号
    }
    render(){
        let loginSwitch = this.state.loginSwitch,warnMessage=this.state.warnMessage
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
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobile' name='mobile'/>
                                </div>
                                <div className='marg'>
                                    <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='mobileYZM' name='mobileYZM'/>
                                </div>                                                               
                            </div>
                    ):(
                        <div>   
                            <div className='marg'>
                                <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='userName' name='userName'/>
                            </div>
                            <div className='marg'>
                                <InputComponent GETFalseMessage={(val)=>{this.setState({warnMessage:val})}} formName='password' name='password'/>
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