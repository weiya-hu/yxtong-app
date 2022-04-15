//@ts-nocheck
import { Component } from 'react'
import 'views/user/component/certificateInput/certificateInput.scss'
import { withRouter } from 'react-router-dom'
import { Form, Cascader, Input, DatePicker } from 'antd'
import { util } from 'utils/user'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

import warnimg from 'public/images/warn.png'
import { connected } from 'process'

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
}

export default class DateInput extends Component<CertificateInputProps, any>{
  dateRef = null
  state = {
    message: '',
    dateForever: 4102415999000
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
  forEverClick = () => {
    this.setState({
      dateForever: 4102415999000
    })
    this.dateRef.blur()
    this.props.dateValue(4102415999000)
    // this.setForever()
  }
  setForever = () => {
    setTimeout(() => {
      let dom = document.getElementById('left_time')
      dom.value = '永久'
    }, 0);
  }
  dateExtraFoot = () => {
    return <div onClick={this.forEverClick} className='dateForever'>永久</div>
  }
  dateFormat = (value) => {
    console.log(moment(moment(value.releasedTimestamp).unix() * 1000), 5568)
    const { dateForever } = this.state
    console.log(dateForever, 123)
    return dateForever ? '永久' : moment(value)
  }
  getInput = () => {
    const { formName, name, placeholder, require, disabled, initialValue, afterValue } = this.props
    const { dateForever } = this.state
    // console.log(initialValue)
    // console.log(moment(initialValue))
    let component = (
      <Form.Item name={formName}
        initialValue={initialValue ? moment(initialValue) : null}
        rules={[{ validator: this.requirValidate }]}
      >
        <DatePicker
          // renderExtraFooter={this.dateExtraFoot}
          locale={locale}
          placeholder={placeholder}
          onChange={(val)=>{console.log(moment(val.releasedTimestamp).unix(),val,1111111,moment(val).unix())}}
          disabled={disabled}
          ref={el => this.dateRef = el}
          showToday={false}
        // value={moment(afterValue)}
        // format={this.dateFormat}
        />
      </Form.Item>)
    return component
  }
  componentDidMount(): void {
    // this.dateRef.value = moment(4102415999000)
  }
  render() {
    const { label, require } = this.props
    const { message } = this.state
    return <div id='CertificateInput' className=' flexl'>
      <div className='certinput-left flexl'>
        <div className='certinput-star'>{require ? '*' : ''}</div>
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

// export default withRouter(DateInput)