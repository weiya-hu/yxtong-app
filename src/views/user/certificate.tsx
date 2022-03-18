//@ts-nocheck
import { Component} from 'react'
import './certificate.scss'
import { Form,Button,Modal } from 'antd'
import moment from 'moment';
import $message from 'views/component/message/index'


import CertificateInput from './component/certificateInput/certificateInput'
import AliyunOSSUpload from './component/multOssImg'
import {getAuditRecord,getIndustry,saveCompany,submitCompany,getGeo} from 'service/user'

import problemimg from 'public/images/problem.png'
import addImageimg from 'public/images/user/addImage.png'
import warnimg from 'public/images/warn.png'
import auditingimg from 'public/images/user/auditing.png'
import auditedimg from 'public/images/user/audited.png'
import unauditimg from 'public/images/user/unaudit.png'

export default class Certificate extends Component{
    state={
        modalVisible:false,//照片问题modal是否显示
        AuditRecord:{},//认证记录
        IndustryType:[],//行业分类全类
        cityType:[],//省市区全类
        images:[],//上传的照片
        message:'',//上传照片表单出错message
        status:null,//企业认证的状态，0：未填写，1：保存，2：审核中，3：审核工作，4：审核不通过
        disabled:null,//表单是否为不能填写的状态
    }
    //资质问号modal是否显示切换
    toggleVisible=(val)=>{
        this.setState({modalVisible:val})
    }
    //根据状态值不同顶部显示不同
    topStatusDom=()=>{
        const {status}=this.state
        let component
        switch(status){
            case 0:component=null;break;
            case 1:component=null;break;
            case 2:component=<div className='topStatus-yellow flexl'>
                    <div className='auditingimg fleximg'><img src={auditingimg} alt="auditing" /></div>
                    <div className='topStatus-txt'>主体资质审核中...</div>
                </div>
                break;
            case 3:component=<div className='topStatus-green flexl'>
                    <div className='auditingimg fleximg'><img src={auditedimg} alt="auditing" /></div>
                    <div className='topStatus-txt'>主体资质审核已通过</div>
                </div>
                break;
            case 4:component=<div className='topStatus-red flexl'>
                    <div className='auditingimg fleximg'><img src={unauditimg} alt="auditing" /></div>
                    <div className='topStatus-txt'>主体资质审核未通过，请重新上传资料。</div>
                </div>
                break;
        }
        return component
    }
    //上传或者保存
    onFinish = async(values) => {
        console.log(values)
        const {images} = this.state
        let imgs=[]
        if(!images.length){
            this.setState({message:'必填项'})
            return
        }else{
            this.setState({message:''})
            images.forEach((item)=>{imgs.push(item.sendUrl);})
            let data={
                ...values,
                left_time:moment(values.left_time.releasedTimestamp).unix(),
                license:imgs.join(','),
                industry_id:values.industry_id.join(','),
                province:values.city[0],
                city:values.city[1],
                district:values.city[2],
            }
            let submitFlag = JSON.parse(localStorage.getItem('submit')) 
            const res = submitFlag ? await submitCompany(data): await saveCompany(data)
            if(res.status===1 && submitFlag){this.getRecord()}
            $message.info(res.message)
        }
    };
    //上传或者保存表单验证出错
    falseFinish = ({ values, errorFields, outOfDate }) => {
        const {images} = this.state
        !images.length ? this.setState({message:'必填项'}) : this.setState({message:''})
    };
    //获取企业认证状态和相关信息
    getRecord=async()=>{
        const {status, body} = await getAuditRecord()
        let imgs=[]
        console.log(body)
        if(status){
            let list = body.license?body.license.split(','):[]
            list.forEach(element => {
                let item={showUrl:element,sendUrl:element}
                imgs.push(item)
            });
            if(body.status){
                this.setState({
                    AuditRecord:body,
                    status:body.status,
                    disabled:body.status === 1?false:true,
                    // status:1,
                    // disabled:false,
                    images:imgs
                })
            }else{
                this.setState({
                    status:0,
                    disabled:false,
                }) 
            }
            
        }
    }
    //行业分类
    getIndustryType=async()=>{
        const {status, body} = await getIndustry()
        status && this.setState({IndustryType:body})
    }
    //省市区
    getCityType=async()=>{
        const {status, body} = await getGeo()
        status && this.setState({cityType:body})
    }
    //上传照片组件传过来值
    licenseIMgChange=(val,sendval)=>{
        const {images}=this.state
        let item ={showUrl:val,sendUrl:sendval}
        let url = images.find(m=>m.sendUrl === sendval)
        !url ? images.push(item) : images.splice(images.indexOf(url),1,item)       
        let imgs= images.slice(-2,images.length)
        //赋值图片路径，有图片上传还要给错误message赋值为空字符串
        this.setState({images:imgs,message:''})
    }
    //保存和上传按钮通过传值区分
    save=(val)=>{
        console.log('按了保存')
        localStorage.setItem('submit',val)
    }
    //修改状态值
    switchStatus=(val)=>{
        
        this.setState({
            status:val,
            disabled:false
        })
    }
    componentDidMount(){
        
        this.getIndustryType()
        this.getRecord()
        this.getCityType()
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    render(){
        const {modalVisible,IndustryType,images,message,status,disabled,AuditRecord,cityType} =this.state
        let flag = status !==null
        return flag &&
        <div id='certificate'>
            {this.topStatusDom()}
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
                        key={0}
                        require={true}
                        label='行业分类'
                        placeholder='请选择行业'
                        formName='industry_id'
                        name='cascader'
                        disabled={disabled}
                        initialValue={AuditRecord.industry_id?AuditRecord.industry_id.split(','):''}
                        extraData={IndustryType}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                    key={1}
                        require={true}
                        label='企业名称'
                        name='text'
                        placeholder='请填写企业名称'
                        formName='name'
                        disabled={disabled}
                        initialValue={AuditRecord.name}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                         key={3}
                        require={true}
                        label='统一社会信用代码'
                        placeholder='请填写统一社会信用代码'
                        formName='code'
                        name='text'
                        disabled={disabled}
                        initialValue={AuditRecord.code?AuditRecord.code:''}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item flexll'>
                    <div className='certinput-left position flexl'>
                        <div className='certinput-star'>*</div>
                        <div className='certinput-label flexl'>资质照片：
                            <div className='fleximg problemimg' onClick={()=>this.toggleVisible(true)}>
                                <img src={problemimg} alt="problem" />
                            </div>
                        </div>
                        {modalVisible && <div className='photo-modal flexcl'>
                            <div className='photo-modal-title'>资质照片</div>
                            <div className='photo-modal-detail'>营业执照上加盖的公章需清晰可见；营业执照请勿带有不相关的水印</div>
                        </div>}
                    </div>
                    <div className='cert-right'>
                        <div className='cert-image flexl'>
                            <div className='cert-images flexl'>
                                {/* <div>{images}</div> */}
                                {images.map((item,index)=>
                                    <div className='fleximg license-img' key={index}><img src={item.showUrl} alt="show" /></div>
                                )}
                            </div>
                            {!disabled &&
                                <div className={message?'cert-image-add flexcc cert-image-add-false':'cert-image-add flexcc'}>
                                    <div className='addImageimg fleximg'>
                                        <img src={addImageimg} alt="addImage" />
                                    </div>
                                    <div className='cert-image-add-txt'>上传图片</div>
                                    <AliyunOSSUpload imgLength={images.length} change={((val,sendval)=>{this.licenseIMgChange(val,sendval)})}/>
                                </div>
                            }
                            {message && <div className='flexl certinput-message'>
                                <div className='fleximg warnimg'><img src={warnimg} alt="警告" /></div>
                                <div className='certinput-message-txt'>{message}</div>
                            </div>}
                        </div>
                        {!disabled &&
                            <div className='cert-image-tips'>请上传资质编号清晰可见的相关资质照片。仅支持jpg、png、jpeg格式图片，最多上传两张。</div>
                        }
                    </div>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                         key={4}
                        require={true}
                        label='证件有效期'
                        placeholder='请选择日期'
                        formName='left_time'
                        name='date'
                        disabled={disabled}
                        initialValue={AuditRecord.left_time*1000}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                         key={5}
                        require={true}
                        label='联系人'
                        name='text'
                        placeholder='请填写联系人姓名'
                        formName='legal_person'
                        disabled={disabled}
                        initialValue={AuditRecord.legal_person}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                         key={6}
                        require={true}
                        label='联系电话'
                        name='phone'
                        placeholder='请填写联系电话'
                        formName='contact'
                        disabled={disabled}
                        initialValue={AuditRecord.contact}
                    ></CertificateInput>
                </div>
                
                <div className='cert-input-item'>
                    <CertificateInput
                        key={10}
                        require={true}
                        label='省份地区'
                        placeholder='请选择地区'
                        formName='city'
                        name='cascader_city'
                        disabled={disabled}
                        initialValue={AuditRecord.district?[AuditRecord.province,AuditRecord.city,AuditRecord.district]:''}
                        extraData={cityType}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                     key={8}
                        require={false}
                        label='详细地址'
                        placeholder='请填写详细地址'
                        formName='address'
                        name='text'
                        disabled={disabled}
                        initialValue={AuditRecord.address}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                         key={7}
                        require={false}
                        label='官方网站'
                        placeholder='请填写官方网站'
                        formName='url'
                        name='text'
                        disabled={disabled}
                        initialValue={AuditRecord.url}
                    ></CertificateInput>
                </div>
                <div className='cert-input-item'>
                    <CertificateInput
                     key={9}
                        require={false}
                        label='经营范围'
                        placeholder='请填写经营范围'
                        formName='business_scope'
                        name='textarea'
                        disabled={disabled}
                        initialValue={AuditRecord.business_scope}
                    ></CertificateInput>
                </div>
                
                {(status === 0 || status ===1)?<div className='cert-buttons flexl'>
                    <Button htmlType="submit" onClick={()=>this.save(true)}>提交</Button>
                    <div className='save-button'>
                        <Button htmlType="submit" onClick={()=>this.save(false)}>保存</Button>
                    </div>
                </div>:(status === 2 || status ===3)?<div></div>:<div className='cert-buttons flexl'>
                    <div className='button-unvisible'><Button htmlType="submit"></Button></div> 
                    <Button onClick={()=>this.switchStatus(1)}>修改</Button>
                </div>
                }
            </Form>
            {/* 资质照片问号浮框 */}
            <Modal
                title="Modal"
                visible={this.state.modalVisible}
                onCancel={()=>this.toggleVisible(false)}
                wrapClassName='cert-modal'
                maskStyle={{background: 'rgba(0, 0, 0,0.1)'}}
            >   
            </Modal>
        </div>

    }
}