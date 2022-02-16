//@ts-nocheck
import { Upload} from 'antd';
import  React  from 'react';
import {uploadolicy} from 'service/user'
import moment from 'moment'
// import {post} from 'utils/ossRequest'
import {post} from 'utils/request'
import axios from "axios";
export default class OSSUpload extends React.Component{
    render(){
        return <Upload 
        name="file" 
        onChange={this.uploadFile}
        showUploadList={false}
        // data={uploadParmas}
        beforeUpload={this.beforeUpload}
        >
            <div>上传</div>
    </Upload>
    }



//采用手动上传的方式
beforeUpload = (file) => {
    let files = [];
    this.setState({
        fileList: [...files]
    })
     return false;
}

//主要核心代码
uploadFile = (info) => {    
    uploadolicy().then((res) => {
            let ossConfig = {
                policy:res.body.policy,
                OSSAccessKeyId:res.body.accessid,
                signature:res.body.signature,
                url:res.body.host,
                dir:res.body.dir,
            };
            const photo = info.fileList[0].originFileObj;  // 获取图片对象
            const photoName = moment().format('YYYYMMDDHHmmss') + (Math.floor(Math.random() * 3665668)) + '.' + photo.name.split(".")[1];  // 原图片的名称
            const key = ossConfig.dir  + photoName;  // 存储到oss的图片名称 自己定，必须确保唯一性，不然会覆盖oss中原有的文件   拼接:dir/账号/房间号/文件名(记住一定要加上dir拼接!!!!!!!!!)---不要问为什么 不加你会很惨
            const policy = ossConfig.policy; // 服务器端同事调oss的API，通过接口返回给前端的 policy
            const OSSAccessKeyId = ossConfig.OSSAccessKeyId;  // 服务器端同事调oss的API，通过接口返回给前端的 OSSAccessKeyId
            // const callback = ossConfig.callback;  // 服务器端同事调oss的API，通过接口返回给前端的 callback。这个是需要 oss 触发这个回调来通知服务器操作结果。
            const signature = ossConfig.signature;  // 服务器端同事调oss的API，通过接口返回给前端的 signature。这个就是签名，最关键的。
            const url = ossConfig.url;
            const dir = ossConfig.dir;
            // biu一下，提交给oss
            let param = {
                name:photoName,
                key:key,
               
                OSSAccessKeyId:OSSAccessKeyId,
                success_action_status:'200',  //必须这么写 不要问为什么
                // callback:callback,
                policy:policy,
                signature:signature,
                file:photo   //一定在最后面
            };  //顺序最好按照我写的  不要动位置 要不然不保证你能活着走下去..哈哈
            let formData = new FormData();  //以表单的形式传递给oss
            // const formData = new window.FormData();
            Object.keys(param).forEach((key) => {
              formData.append(key, param[key]);
            });
            // for (let i in param){
            //     formData.append(i, param[i]);
            //     console.log(formData,i, param[i])
            // }
            console.log(formData.getAll('signature'))
            localStorage.setItem('type','oss')
            //请求oss上传
            // axios.post(url, formData,{headers:{"Content-Type": "multipart/form-data"}}).then(
            //     (response) => {
            //       //关闭进度条
            //       console.log(response)
            //     },
            //     (err) => {
            //         console.log(err)
            //     }
            //   );
            post('user/my-center/integral-record',{"current": 1, "size": 10}).then(res=>{
                console.log(res)
            })
            // axios.post(url, formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(
            //     (response) => {
            //       //关闭进度条
            //       console.log(response);
            //     },
            //     (err) => {
            //     //  message.info(err.data.message)
            //     console.log(err);
            //     }
            //   );
            // axios.post(url,formData,{
            //     header:{
            //         "Content-Type": "multipart/form-data"
            //     },
            // })
            // axios({
            //     url: url,
                
            //     header:{
            //         "Content-Type": "multipart/form-data"
            //     },
            //     method: 'post',
            //     data: formData
            //   }).then((res) => {
            //     console.log(res)
            // })
            // post(url,formData).then((res) => {
            //     console.log(res)
            // })
        });
    }
}