import MyCollect from 'views/user/mine/myCollect'
import MyFollow from 'views/user/mine/myFollow'
import MyTask from 'views/user/myTask'
import MyTeam from 'views/user/myTeam'
import Poster from 'views/user/poster'
import Video from 'views/user/video'
import profit from 'views/user/profit'
import Certificate from 'views/user/certificate'
import Writing from 'views/user/writing'
import articleList from 'views/user/articleList'
import articleDetail from 'views/user/articleDetail'

import certifateimg from 'public/images/userLeftNav/certifate.png'
import certifateaimg from 'public/images/userLeftNav/certifate_a.png'
import contentimg from 'public/images/userLeftNav/content.png'
import contentaimg from 'public/images/userLeftNav/content_a.png'
import dataimg from 'public/images/userLeftNav/data.png'
import dataaimg from 'public/images/userLeftNav/data_a.png'
import eachimg from 'public/images/userLeftNav/each.png'
import eachaimg from 'public/images/userLeftNav/each_a.png'
import mytaskimg from 'public/images/userLeftNav/mytask.png'
import mytaskaimg from 'public/images/userLeftNav/mytask_a.png'
import myteamimg from 'public/images/userLeftNav/myteam.png'
import myteamaimg from 'public/images/userLeftNav/myteam_a.png'
import posterimg from 'public/images/userLeftNav/poster.png'
import posteraimg from 'public/images/userLeftNav/poster_a.png'
import publishimg from 'public/images/userLeftNav/publish.png'
import publishaimg from 'public/images/userLeftNav/publish_a.png'
import scoreimg from 'public/images/userLeftNav/score.png'
import scoreaimg from 'public/images/userLeftNav/score_a.png'
import setimg from 'public/images/userLeftNav/set.png'
import setaimg from 'public/images/userLeftNav/set_a.png'
import videoimg from 'public/images/userLeftNav/video.png'
import videoaimg from 'public/images/userLeftNav/video_a.png'
export const userComponent=[
    {name:'个人中心',id:1,lv:1,show:true,children:[
        {name:'我的互动',id:1,lv:2,show:true,icon:eachimg,icon_a:eachaimg,children:[
            {name:'我的收藏',id:1,lv:3,show:true,component:MyCollect},
            {name:'我的关注',id:2,lv:3,show:true,component:MyFollow}
        ]}
    ]},
    {name:'我的任务',id:2,lv:1,show:true,children:[
        {name:'我的任务',id:1,lv:2,show:true,icon:mytaskimg,icon_a:mytaskaimg,component:MyTask}
    ]},
    {name:'我的团队',id:3,lv:1,show:true,children:[
        {name:'我的团队',id:1,lv:2,show:true,icon:myteamimg,icon_a:myteamaimg,component:MyTeam}
    ]},
    {name:'我的推广',id:4,lv:1,show:true,children:[
        {name:'海报',id:1,lv:2,show:true,icon:posterimg,icon_a:posteraimg,component:Poster},
        {name:'视频',id:2,lv:2,show:true,icon:videoimg,icon_a:videoaimg,component:Video}
    ]},
    {name:'我的收益',id:5,lv:1,show:true,children:[
        {name:'积分明细',id:1,lv:2,show:true,icon:scoreimg,icon_a:scoreaimg,component:profit}
    ]},
    {name:'所属企业',id:6,lv:1,show:true,children:[
        {name:'企业认证',id:1,lv:2,show:true,icon:certifateimg,icon_a:certifateaimg,component:Certificate}
    ]},
    {name:'创作中心',id:7,lv:1,show:true,children:[
        {name:'发布文章',id:1,lv:2,show:true,icon:publishimg,icon_a:publishaimg,component:Writing},
        {name:'内容管理',id:2,lv:2,show:true,icon:contentimg,icon_a:contentaimg,component:articleList},
        {name:'内容管理',id:3,lv:2,show:false,component:articleDetail}//内容详情
    ]},
]