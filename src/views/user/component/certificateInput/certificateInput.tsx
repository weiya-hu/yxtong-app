//@ts-nocheck
import { Component} from 'react'
import './certificateInput.scss'
import {withRouter} from 'react-router-dom'
import {Form,Cascader} from 'antd'

import warnimg from 'public/images/warn.png'

interface CertificateInputProps{
    label:string
    formName:string
    name:string
    placeholder:string
    require:boolean
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
    getInput=()=>{
        const {formName,name,placeholder,require}=this.props
        
        console.log(formName,name,placeholder,require)
        let component
        switch(name){
            case 'text':
                component = (
                    <Form.Item name={formName}>
                        <input 
                            type="text" 
                            placeholder={placeholder}    
                            onBlur={(e)=>{this.inputBlur(e,name)}}
                          
                        />
                    </Form.Item>)
                break;
            case 'cascader':
                component=(
                    <Form.Item name={formName}>
                        <input 
                            type="text" 
                            placeholder={placeholder}    
                            onBlur={(e)=>{this.inputBlur(e,name)}}
                          
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
            {message && <div className='flexl certinput-message'>
                    <div className='fleximg warnimg'><img src={warnimg} alt="警告" /></div>
                    <div className='certinput-message-txt'>{message}</div>
                </div>
            }
        </div>
    }
}

export default withRouter(CertificateInput)