//@ts-nocheck
import { Component} from 'react'
import './certificateInput.scss'
import {withRouter} from 'react-router-dom'
import {Form,Cascader,Input} from 'antd'

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
    getInput=()=>{
        const {formName,name,placeholder,require}=this.props
       
        let component
        switch(name){
            case 'text':
                component = (
                    <Form.Item name={formName}
                    rules={[
                        {
                          required: true,
                          message: '必填项',
                        },
                      ]}
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
                    rules={[
                        {
                          required: true,
                          message: 'yutyututyuty',
                        },
                      ]}
                    >
                        <Cascader
                            fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                            options={options}
                            onChange={this.CascaderChange}
                            placeholder={placeholder}
                            
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