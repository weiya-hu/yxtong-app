import { Component, ReactNode } from 'react'
import './articleDetail.scss'

export default class ArticleDetail extends Component{
    state={
        detail:{
            title:'兴证全球谢治宇：电商15%的增速相比社零4%的增长，人具有显著优势，传统线下胜者为王，711全家初显成色',
            time:'2021年9月23日 09:25',
            from:'原创',
            read:2039
        }
    }
    render(): ReactNode {
        let detail = this.state.detail
        return(
            <div className='articleDetail'>
                <div className='title'>{detail.title}</div>
                <div className='flexb detail-info'>
                    <div className='flexl'>
                        <div>{detail.time}</div>
                        <div className='detail-from'>来源：{detail.from}</div>
                    </div>
                    <div>阅读量： {detail.read}</div>
                </div>
            </div>
        )
    }
}