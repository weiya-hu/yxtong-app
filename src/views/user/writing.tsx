//@ts-nocheck
import { Component } from 'react'
import './writing.scss'
import { Editor } from '@tinymce/tinymce-react'
import AliyunOSSUpload from './component/ossImg'
import { Form} from 'antd'
import message from 'views/component/message/index';
import {newsPublish} from 'service/user'
import OSSUpload from './component/ossTest'

import addimg from 'public/images/user/add.png'
import warnimg from 'public/images/warn.png'
import falseimg from 'public/images/user/false.png'

export default class Writing extends Component{
    state={
        titleMessage:'',//标题的错误message
        textMessage:'',//文章的错误message
        coverImgurl:this.props.item?this.props.item.thumb_url?this.props.item.thumb_url:falseimg:'',
        sendCoverImgurl:this.props.item?this.props.item.sendCoverImgurl:'',
        title:this.props.item?this.props.item.title:'',
        content:this.props.item?this.props.item.content:'',
        edit:this.props.item?this.props.item.content:''
    }
    //富文本编辑器文本有改变
    EditorChange=(val)=>{
       this.setState({
            edit:val,
            textMessage:val?'':'必填项'
       })
    
    }
    //标题输入有改变
    titleChange=(e)=>{
        this.setState({
            title:e.target.value,
            titleMessage:e.target.value?'':'必填项'
        })
    }
    imageEditor= (blobInfo, success, failure)=>{
        console.log(blobInfo.base64(),blobInfo.uri())
        console.log(blobInfo.blobUri())
        if (blobInfo.blob()){
            success('data:image/jpeg;base64,'+blobInfo.base64())
        }

   }
   //预览文章
   preView=()=>{
        const {title,edit,coverImgurl,sendCoverImgurl} = this.state
        if(!title){
            message.info('请输入标题')
            this.setState({titleMessage:'必填项'})
        }else if(!edit){
            message.info('请编辑文章')
            this.setState({textMessage:'必填项'})
        }
        else{
            let item={
                commented: 0,
                content: edit,
                readed: 0,
                thumb_url:coverImgurl,
                title:title,
                update_time: new Date(),
                sendCoverImgurl:sendCoverImgurl
            }
            this.props.preview(1,item)
        }
   }
   //发布文章
   publishNews=async()=>{
        const {title,edit,sendCoverImgurl,coverImgurl} = this.state
        console.log(sendCoverImgurl)
        if(!title){
            message.info('请输入标题')
            this.setState({titleMessage:'必填项'})
        }else if(!edit ){
            message.info('请编辑文章')
            this.setState({textMessage:'必填项'})
        }
        else{
            let item={
                content: edit,
                thumb_url:sendCoverImgurl?sendCoverImgurl:coverImgurl,
                title:title
            }
            const res = await newsPublish(item)
            if(res.status){
                this.props.publish(true)
                this.setState({
                    coverImgurl:'',
                    title:'',
                    content:'',
                    titleMessage:'',
                    textMessage:'',
                    edit:'',
                    sendCoverImgurl:''
                })
                message.info('发布成功')
            }
        }
   }
  
    componentDidMount(){
        // tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
        console.log(this.props.item,this.state.coverImgurl)

    }
    getObjectURL=(file)=> {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    coverIMgChange=(val,sendval)=>{
        console.log(val)
        console.log(sendval)
        // var objectURL = window.URL.createObjectURL(val)
        // console.log(objectURL)

        this.setState({
            coverImgurl:val,
            sendCoverImgurl:sendval
        })
        console.log(this.state.sendCoverImgurl)
    }
    render(){
        let {titleMessage,coverImgurl,textMessage,title,content}=this.state
        let str=content
        return(
            <div className='writing' id='writing'>
                <div className='top flexb'>
                    <div>
                        <span className='writing-txt'>发布文章</span>
                        <span  className='font12 color3'>草稿自动保存</span>
                    </div>
                    <div className='flexr'>
                        <div className='writing-buttton fleximg' onClick={this.publishNews}>发布文章</div>
                        <div className='preview-button fleximg' onClick={this.preView}>预览文章</div>
                    </div>
                </div>
                <div className='cover'>
                    <div className='cover-txt'>上传封面</div>
                    <div className='flexl'>
                        <div className='cover-button'>
                            <div className='addimg'><img src={addimg} alt="add" /></div>
                            <div>添加封面</div>
                            <div>
                                {/* <Form labelCol={{ span: 4 }}>
                                    <Form.Item name="photos"> */}
                                        <AliyunOSSUpload className='img-upload' change={((val,sendval)=>{this.coverIMgChange(val,sendval)  })} />
                                    {/* </Form.Item>
                                </Form> */}
                            </div>
                            
                        </div>
                        {coverImgurl && 
                            <div className='coverimg fleximg'><img src={coverImgurl} alt="cover"  onError={(e) => { e.target.src = falseimg }}/></div>
                        }
                    </div>
                    
                    
                </div>
                <div><OSSUpload /></div>
                <div>
                </div>
                <div className='title'>
                    <div className='title-txt'>
                        <span className='font16 bold'>文章标题</span>
                        <span className='caution'>请注意：根据国家相关法律法规要求，切勿发任何色情、低俗、涉政等违法违规内容，一旦出现，我们将会根据法规进行处理</span>
                    </div>
                    <div className='flexl'>
                        <div className='title-item flexl'>
                            <input type="text" placeholder='请输入文章标题（5~50个字' defaultValue={title} onChange={this.titleChange} maxLength={50} minLength={5} />
                            
                        </div>
                        {titleMessage && 
                            <div className='flexl'>
                                <div className='warnimg fleximg'><img src={warnimg} alt="warning" /></div>
                                <div className='warn-message'>{titleMessage}</div>
                            </div>
                        }     
                    </div>
                    
                </div>
                <div className='text'>
                    <div className='font16 bold'>文章内容</div>
                    <div className='editor position'>
                        <Editor
                            initialValue={str}
                            id={"tincyEditor"}
                            tinymceScriptSrc={'../tinymce/js/tinymce/tinymce.min.js'}
                            apiKey="mabgo7mjxmpeaukhcqge4rtd5gvtay0595bkvv931xewl7yf"
                            init={{                               
                                language: 'zh_CN',
                                width: 790,
                                min_height: 350,
                                font_formats:"微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
                                plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  textpattern help emoticons autosave autoresize ',
                                toolbar: '| styleselect | fontsizeselect | forecolor backcolor bold italic underline strikethrough link image | code undo redo restoredraft | fontselect | cut copy paste pastetext | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight axupimgs',
                                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                                branding: false, // 水印“Powered by TinyMCE”
                                menubar: false, // 最上方的菜单
                                statusbar: true, // 底部的状态栏
                                convert_urls: false,//去除URL转换
                                plugin_preview_width: "930", // 预览宽度
                                images_upload_handler: (blobInfo, success, failure)=>{this.imageEditor(blobInfo, success, failure)}}}
                            onEditorChange={this.EditorChange}
                        />
                       

                        {textMessage && 
                            <div className='flexl text-message'>
                                <div className='warnimg fleximg'><img src={warnimg} alt="warning" /></div>
                                <div className='warn-message'>{textMessage}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}