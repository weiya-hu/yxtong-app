//@ts-nocheck
import { Component} from 'react'
import './certificateInput.scss'
import {withRouter} from 'react-router-dom'
import {Form,Cascader,Input,DatePicker} from 'antd'
import locale from 'antd/lib/locale/zh_CN';
import { util } from 'utils/user'
import moment from 'moment';

import warnimg from 'public/images/warn.png'

interface CertificateInputProps{
    label:string
    formName:string
    name:string
    placeholder:string
    require:boolean
    extraData?:any
}
  
class CertificateInput extends Component<CertificateInputProps,any>{
    state={
        message:''
    }
    inputBlur=(e,name)=>{
        let message,value=e.target.value
        switch(name){
            case 'text':
                message = (value==='')?'必填项':''
        }
        this.setState({message:message})
    }
    CascaderChange(value) {
        console.log(value);
      }
    phoneValidate = (rule, value, callback) => {
        let message = util.validate_mobile(value)
        this.setState({message:util.validate_mobile(value)})
        if(message){
            return Promise.reject(util.validate_mobile(value));
        }else{
            return Promise.resolve();
        }
    };
    //通用必填项验证函数，因为改写了样式，有函数才会在验证时自己可以设置message的值
    requirValidate = (rule, value, callback) => {
        this.setState({message:value?'':'必填项'})
        if(!value){
            return Promise.reject('必填项');
        }else{
            return Promise.resolve();
        }
    };
    getInput=()=>{
        const {formName,name,placeholder,require,extraData}=this.props
       
        let component
        switch(name){
            case 'text':
                component = (
                    <Form.Item name={formName}
                        rules={require?[{validator:this.requirValidate}]:null} 
                    >
                        <Input 
                            type="text" 
                            placeholder={placeholder}    
                            onBlur={(e)=>{this.inputBlur(e,name)}}
                            autoComplete="off" 
                        />
                    </Form.Item>)
                break;
            case 'cascader':
                component=(
                    <Form.Item name={formName}
                        rules={[{validator:this.requirValidate}]}
                    >
                        <Cascader
                            fieldNames={{ label: 'name', value: 'industryId', children: 'children' }}
                            options={extraData}
                            onChange={this.CascaderChange}
                            placeholder={placeholder}
                            
                        />
                    </Form.Item>)
                break;
            case 'date':
                component = (
                    <Form.Item name={formName}
                        rules={[{validator:this.requirValidate}]}
                    >
                        <DatePicker  
                            locale={locale}
                            placeholder={placeholder}
                            onChange={(val)=>{console.log(moment(val.releasedTimestamp).unix())}}
                        />
                    </Form.Item>)
                break;
            case 'phone':
                component = (
                    <Form.Item name={formName}
                        validateTrigger='onBlur'
                        rules={[{validator:this.phoneValidate}]}
                    >
                        <Input  
                            type="tel"
                            placeholder={placeholder}
                            autoComplete="off" 
                        />
                    </Form.Item>)
                break;
            case 'textarea':
                component = (
                    <Form.Item name={formName}
                        validateTrigger='onBlur'
                    >
                        <Input.TextArea
                            placeholder={placeholder}
                            autoSize={false}
                            autoComplete="off" 
                        />
                    </Form.Item>)
                break;
        }
        return component
    }
    render(){
        const {label,formName,name,placeholder,require}=this.props
        const {message} = this.state
        return <div id='CertificateInput' className=' flexl'>
            <div className='certinput-left flexl'>
                <div className='certinput-star'>{require?'*':''}</div>
                <div className='certinput-label'>{label}：</div>
            </div>
            <div className='certinput-right flexl'>
                {this.getInput()}
            </div>
            {(message && require) && <div className='flexl certinput-message'>
                    <div className='fleximg warnimg'><img src={warnimg} alt="警告" /></div>
                    <div className='certinput-message-txt'>{message}</div>
                </div>
            }
        </div>
    }
}

export default withRouter(CertificateInput)