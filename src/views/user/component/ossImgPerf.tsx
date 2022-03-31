//@ts-nocheck
import { Upload} from 'antd';
import  React  from 'react';
import {uploadPolicy} from 'service/user'
import axios from "axios";
export default class OSSUpload extends React.Component{
    state={
        fileList:[]
    }
    render(){
        let header={"Content-Type": "multipart/form-data"}
        return (
            <div>
                <Upload 
                    name="file" 
                    // onChange={this.uploadFile}
                    showUploadList={false}
                    headers={header}
                    beforeUpload={this.beforeUpload}
                    >
                        <div>上传</div>
                        
                </Upload>
                {/* <div onClick={this.uploadFile}>确定</div> */}
            </div>
            
        )        
    }
    //采用手动上传的方式,不立即上传
    beforeUpload = (file,fileList) => {
        console.log(fileList)
        this.setState({
            fileList: fileList
        })
        return false;
    }

    //上传图片
    uploadFile = () => {    
        let fileList =this.state.fileList
        console.log(fileList)
        uploadPolicy().then(({body}) => {
            const photo =fileList[0];  // 获取图片对象
            const suffix = photo.name.slice(photo.name.lastIndexOf('.'));
            let param = {
                key:body.dir+body.uuid+suffix,
                OSSAccessKeyId:body.accessid,
                success_action_status:'200',
                policy:body.policy,
                signature:body.signature,
                'x-oss-content-type':'multipart/form-data',
                'Content-Disposition': 'attachment; filename=' + encodeURIComponent(photo.name), //改变下载文件名
                file:photo   //一定在最后面
            }; 
            let formData = new FormData();  //以表单的形式传递给oss
            Object.keys(param).forEach((key) => {
              formData.append(key, param[key]);
            });
            // formData.forEach((item)=>{
            //     console.log(item)
            // })
            axios({
                url: body.host,
                method: 'post',
                data: formData
              }).then((res) => {
                console.log(res)
            })
        });
    }
}