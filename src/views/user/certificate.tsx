import { Component} from 'react'
import './certificate.scss'
import { Form,Button,Modal } from 'antd'
import CertificateInput from './component/certificateInput/certificateInput'

import problemimg from 'public/images/problem.png'
import addImageimg from 'public/images/user/addImage.png'

export default class Certificate extends Component{
    state={
        modalVisible:false
    }
    toggleVisible=()=>{
        this.setState({modalVisible:!this.state.modalVisible})
    }
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
                        formName='industry_id'
                        name='cascader'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='企业名称'
                        name='text'
                        placeholder='请填写企业名称'
                        formName='name'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='统一社会信用代码'
                        placeholder='请填写统一社会信用代码'
                        formName='code'
                        name='text'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item flexll'>
                    <div className='certinput-left flexl'>
                        <div className='certinput-star'>*</div>
                        <div className='certinput-label flexl'>资质照片：
                            <div className='fleximg problemimg' onClick={this.toggleVisible}>
                                <img src={problemimg} alt="problem" />
                            </div>
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
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='证件有效期'
                        placeholder='请选择日期'
                        formName='left_time'
                        name='date'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='联系人'
                        name='text'
                        placeholder='请填写联系人姓名'
                        formName='legal_person'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={true}
                        label='联系电话'
                        name='phone'
                        placeholder='请填写联系电话'
                        formName='contact'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={false}
                        label='官方网站'
                        placeholder='请填写官方网站'
                        formName='url'
                        name='text'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={false}
                        label='详细地址'
                        placeholder='请填写详细地址'
                        formName='address'
                        name='text'
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                        require={false}
                        label='经营范围'
                        placeholder='请填写经营范围'
                        formName='business_scope'
                        name='textarea'
                    ></CertificateInput>
                </div>
                <div className='cert-buttons'>
                    <Button htmlType="submit">提交</Button>
                    <Button >保存</Button>
                </div>
                
            </Form>
            {/* 资质照片问号浮框 */}
            <Modal
                title="Modal"
                visible={this.state.modalVisible}
                onCancel={this.toggleVisible}
            >   
                <div>资质照片</div>
                <div>营业执照上加盖的公章需清晰可见；营业执照请勿带有不想关的水印</div>
            </Modal>
        </div>
    }
}