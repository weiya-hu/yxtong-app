//@ts-nocheck
import React,{ Component } from 'react'
import 'views/user/component/certificateInput/certificateInput.scss'
import { Form, DatePicker,Checkbox  } from 'antd'
import { util } from 'utils/user'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

import warnimg from 'public/images/warn.png'

interface CertificateInputProps {
  label: string
  formName: string
  name: string
  placeholder: string
  require: boolean
  disabled: boolean
  initialValue: null | string | string[] | number
  extraData?: any
  dateValue?: (val: number) => void
  status?:number
}

export default class DateInput extends Component<CertificateInputProps, any>{
  dateRef = React.createRef();
  state = {
    message: '',
    checkValue:this.props.initialValue == this.props.ForeverTime ?this.props.ForeverTime:null
  }
  inputBlur = (e, name) => {
    let message, value = e.target.value
    switch (name) {
      case 'text':
        message = (value === '') ? '必填项' : ''; break;
    }
    this.setState({ message: message })
  }
  //通用必填项验证函数，因为改写了样式，有函数才会在验证时自己可以设置message的值
  requirValidate = (rule, value, callback) => {
    this.setState({ message: value ? '' : '必填项' })
    if (!value) {
      return Promise.reject('必填项');
    } else {
      return Promise.resolve();
    }
  };
  onChange=(val)=>{
    this.setState({checkValue:val[0] || null})
  }
  componentDidMount(): void {
    this.setState({})
  }
  foreverShow=( status, initialValue, ForeverTime )=>{
    let flag
    if(status == 2 || status == 3 || status == 4){
      (initialValue == ForeverTime) && (flag = true);
      (initialValue != ForeverTime) && (flag = false);
    }else{
      flag = true
    }
    return flag
  }
  getInput = () => {
    const { formName, placeholder, disabled, initialValue,ForeverTime } = this.props;
    const {checkValue} = this.state;
    let component = (
      <Form.Item name={formName}
        initialValue={(initialValue == ForeverTime || checkValue || !initialValue )? null : moment(initialValue)}
        rules={[{ validator: this.requirValidate }]}
      >
        <DatePicker
          locale={locale}
          placeholder={placeholder}
          disabled={disabled }
          ref={el => this.dateRef = el}
          showToday={false}
        />
      </Form.Item>)
    return component
  }
 
  render() {
    const { label, require ,initialValue,ForeverTime,disabled, status} = this.props
    const { message,checkValue } = this.state
    return <div id='CertificateInput' className=' dataInput flexl'>
      <div className='certinput-left flexl'>
        <div className='certinput-star'>{require ? '*' : ''}</div>
        <div className='certinput-label'>{label}：</div>
      </div>
      <div className='certinput-right flexl'>
        {this.foreverShow(status, initialValue, ForeverTime) && 
          <Form.Item name='left_time_front'
          initialValue={initialValue === ForeverTime ? [ForeverTime] : null}
          >
            <Checkbox.Group onChange={this.onChange}  disabled={disabled }>
              <Checkbox value={ForeverTime}>永久</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        }
        { !checkValue && this.getInput()}
      </div>
      {(message && require) && <div className='flexl certinput-message'>
        <div className='fleximg warnimg'><img src={warnimg} alt="警告" /></div>
        <div className='certinput-message-txt'>{message}</div>
      </div>
      }
    </div>
  }
}