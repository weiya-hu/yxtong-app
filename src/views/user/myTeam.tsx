//@ts-nocheck
import { Component } from 'react'
import './myTeam.scss'
import {memberList,teamCount,teamDirect,teamIndirect,teamList} from 'service/user'
import { Select } from 'antd';

import teamUpimg from 'public/images/user/teamUp.png'
import member1img from 'public/images/user/member1.png'
import member2img from 'public/images/user/member2.png'
import member3img from 'public/images/user/member3.png'
import member4img from 'public/images/user/member4.png'

const { Option } = Select;
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
    contentType:['直推','间推']
  }
  star=async()=>{
    const teamCountRes=await teamCount()
    const teamDirectRes=await teamDirect()
    const teamIndirectRes=await teamIndirect()
    const memberListRes=await memberList()
    this.setState({
      teamNum:teamCountRes.body,
      teamDirectNum:teamDirectRes.body,
      teamIndirectNum:teamIndirectRes.body,
      memberList:memberListRes.body,
    })
  }
  getTeamList=async(id ?:number)=>{
    const {page,size,contentIndex,memberId} = this.state
    let data={
      current:page,
      size,
      type:contentIndex+1,
      memberId:id || memberId
    }
    const {status,body} = await teamList(data)
  }
  titleChange=(index)=>{
    console.log(index)
    this.setState({contentIndex:index})
  }
  componentDidMount(){
    this.star()
    this.getTeamList(1)
  }
  render(){
    const {teamNum,teamDirectNum,teamIndirectNum,memberId,memberList,contentIndex,contentType}=this.state
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
                <Select defaultValue={memberId}  bordered={false}>
                  <Option value={null}>全部</Option>
                  {memberList.map(item=>(
                    <Option  value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-team-content'>
        dfjsdk 
      </div>
    </div>
  }
    
}