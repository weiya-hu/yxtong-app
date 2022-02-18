import { Component} from 'react'
import './certificate.scss'
import { Form,Button } from 'antd'
import CertificateInput from './component/certificateInput/certificateInput'

import problemimg from 'public/images/problem.png'
import addImageimg from 'public/images/user/addImage.png'

export default class Certificate extends Component{
    onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
      falseFinish = ({ values, errorFields, outOfDate }) => {
        console.log( values);
        console.log( errorFields);

        console.log( outOfDate);

      };
    render(){
        return <div id='certificate'>
            <div className='flexll'>
                <span className='cert-title-txt'>认证主体</span>
                <span className='cert-tips flexll'>
                    <span>*</span>
                    为必填项
                </span>
            </div>
            <Form onFinish={this.onFinish} onFinishFailed={this.falseFinish}>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='行业分类'
                        placeholder='请选择行业'
                        formName='cascader'
                        name='cascader'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='企业名称'
                        name='text'
                        placeholder='请填写企业名称'
                        formName='companyName'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='统一社会信用代码'
                        placeholder='请填写统一社会信用代码'
                        formName='UNinCode'
                        name='text'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item flexl'>
                    <div className='certinput-left flexl'>
                        <div className='certinput-star'>*</div>
                        <div className='certinput-label flexl'>资质照片：
                            <div className='fleximg problemimg'><img src={problemimg} alt="problem" /></div>
                        </div>
                    </div>
                    <div className='cert-right'>
                        <div className='cert-image flexl'>
                            <div className='cert-images flexl'>

                            </div>
                            <div className='cert-image-add flexcc'>
                                <div className='addImageimg fleximg'>
                                    <img src={addImageimg} alt="addImage" />
                                </div>
                                <div className='cert-image-add-txt'>上传图片</div>
                            </div>
                        </div>
                        <div className='cert-image-tips'>请上传资质编号清晰可见的相关资质照片。仅支持jpg、png、jpeg格式图片，且单张大小不能大于5M</div>
                    </div>
                </div>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    }
}