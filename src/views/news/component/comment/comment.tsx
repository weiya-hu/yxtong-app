import { Component } from 'react'
import './comment.scss'
import CommentInput from '../commentInput/commentInput'
import CommentListItem from '../commentListItem/commentListItem';
import { Divider, Drawer} from 'antd';

import chaimg from '../../../../public/images/cha.png'
import toimg from '../../../../public/images/user/to.png'

export default class Comment extends Component {
    state={
        drawerShow:false,
        commentList:[],
        total:10
    }
    drawerClose=()=>{
        this.setState({drawerShow:false})
    }
    componentDidMount() {
        let arr=[]
        for(let i=0;i<10;i++){
            let item={
                name:'可爱啊的小灰灰',
                comment:'再说第二弹，商圈断绝的痕迹啊贺卡活动空间啊很大客户的空间啊安科技活动看哈好的空东莞房价还是过分的话就是的环境股份技术股份手动滑稽过分的话就是间啊啥的空间啊',
                time:'8小时前',
                favor:i*31,
                isfavor: i%2?true:false
            }
            arr.push(item)
        }
        this.setState({commentList:arr})
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