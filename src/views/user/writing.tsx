// @ts-nocheck
import { Component } from 'react'
import './writing.scss'
import { Editor } from '@tinymce/tinymce-react'
import tinymce from 'tinymce/tinymce';


import addimg from '../../public/images/user/add.png'
import warnimg from '../../public/images/warn.png'

export default class Writing extends Component{
    state={
        titleMessage:''
    }
    render(){
        let titleMessage=this.state.titleMessage
        let templateStr='jfgsdhgfshfsj'
        return(
            <div className='writing'>
                <div className='top flexb'>
                    <div>
                        <span className='writing-txt'>发布文章</span>
                        <span  className='font12 color3'>草稿自动保存</span>
                    </div>
                    <div className='flexr'>
                        <div className='writing-buttton fleximg'>发布文章</div>
                        <div className='preview-button fleximg'>预览文章</div>
                    </div>
                </div>
                <div className='cover'>
                    <div className='cover-txt'>上传封面</div>
                    <div className='cover-button'>
                        <div className='addimg'><img src={addimg} alt="add" /></div>
                        <div>添加封面</div>
                    </div>
                </div>
                <div className='title'>
                    <div className='title-txt'>
                        <span className='font16 bold'>文章标题</span>
                        <span className='caution'>请注意：根据国家相关法律法规要求，切勿发任何色情、低俗、涉政等违法违规内容，一旦出现，我们将会根据法规进行处理</span>
                    </div>
                    <div className='flexl'>
                        <div className='title-item flexl'>
                            <input type="text" placeholder='请输入文章标题（5~50个字）' maxLength={50} minLength={5} />
                            
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
                    <div className='editor'>
                        <Editor
                            initialValue={templateStr}
                            id={"tincyEditor"}
                            tinymceScriptSrc={'../../../tinymce/js/tinymce/tinymce.min.js'}
                            apiKey="rh24uyb3hr53u33vfied8hxssd4gtwuk8y4k3oh6szi5el3k"
                            init={{
                                language: 'zh_CN',
                                width: 790,
                                min_height: 350,
                                font_formats:"微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
                                plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter',
                                toolbar: 'styleselect | fontsizeselect | forecolor backcolor bold italic underline strikethrough link image | code undo redo restoredraft | fontselect | cut copy paste pastetext | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
                                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                                branding: false, // 水印“Powered by TinyMCE”
                                menubar: false, // 最上方的菜单
                                statusbar: true, // 底部的状态栏
                                convert_urls: false,//去除URL转换
                                plugin_preview_width: "930", // 预览宽度
                                images_upload_handler: (blobInfo, success, failure)=>{}}}
                            onEditorChange={this.EditorChange}
                        />

                    </div>
                </div>
            </div>
        )
    }
}