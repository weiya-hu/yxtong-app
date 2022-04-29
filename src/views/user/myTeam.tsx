//@ts-nocheck
import { Component } from 'react'
import './myTeam.scss'
import {memberLists,teamCount,teamDirect,teamIndirect,teamLists} from 'service/user'
import { Select,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MoreTxt from 'views/news/component/moreTxt/moreTxt';
import moment from 'moment'
import {util} from 'utils/news'

import teamUpimg from 'public/images/user/teamUp.png'
import member1img from 'public/images/user/member1.png'
import member2img from 'public/images/user/member2.png'
import member3img from 'public/images/user/member3.png'
import member4img from 'public/images/user/member4.png'
import falseimg from 'public/images/user/false.png'
import nodataBigimg from 'public/images/user/nodataBig.png'

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default class MyTeam extends Component {
  state={
    teamNum:{},
    teamDirectNum:{},
    teamIndirectNum:{},
    teamList:[],
    memberList:[],
    memberId:null,
    contentIndex:0,
    page:1,
    size:10,
    contentType:['直推','间推'],
    loading:false,
    hasMore: true,// 判断接口是否还有数据，通过接口设置
  }
  loadMoreData=()=>{
    this.getTeamList()
  }
  // 页面滚动
  handleScroll = () => {
    const {hasMore} = this.state;
    if(!hasMore){
        return;
    }
    if(util.getIsTOBottom() < 10){
    // 解除绑定
    window.removeEventListener('scroll', this.handleScroll ,false);
    // 在这里发送请求
    this.loadMoreData()
    // 并在请求到数据后重新开启监听
    setTimeout(()=>window.addEventListener('scroll', this.handleScroll, false), 300)
    }
  }
  star=async()=>{
    const teamCountRes=await teamCount();
    const teamDirectRes=await teamDirect();
    const teamIndirectRes=await teamIndirect();
    const memberListRes=await memberLists();
    (teamCountRes.status && teamDirectRes.status && teamIndirectRes.status && memberListRes.status) && this.setState({
      teamNum:teamCountRes.body,
      teamDirectNum:teamDirectRes.body,
      teamIndirectNum:teamIndirectRes.body,
      memberList:memberListRes.body,
    })
  }
  //id参数代表是直推还是间推的下标,member是会员id
  getTeamListFirst=async(id ?:number,member?:string)=>{
    const {size,contentIndex,memberId} = this.state
    let data={
      current:1,
      size,
      type: id+1 ||contentIndex+1,
      memberId: member ||memberId
    }
    this.setState({loading:true})
    const {status,body} = await teamLists(data)
    this.setState({loading:false})
    status && this.setState({
      teamList:body.records,
      hasMore:body.total>size,
      page:2,
      total:body.total
    })
  }
  //id参数代表是直推还是间推的下标
  getTeamList=async(id ?:number,member?:string)=>{
    const {page,size,contentIndex,memberId,teamList} = this.state
    let data={
      current:page,
      size,
      type: id+1 || contentIndex+1,
      memberId:member || memberId
    }
    const {status,body} = await teamLists(data)
    status && this.setState({
      teamList:teamList.concat(body.records),
      hasMore:body.total>size*page,
      page:page+1,
      total:body.total
    })
  }
  titleChange=(index)=>{
    this.setState({contentIndex:index})
    this.getTeamListFirst(index)
  }
  memberChange=(val)=>{
    this.getTeamListFirst(this.state.contentIndex,val)
  }
  componentDidMount(){
    this.star()
    this.getTeamListFirst()
    window.addEventListener('scroll', this.handleScroll, false)
  }
  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll)
    this.setState = (state,callback)=>{
      return;
    }
}
  render(){
    const {teamNum,teamDirectNum,teamList,teamIndirectNum,memberId,memberList,contentIndex,contentType,loading,hasMore}=this.state
    return <div id='my-team'>
      <div className='top-item'>
        <div className='width position'>
          <div className='my-team-top'>
            <div className='flexb'>
              <div className='my-team-top-item'>
                <div className='flexb'>
                  <div className='top-team-num-txt'>团队（人数）</div>
                  <div className='top-team-num fleximg'>
                    今日：
                    <div className='teamUpimg fleximg'><img src={teamUpimg} alt="up"/> </div>
                    {teamNum.today_count}
                  </div>
                </div>
                <div className='top-team-num-all'>{teamNum.count}</div>
              </div>
              <div className='my-team-top-item'>
                <div className='flexb'>
                  <div className='top-team-num-txt'>直推（人数）</div>
                  <div className='top-team-num fleximg'>
                    今日：
                    <div className='teamUpimg fleximg'><img src={teamUpimg} alt="up"/> </div>
                    {teamDirectNum.today_direct_recommend_count}
                  </div>
                </div>
                <div className='top-team-num-all'>{teamDirectNum.direct_recommend_count}</div>
              </div>
              <div className='my-team-top-item'>
                <div className='flexb'>
                  <div className='top-team-num-txt'>间推（人数）</div>
                  <div className='top-team-num fleximg'>
                    今日：
                    <div className='teamUpimg fleximg'><img src={teamUpimg} alt="up"/> </div>
                    {teamIndirectNum.today_indirect_recommend_count}
                  </div>
                </div>
                <div className='top-team-num-all'>{teamIndirectNum.indirect_recommend_count}</div>
              </div>
            </div>
            <div className='my-team-title flexb'>
              <div className='flexl'>
                {contentType.map((item,index)=>(<div 
                  key={index}
                  onClick={()=>this.titleChange(index)}
                  className={(contentIndex == index)?'my-team-title-item my-team-title-item-a':'my-team-title-item'}
                >
                  {item}
                </div> ))}
              </div>
              <div className='flexr my-team-member-txt'>
                会员等级：
                <Select defaultValue={memberId}  bordered={false} onSelect={this.memberChange}>
                  <Option value={null}>全部</Option>
                  {memberList.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-team-content'>
        <Spin indicator={antIcon} spinning={loading}>
          {teamList.length>0 && <div>
            {teamList.map((item,index)=>(
            // 一行用户信息
            <div 
              key={index}
              className='flexb my-teamer-item'
            >   
              {/* 用户最左边信息 */}
              <div className='flexl '>
                <div className='headimg head'><img src={item.head || falseimg} alt="head" onError={(e) => { e.target.src = falseimg }}/></div>
                <div className='flexcbl'>
                  {/* 会员等级那一小排信息 */}
                  <div className='my-teamer-name flexl'>{item.name}
                    <div className='memberimg fleximg'><img src={item.level==1?member1img:item.level==2?member2img:item.level==3?member3img:member4img} alt="member" onError={(e) => { e.target.src = falseimg }}/></div>
                  </div>
                  <div className='my-teamer-time'>加入时间：{moment(item.create_time).format('YYYY年MM月DD日')}</div>
                </div>
              </div>
              <div className='my-teamer-wechart-name'>微信号：{item.we_chat || '--'}</div>
              <div className='my-teamer-phone'>手机号：{item.mobile || '--'}</div>
            </div>))}
          </div>}
          {teamList.length === 0 && <div className='myCollect-nodata fleximg'>
              <div className='nodataBigimg fleximg'>
                  <img src={nodataBigimg} alt="nodata" />
                  <div className='myCollect-nodata-txt'>暂无更多数据</div>
              </div>  
          </div>}
          {teamList.length > 0 &&<MoreTxt hasMore={hasMore}/>}
        </Spin>
      </div>
    </div>
  }
    
}