import { Component } from 'react'
import './comment.scss'
import CommentInput from '../commentInput/commentInput'
import CommentListItem from '../commentListItem/commentListItem';
import { Divider, Drawer} from 'antd';
import {commentList} from '../../../../service/news'

import chaimg from '../../../../public/images/cha.png'
import toimg from '../../../../public/images/user/to.png'

interface CommentProps{
    newsId:string
}

export default class Comment extends Component<CommentProps> {
    state={
        drawerShow:false,
        commentList:[],
        total:10,
        current:1,
        size:20
    }
    drawerClose=()=>{
        this.setState({drawerShow:false})
    }
    getComment=async()=>{
        let id = window.location.search.split('=')[1]
        let {current,size}=this.state
        let data={
            newsId:id,
            current:current,
            size:size
        }
        let res =await commentList(data)
        this.setState({commentList:res.body.records,total:res.body.total})
    }
    componentDidMount() {
        this.getComment()
    }
    render(){
        const {drawerShow,commentList,total} =this.state
        let commentListSmall=JSON.parse(JSON.stringify(commentList)).splice(0,2)
        return <div className='comment-component'>
            <div>
                <CommentInput size='big'/>
            </div>
            <div className='comment-component-comment'>
                {commentListSmall.map((item,index)=><div key={index} className='comment-list'>
                    <CommentListItem item={item} size='big'/>
                </div> )}
            </div>
            {total>2 && <div 
                    className='look-all fleximg'
                    onClick={()=>{this.setState({drawerShow:true})}}
                >
                    <div>查看全部<span>{total}</span>条评论</div>
                    <div className='toimg fleximg'><img src={toimg} alt="nxct" /></div>
                </div>
            }
            <div>

            </div>
            <div className='drawer'>
                <Drawer 
                    placement="right" 
                    headerStyle={{display:'none'}} 
                    bodyStyle={{padding:'26px'}} 
                    onClose={this.drawerClose} 
                    visible={drawerShow}
                    contentWrapperStyle={{width: '506px'}}
                >
                    <div className='position'>
                        <CommentInput size='small'/>
                        <div className='fleximg chaimg' onClick={this.drawerClose}><img src={chaimg} alt="close" /></div>
                    </div>
                    <div className='comment-component-comment'>
                        {commentList.map((item,index)=><div key={index} className='comment-list'>
                            <CommentListItem item={item} size='small'/>
                        </div> )}
                    </div>
                    {total>commentList.length?<div
                        className='look-more fleximg'
                        onClick={()=>{this.setState({drawerShow:true})}}
                    >
                        <div>查看更多评论</div>
                        <div className='fleximg toimg'><img src={toimg} alt="next" /></div>
                    </div>: <div className='color3 look-more-no'>赞无更多评论</div>
                    }
                    <div>
                    </div>
                </Drawer>
            </div>
        </div>
    }
    
}