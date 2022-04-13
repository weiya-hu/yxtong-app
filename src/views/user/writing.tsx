//@ts-nocheck
import { Component } from 'react'
import './writing.scss'
import { Editor } from '@tinymce/tinymce-react'
import AliyunOSSUpload from './component/ossImg'
import message from 'views/component/message/index';
import { newsPublish, newsSave ,uploadPolicy} from 'service/user'
import { getEditNews } from 'service/news'
import OSSUpload from './component/ossImgPerf'
import { withRouter } from 'react-router-dom'
import store from 'store';
import { util } from 'utils/news'
import axios from "axios";

import addimg from 'public/images/user/add.png'
import warnimg from 'public/images/warn.png'
import falseimg from 'public/images/user/false.png'
import { copyFileSync } from 'fs';

class Writing extends Component {
	state = {
		titleMessage: '',//标题的错误message
		textMessage: '',//文章的错误message
		coverImgurl: '',//本地显示的封面地址
		sendCoverImgurl: '',//发送的封面图片地址
		title: '',//文章标题
		content: '',//富文本的值
		edit: '',//富文本的值，实时值，编辑器有改变时实时保存的值
		isupload:null,//确认上传封面
		contentImgs:[],
		isPublish:null,
	}
	//富文本编辑器文本有改变
	EditorChange = (val) => {
		this.setState({
			edit: val,
			textMessage: val ? '' : '必填项'
		})
	}
	//标题输入有改变
	titleChange = (e) => {
		this.setState({
			title: e.target.value,
			titleMessage: e.target.value ? '' : '必填项'
		})
	}
	titleBlur = (e) => {
		let length = e.target.value.length
		length < 5 && message.info('标题最少5个字')
	}
	imageEditor = (blobInfo, success, failure) => {
		const imgBlob = blobInfo.blob()
		if (imgBlob){
			if((imgBlob.size / 1024 / 1024) > 2){
				failure(`图片最大不能超过2M`)
			}else{
				const imgBlobUrl = URL.createObjectURL(imgBlob) // 创建URL对象，会在浏览器关闭当前页面时销毁，也可以调用URL.revokeObjectURL()销毁
				let {contentImgs} = this.state
				contentImgs.push({ // 先添加进一个数组，上传时findIndex寻找是否在数组中，这里tinymce有个机制是，只要添加了图片没有点保存也会触发upload函数，会导致contentImgs数组长度和真实内容图片数量不一致，会有一些多余的图片
					blobUrl:imgBlobUrl,
					fileObj:imgBlob,
					fileName:blobInfo.filename()
				})
				this.setState({contentImgs:contentImgs})
				success(imgBlobUrl) // 先用本地图片当做内容图片，用户提交时再调用upImages上传并替换img标签的src为线上地址
			}
		}
	}
	//预览文章
	preView = () => {
		const { title, edit, coverImgurl, sendCoverImgurl } = this.state
		if(!coverImgurl){
			message.info('请添加封面')
		}else if (!title) {
			message.info('请输入标题')
			this.setState({ titleMessage: '必填项' })
		} else if (title.length < 5) {
			message.info('标题最少5个字')
		} else if (!edit) {
			message.info('请编辑文章')
			this.setState({ textMessage: '必填项' })
		}else {
			let item = {
				commented: 0,
				content: edit,
				readed: 0,
				thumb_url: coverImgurl,
				title: title,
				update_time: new Date(),
				sendCoverImgurl: sendCoverImgurl,
				creator_name: store.getState().userInfo.name
			}
			localStorage.setItem('previewNews', JSON.stringify(item))
			this.props.history.push('/app/user?componentId=73&readNewsId=preview')
		}
	}
	//发布文章和保存文章
	publishNews = async (isPublish) => {
		const { title, edit, sendCoverImgurl, coverImgurl } = this.state
		if(!coverImgurl){
			message.info('请添加封面')
		}else if (!title) {
			message.info('请输入标题')
			this.setState({ titleMessage: '必填项' })
		} else if (title.length < 5) {
			message.info('标题最少5个字')
		} else if (!edit) {
			message.info('请编辑文章')
			this.setState({ textMessage: '必填项' })
		} else {
			this.setState({isupload:true,isPublish:isPublish})
		}
	}
	publishNewsSure = async(url,isup) => {
		this.setState({isupload:isup})
		const editRes = await this.upImages()
		let id = util.getUrlParam('editNewsId')
		const { title,isPublish,sendCoverImgurl} = this.state
		let item = {
			content: editRes,
			thumb_url: url || sendCoverImgurl,
			title: title,
			id: id ? id : null
		}
		const res = isPublish ? await newsPublish(item) : await newsSave(item)
		if (res.status) {
			message.info(isPublish ? '发布成功' : '保存成功')
			this.setState({
				coverImgurl: '',
				title: '',
				content: '',
				titleMessage: '',
				textMessage: '',
				edit: '',
				sendCoverImgurl: ''
			})
			this.props.history.push('/app/user?componentId=72')
		}
	}
	upImages = async ()=>{
		// const content = props.modelValue
		const content = this.state.edit
		const {contentImgs} =this.state
		const imgReg = /<img [^>]*src=['"]blob:([^'"]+)[^>]*>/gi;
		const srcReg = /src=[\'\"]?(blob:[^\'\"]*)[\'\"]?/gi
		const imgArr = content.match(imgReg)
		let t = content
		if(imgArr){
			let i = 0
			const upFn = async (imgItem:string)=>{
				let url = ''
				let oneImgBlobUrl = ''
				imgItem.replace(srcReg,function(match: string, capture: any){
					//match匹配的子串 capture 代表第n个括号匹配的字符串 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
					oneImgBlobUrl = capture
					return match
				})
				const j = contentImgs.findIndex(v=>v.blobUrl == oneImgBlobUrl)
				if(j > -1){
					const res = await uploadPolicy({site:'news'})
					if(res.status == 1){
						const fileObj = contentImgs[j]
						const exname = fileObj.fileName.substring(fileObj.fileName.lastIndexOf("."))
						const fd = new FormData();
						const upData = {
							key: res.body.dir + '/' + res.body.uuid + exname,
							OSSAccessKeyId: res.body.accessid,
							success_action_status: 200,
							policy: res.body.policy,
							signature: res.body.signature,
						};
						for (const [key, value] of Object.entries(upData)) {
							fd.append(key, value as string);
						}
						fd.append("file", fileObj.fileObj);
						const response = await axios({
							url: res.body.host,
							method: 'post',
							headers: {
								"Content-Type": "multipart/form-data;",
							},
							data: fd,
						})
						if(response.status == 200){
							url = 'src="' + res.body.host + '/' + res.body.dir + '/' + res.body.uuid + exname + '"'
						}else{
							url = 'scr=""'
						}
					}else{
						url = 'scr=""'
					}
				}else{
					url = 'scr=""'
				}
				const newImg = imgItem.replace(srcReg,url) // 替换当前blob地址为上传后地址
				t = t.replace(imgItem,newImg) // 整个内容中替换当前这张图片
				
				if(i < (imgArr.length - 1)){
					i++
					if(imgArr[i]){
						await upFn(imgArr[i])
					}
				}
			}
			if(imgArr[i]){
				await upFn(imgArr[i])
			}
			// console.log(t,123);
			return t
			// emit('update:modelValue',t)

			// editvalue.value = t
		}else {
			return t
		}
	}
	clearImgs = ()=>{
		const {contentImgs} = this.state
		contentImgs.forEach(v=>{
			URL.revokeObjectURL(v.blobUrl)
		})
	}
	componentDidMount = async () => {
		//如果路径中带有editNewsId表示是编辑功能，不是从0创作功能，要获取编辑的文章内容再赋值
		let newsId = util.getUrlParam('editNewsId')
		if (newsId === 'previewBack') {
			let previewNews = JSON.parse(localStorage.getItem('previewNews'))
			this.setState({
				coverImgurl: previewNews.thumb_url,
				sendCoverImgurl: previewNews.thumb_url,
				title: previewNews.title,
				content: previewNews.content,
				edit: previewNews.content
			})
		} else if (newsId) {
			const { body, status } = await getEditNews({ newsId: newsId })
			status && this.setState({
				coverImgurl: body.thumb_url,
				sendCoverImgurl: body.thumb_url,
				title: body.title,
				content: body.content,
				edit: body.content
			})
		}


	}
	componentWillUnmount(){
		this.clearImgs()
	}
	getObjectURL = (file) => {
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
	coverIMgChange = (val) => {
		this.setState({
			coverImgurl: val
		})
	}
	render() {
		let { titleMessage, coverImgurl, textMessage, title, content,isupload } = this.state
		return (
			<div className='writing' id='writing'>
				<div className='top flexb'>
					<div>
						<span className='writing-txt'>发布文章</span>
						{/* <span  className='font12 color3'>草稿自动保存</span> */}
					</div>
					<div className='flexr'>
						<div className='writing-buttton fleximg pointer' onClick={() => this.publishNews(1)}>发布文章</div>
						<div className='preview-button fleximg pointer' onClick={() => this.publishNews(0)}>保存</div>
						<div className='preview-button fleximg pointer' onClick={this.preView}>预览</div>
					</div>
				</div>
				<div className='cover'>
					<div className='cover-txt'>上传封面</div>
					<div className='flexl cover-img'>
						<div className='cover-button position'>
							<div className='addimg'><img src={addimg} alt="add" /></div>
							<div>添加封面</div>
							<div>
								<OSSUpload change={(val => { this.coverIMgChange(val) })} isupload={isupload} success={this.publishNewsSure} maxSize={2}/>
							</div>
						</div>
						{coverImgurl &&
							<div className='coverimg fleximg'><img src={coverImgurl} alt="cover" onError={(e) => { e.target.src = falseimg }} /></div>
						}
					</div>
				</div>
				<div>
				</div>
				<div className='title'>
					<div className='title-txt'>
						<span className='font16 bold'>文章标题</span>
						<span className='caution'>请注意：根据国家相关法律法规要求，切勿发任何色情、低俗、涉政等违法违规内容，一旦出现，我们将会根据法规进行处理</span>
					</div>
					<div className='flexl'>
						<div className='title-item flexl'>
							<input type="text" placeholder='请输入文章标题（5~50个字）' defaultValue={title} onBlur={this.titleBlur} onChange={this.titleChange} maxLength={50} minLength={5} />

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
							initialValue={content}
							id={"tincyEditor"}
							tinymceScriptSrc={'../tinymce/js/tinymce/tinymce.min.js'}
							apiKey="mabgo7mjxmpeaukhcqge4rtd5gvtay0595bkvv931xewl7yf"
							init={{
								language: 'zh_CN',
								width: 790,
								min_height: 350,
								font_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
								plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  textpattern help emoticons autosave autoresize ',
								toolbar: '| styleselect | fontsizeselect | forecolor backcolor bold italic underline strikethrough link image | code undo redo restoredraft | fontselect | cut copy paste pastetext | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight axupimgs',
								fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
								branding: false, // 水印“Powered by TinyMCE”
								menubar: false, // 最上方的菜单
								statusbar: true, // 底部的状态栏
								convert_urls: false,//去除URL转换
								plugin_preview_width: "930", // 预览宽度
								// images_upload_handler: (blobInfo, success, failure) => { this.imageEditor(blobInfo, success, failure) }
								images_upload_handler:this.imageEditor
							}}
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

export default withRouter(Writing)