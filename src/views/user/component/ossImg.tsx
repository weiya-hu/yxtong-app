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
    OSSData: {}
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await uploadPolicy({site:'news'});
      this.setState({
        OSSData:OSSData.body,
      });
    } catch (error) {
      message.error(error);
    }
  };
  onChange = async({file, fileList ,event}) => {
    const { onChange } = this.props;
    const {OSSData} = this.state

    // if (onChange) {
    //   onChange([...fileList]);
    // }
    // let sendUrl= OSSData.host+'/'+ file.url
    let imgurl = await getBase64(file.originFileObj);
    this.props.change(imgurl,OSSData.host+'/'+ file.url)
  };

  onRemove = file => {
    const { value, onChange } = this.props;
    const files = value.filter(v => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };
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
   const { OSSData} = this.state;
    const expire = OSSData.expire * 1000;
    // if (expire < Date.now()) {
      await this.init();
    // }
 
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    // const filename = Date.now() +suffix;
    const filename = OSSData.uuid + suffix;
    file.url = OSSData.dir +'/'+ filename;
    return file;
    
  };
  render() {
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      accept:'.jpeg,.png',
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      data: this.getExtraData,
      UploadFile:this.uploadFile,
      beforeUpload: this.beforeUpload,
      onPreview:this.handlePreview,
    };
    return (
      <Form labelCol={{ span: 4 }}>
        <Form.Item name="license" >
          <Upload {...props}>
            <Button icon={<UploadOutlined/>}></Button>
          </Upload>
          </Form.Item>
      </Form>
    );
  }
}