import { Component} from 'react'
import './certificate.scss'
import { Form } from 'antd'
import CertificateInput from './component/certificateInput/certificateInput'

export default class Certificate extends Component{

    render(){
        return <div id='certificate'>
            <div className='flexll'>
                <span className='cert-title-txt'>认证主体</span>
                <span className='cert-tips flexll'>
                    <span>*</span>
                    为必填项
                </span>
            </div>
            <Form>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='请选择行业'
                        placeholder='jkfjkl'
                        formName='cascader'
                        name='cascader'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='统一社会信用代码'
                        name='text'
                        placeholder='jkfjkl'
                        formName='kjh'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='证件有效期'
                        placeholder='jkfjkl'
                        formName='kjjh'
                        name='text'
                    ></CertificateInput>
                </div>
                
            </Form>
        </div>
    }
}