import { Component } from 'react'
import './report.scss'
import {sureReport} from 'service/news'
import $message from 'views/component/message'
import {util} from 'utils/news'

import store from 'store';
import {loginShow} from 'store/actionCreators'

import reportimg from 'public/images/user/report.png'
import chaBlackimg from 'public/images/user/chaBlack.png'
import selectimg from 'public/images/user/select.png'
import unselectimg from 'public/images/user/unselect.png'

export default class Report extends Component {
    state={
        reports:['色情低俗','涉嫌违法犯罪','恐怖恶心','标题党','时政信息不实','格式样式问题','其他'],
        reportActive:-1,
        reportShow:false,
    }
    //点击举报反馈
    report=async()=>{
        let userInfo =  store.getState().userInfo
        if(userInfo){//如果登录了
            this.reportEdit()
        }else{//没有登录
            store.dispatch(loginShow())
        }
    }
    //取消举报
    reportEdit=()=>{
        let {reportShow}=this.state
        if(reportShow){
            document.body.style.overflow='auto'
        }
        this.setState({reportShow:!reportShow})
        
    }
    //确认举报按钮
    reportSure=async()=>{
        const {reportActive,reports} =this.state
        // let url = window.location.href
        // let id=url.substring(url.indexOf('=')+1,url.length)
        let id = util.getUrlParam('newsId')
        let data={
            "content": reports[reportActive],
            "news_id":id
        }
        const res = await sureReport(data)
        if(res.status){
            $message.info(res.message)
            this.reportEdit()
        }else if(res.errno === 10620){
            $message.info('身份认证过期，请先登录后再试')
            store.dispatch(loginShow())
        }
    }
    render(){
        const {reports,reportActive,reportShow } =this.state
        return <div className='flexr report-component'>
            <div className='flexr pointer' onClick={this.report}>
                <div className='fleximg reportimg'>
                    <img src={reportimg} alt="report" />
                </div>
                <div className='flexr'>
                    举报<div className='report-component-g fleximg'>/</div> 反馈
                </div>
            </div>
            
            {reportShow && <div className='report-frame fleximg'>
                <div className='report-frame-item flexcbl'>
                    <div className='flexb report-frame-item-title'>
                        <div>举报内容问题</div>
                        <div className='chaimg fleximg' onClick={this.reportEdit}><img src={chaBlackimg} alt="close" /></div>
                    </div>
                    <div className='report-frame-item-contents'>
                        {reports.map((item,index)=><div 
                            key={index} 
                            className='flexb report-frame-item-content pointer'
                            onClick={()=>{this.setState({reportActive:index})}}
                        >
                            <div>{item}</div>
                            <div className='selectimg'><img src={reportActive === index ? selectimg:unselectimg} alt="report" /></div>
                        </div>)
                        }
                    </div>
                    <div className='flexr report-frame-item-button'>
                        <div onClick={this.reportEdit} className='edit-button fleximg pointer'>取消</div>
                        <div onClick={this.reportSure} className='sure-button fleximg pointer'>确认</div>
                    </div>
                </div>
            </div>
            }
               
        </div>
    }
    
}