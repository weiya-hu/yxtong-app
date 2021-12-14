import { Component } from 'react'
import './writing.scss'

import addimg from '../../public/images/user/add.png'
import warnimg from '../../public/images/warn.png'

export default class Writing extends Component{
    state={
        titleMessage:''
    }
    render(){
        let titleMessage=this.state.titleMessage
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
                </div>
            </div>
        )
    }
}