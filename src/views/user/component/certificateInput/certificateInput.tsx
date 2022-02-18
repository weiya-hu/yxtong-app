//@ts-nocheck
import { Component} from 'react'
import './certificateInput.scss'
import {withRouter} from 'react-router-dom'
import {Form,Cascader,Input,DatePicker} from 'antd'
import { util } from 'utils/user'

import warnimg from 'public/images/warn.png'

interface CertificateInputProps{
    label:string
    formName:string
    name:string
    placeholder:string
    require:boolean
}
const options = [
    {
      code: 'a',
      name: 'Zhejiang',
      items: [
        {
          code: 'a1',
          name: 'Hangzhou',
          items: [
            {
              code: 'a2',
              name: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      code: 'b',
      name: 'Jiangsu',
      items: [
        {
          code: 'b1',
          name: 'Nanjing',
          items: [
            {
              code: 'b2',
              name: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  
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
    getInput=()=>{
        const {formName,name,placeholder,require}=this.props
       
        let component
        switch(name){
            case 'text':
                component = (
                    <Form.Item name={formName}
                        rules={[{required: true,message: '必填项',}]}
                    >
                        <Input 
                            type="text" 
                            placeholder={placeholder}    
                            onBlur={(e)=>{this.inputBlur(e,name)}}
                           
                        />
                    </Form.Item>)
                break;
            case 'cascader':
                component=(
                    <Form.Item name={formName}
                        rules={[{required: true,message: '必填项',}]}
                    >
                        <Cascader
                            fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                            options={options}
                            onChange={this.CascaderChange}
                            placeholder={placeholder}
                            
                        />
                    </Form.Item>)
                break;
            case 'date':
                component = (
                    <Form.Item name={formName}
                        rules={[{required: true,message: '必填项',}]}
                    >
                        <DatePicker  
                            placeholder={placeholder}
                        />
                    </Form.Item>)
                break;
            case 'phone':
                component = (
                    <Form.Item name={formName}
                        validateTrigger='onBlur'
                        rules={[{required: true,message: '必填项'},{validator:this.phoneValidate}]}
                    >
                        <Input  
                            type="tel"
                            placeholder={placeholder}
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