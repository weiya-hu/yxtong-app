//@ts-nocheck
import { Component } from 'react'
import './newsNav.scss'
import { newsTypeList } from 'service/news'
import { util } from 'utils/news'
import { withRouter } from 'react-router-dom'
import store from 'store/index'

interface INewsNavProp {
    newsIndexChange: (val: number) => void
    newsTypeActive: number
}

class NewsNav extends Component<INewsNavProp,any> {
    state = {
        newsType: [],
        newsTypeId: '',
    }
    componentDidMount = async () => {
        const { status, body } = await newsTypeList()
        let newsTypeId = util.getUrlParam('newsTypeId')
        let newsId = util.getUrlParam('newsId')
        if (status) {
            let id = newsTypeId || store.getState().newsMayLikeId
            this.setState({
                newsType: body,
                newsTypeId: newsId?null:id
            })
            if(!newsId) {
                this.props.history.push('/app/news?newsTypeId='+id)
                this.props.newsIndexChange()
            } 
        }
    }
    render() {
        let { newsType,newsTypeId } = this.state
        let { newsTypeActive } = this.props
        return (
            <div className='news-type flexl' >
                {newsType.map((item, index) => (
                    <div
                        key={index}
                        className={newsTypeId == item.id ? 'news-type-item news-type-item-active pointer' : 'news-type-item pointer'}
                        onClick={() => {
                            this.props.history.push('/app/news?newsTypeId='+item.id)
                            this.setState({newsTypeId: item.id})
                            this.props.newsIndexChange()
                            window.scrollTo(0, 0);
                        }}
                    >{item.name}</div>))}
            </div>
        )
    }

}

export default withRouter( NewsNav )