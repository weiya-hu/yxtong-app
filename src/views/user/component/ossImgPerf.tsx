//@ts-nocheck
import { Upload } from 'antd';
import React from 'react';
import { uploadPolicy } from 'service/user'
import axios from "axios";
import $message from 'views/component/message';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class OSSUpload extends React.Component {
	state = {
		fileList: []
	}
	render() {
		let header = { "Content-Type": "multipart/form-data" }
		return <Upload
			name="file"
			// onChange={this.uploadFile}
			showUploadList={false}
			headers={header}
			beforeUpload={this.beforeUpload}
		>
			<div className='OSSUpload-div'></div>
		</Upload>
		{/* <div onClick={this.uploadFile}>确定</div> */}
	}
	componentWillReceiveProps(props) {
		if(props.isupload){
			let flist =this.state.fileList
			flist.length && this.uploadFile() 
		}
	}
	//采用手动上传的方式,不立即上传
	beforeUpload = async(file, fileList) => {
		let maxSize = this.props.maxSize
		if((fileList[0].size/ 1024 / 1024) >maxSize ){
			$message.info('上传图片大小不能大于'+maxSize+'M')
		}else{
			this.setState({
				fileList: fileList
			})
			let imgurl = await getBase64(fileList[0]);
			this.props.change(imgurl)
		}
		return false;
	}

	//上传图片
	uploadFile = () => {
		let fileList = this.state.fileList
		uploadPolicy({site:'news'}).then(({ body }) => {
			const photo = fileList[0];  // 获取图片对象
			const suffix = photo.name.slice(photo.name.lastIndexOf('.'));
			let param = {
				key: body.dir +'/'+ body.uuid + suffix,
				OSSAccessKeyId: body.accessid,
				success_action_status: '200',
				policy: body.policy,
				signature: body.signature,
				'Content-Disposition': 'attachment; filename=' + encodeURIComponent(photo.name), //改变下载文件名
				file: photo   //一定在最后面
			};
			let formData = new FormData();  //以表单的形式传递给oss
			Object.keys(param).forEach((key) => {
				formData.append(key, param[key]);
			});
			axios({
				url: body.host,
				method: 'post',
				data: formData
			}).then((res) => {
				res.status == 200 && this.props.success(body.host+'/'+ param.key,null)
			})
		});
	}
}