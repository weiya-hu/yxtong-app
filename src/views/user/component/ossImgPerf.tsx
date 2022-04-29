
import { Upload } from 'antd';
import React from 'react';
import { uploadPolicy } from 'service/user'
import axios from "axios";
import $message from 'views/component/message';
import store from 'store/index'
import { setFileList } from 'store/actionCreators'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface IProps {
	change: (val:any)=>void
	maxSize: number
	isupload: boolean
	success: (val1:any,val2:any)=>void
	error: ()=>void
}

export default class OSSUpload extends React.Component<IProps,any> {
	state = {
		// fileList: []
	}
	render() {
		let header = { "Content-Type": "multipart/form-data" }
		return <Upload
			name="file"
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
			// let flist =this.state.fileList
			let flist = store.getState().fileList
			flist.length && this.uploadFile() 
			!flist.length && this.props.success(null,null)
		}
	}
	//采用手动上传的方式,不立即上传
	beforeUpload = async(file, fileList) => {
		let maxSize = this.props.maxSize
		if((fileList[0].size/ 1024 / 1024) >maxSize ){
			$message.info('上传图片大小不能大于'+maxSize+'M')
		}else{
			// this.setState({
			// 	fileList: fileList
			// })
			store.dispatch(setFileList(fileList))
			let imgurl = await getBase64(fileList[0]);
			this.props.change(imgurl)
		}
		return false;
	}

	//上传图片
	uploadFile = () => {
		// let fileList = this.state.fileList
		let fileList = store.getState().fileList
		uploadPolicy({site:'news'}).then(async({status, body }) => {
			if( !status){
				this.props.error()
			}else{
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
				const res = await axios({
					url: body.host,
					method: 'post',
					data: formData
				})
				if(res.status !== 200){
					this.props.error()
				}else{
					this.props.success(body.host+'/'+ param.key,null)
				}
			}
		});
	}
}