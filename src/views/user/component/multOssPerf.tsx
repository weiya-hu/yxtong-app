//@ts-nocheck
import { Upload,Spin,message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import  React  from 'react';
import {uploadPolicy} from 'service/user'
import axios from "axios";
import $message from 'views/component/message';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {resolve(reader.result)};
      reader.onerror = error => {reject(error)};
    });
  }
export default class OSSUpload extends React.Component{
    state={
        fileList:[],
        disabled:false,
        imageLoading:false,
        
    }
    render(){
        let header={"Content-Type": "multipart/form-data"},{disabled,imageLoading}=this.state
        return (
            <Spin indicator={antIcon} spinning={imageLoading}>
            <div className='upload'>
                <Upload 
                    name="file" 
                    accept='.jpeg,.png,.jpg'
                    disabled={disabled}
                    multiple={true}
                    maxCount={2}
                    showUploadList={false}
                    headers={header}
                    beforeUpload={this.beforeUpload}
                    >
                        <div>上传</div>                       
                </Upload>
                {/* <div onClick={this.uploadFile}>确定</div> */}
            </div>
        </Spin>
        )        
    }
    componentWillReceiveProps(props) {
        let flist =this.state.fileList,base64list=[]
        if(props.delete){
            let item = flist.map(m=>m.uid === props.delete)
            item && flist.splice(flist.indexOf(item),1)
            flist.forEach(async(item)=>{
                const res= await getBase64(item)
                base64list.push({url:res,uid:item.uid})
                this.props.change(base64list)
            })
            !flist.length && this.props.change(base64list)
            this.setState({
                fileList: flist,
                disabled:flist.length>=2?true:false
            })  
        }
        if(props.isupload){
            flist.length ? this.uploadFile() : this.props.success([])
        }

    }
    //采用手动上传的方式,不立即上传
    beforeUpload = (file,fileList) => {
        let flag ,maxSize = this.props.maxSize
        fileList.forEach(element => {
            if((element.size/ 1024 / 1024) >maxSize ){
                flag =false
                // message.warning('上传图片大小不能大于'+this.props.maxSize+'M')
                $message.info('上传图片大小不能大于'+maxSize+'M')
                return false;
            }else{
                flag =true
            }
        });
        if(flag){
            this.setState({imageLoading:true})
            let flist=this.state.fileList,base64list=[]
            fileList.length === 1 && flist.push(file)
            if(fileList.length > 1) {for(let i=0,l=2-flist.length;i<l;i++){flist.push(fileList[i])}}  
            flist.forEach(async(item)=>{
                const res= await getBase64(item)
                base64list.push({url:res,uid:item.uid})
                this.props.change(base64list)
                this.setState({imageLoading:false})
            })
            this.setState({
                fileList: flist,
                disabled:flist.length>=2?true:false
            })      
            return false;
        }
        
    }
    //上传图片
    uploadFile = () => {    
        let fileList =this.state.fileList,imgurl=[]
        fileList.forEach((item)=>{
            uploadPolicy({site:'user_company'}).then(({body}) => {
                // const photo =fileList[0];  // 获取图片对象
                const photo =item;
                const suffix = photo.name.slice(photo.name.lastIndexOf('.'));
                let param = {
                    key:body.dir+'/'+body.uuid+suffix,
                    OSSAccessKeyId:body.accessid,
                    success_action_status:'200',
                    policy:body.policy,
                    signature:body.signature,
                    'Content-Disposition': 'attachment; filename=' + encodeURIComponent(photo.name), //改变下载文件名
                    file:photo,  //一定在最后面
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
                    if(res.status == 200){
                        imgurl.push(body.host+'/'+ param.key)
                        imgurl.length === fileList.length && this.props.success(imgurl)
                    }
                }).catch(res=>{
                    this.props.error(true)
                })
            });
        })
        
    }
}