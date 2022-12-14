//@ts-nocheck
import { Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react'
import {uploadPolicy} from '../../../service/user'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
    uuid:[]
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await uploadPolicy();
      const OSSData1 = await uploadPolicy();
      this.setState({
        OSSData:OSSData1.body,
        uuid:[OSSData.body.uuid,OSSData1.body.uuid]
      });
    } catch (error) {
      message.error(error);
    }
  };

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  mockGetOSSData = () => ({
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
  });

  onChange = async({file, fileList ,event}) => {

    const { onChange } = this.props;
    const {OSSData} = this.state

    // this.props.change(OSSData.host+'/'+ fileList[0].url)
    if (onChange) {
      onChange([...fileList]);
    }
      let sendUrl= OSSData.host+'/'+ file.url
      let imgurl = await getBase64(file.originFileObj);
      this.props.change(imgurl,OSSData.host+'/'+ file.url)
      // this.props.sendUrlchange(OSSData.host+'/'+ file.url)

  };

  onRemove = file => {
    const { value, onChange } = this.props;
    const files = value.filter(v => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };
  uploadFile=(a,b,s)=>{
  }
  getExtraData = file => {
    const { OSSData } = this.state;
    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessid,
      success_action_status : '200',
      policy: OSSData.policy,
      signature: OSSData.signature,
    };
  };


  beforeUpload = async (file,fileList) => {
   const { OSSData,uuid } = this.state;
   const {imgLength} = this.props
   let uuuid
    const expire = OSSData.expire * 1000;
    // if (expire < Date.now()) {
      await this.init();
    // }
   
    if(imgLength === 1 && fileList.length === 1){
        uuuid=uuid[1]
    }else{
        uuuid=file.uid === fileList[0].uid?uuid[0]:uuid[1]
    }
    
    
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    // const filename = Date.now() +suffix;
    const filename = uuuid + suffix;
    file.url = OSSData.dir + filename;

   
    return file;
    
  };
  upload=()=>{
  }
  render() {
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      accept:'.jpeg,.png,.jpg',
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      data: this.getExtraData,
      UploadFile:this.uploadFile,
      beforeUpload: this.beforeUpload,
      onPreview:this.handlePreview,
      multiple:true,
      maxCount:2
      // customRequest:this.upload
    };
    return (
      <Form labelCol={{ span: 4 }}>
        <Form.Item name="license">
          <Upload {...props} maxCount={2}>
            <Button icon={<UploadOutlined/>}></Button>
          </Upload>
          </Form.Item>
      </Form>
    );
  }
}
const FormPage = () => (
  <Form labelCol={{ span: 4 }}>
    <Form.Item label="Photos" name="photos">
      <AliyunOSSUpload />
    </Form.Item>
  </Form>
);
// ReactDOM.render(<FormPage />, mountNode);