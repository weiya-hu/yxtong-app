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
import Article from 'views/user/article'

import articleimg from 'public/images/userLeftNav/article.png'
import articleaimg from 'public/images/userLeftNav/article_a.png'
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
    {name:'????????????',id:1,lv:1,show:true,children:[
        {name:'????????????',id:1,lv:2,show:true,icon:eachimg,icon_a:eachaimg,children:[
            {name:'????????????',id:1,lv:3,show:true,component:MyCollect},
            {name:'????????????',id:2,lv:3,show:true,component:MyFollow}
        ]}
    ]},
    {name:'????????????',id:2,lv:1,show:true,children:[
        {name:'????????????',id:1,lv:2,show:true,icon:mytaskimg,icon_a:mytaskaimg,component:MyTask}
    ]},
    {name:'????????????',id:3,lv:1,show:true,children:[
        {name:'????????????',id:1,lv:2,show:true,icon:myteamimg,icon_a:myteamaimg,component:MyTeam}
    ]},
    {name:'????????????',id:4,lv:1,show:true,children:[
        {name:'??????',id:1,lv:2,show:true,icon:articleimg,icon_a:articleaimg,component:Article},
        {name:'??????',id:2,lv:2,show:true,icon:posterimg,icon_a:posteraimg,component:Poster},
        // {name:'??????',id:3,lv:2,show:true,icon:videoimg,icon_a:videoaimg,component:Video}
        {name:'????????????',id:4,lv:2,show:false,father:1,component:articleDetail},
    ]},
    {name:'????????????',id:5,lv:1,show:true,children:[
        {name:'????????????',id:1,lv:2,show:true,icon:scoreimg,icon_a:scoreaimg,component:profit}
    ]},
    {name:'????????????',id:6,lv:1,show:true,children:[
        {name:'????????????',id:1,lv:2,show:true,icon:certifateimg,icon_a:certifateaimg,component:Certificate}
    ]},
    {name:'????????????',id:7,lv:1,show:true,children:[
        {name:'????????????',id:1,lv:2,show:true,icon:publishimg,icon_a:publishaimg,component:Writing},
        {name:'????????????',id:2,lv:2,show:true,icon:contentimg,icon_a:contentaimg,component:articleList},
        {name:'??????????????????',id:3,lv:2,show:false,father:2,component:articleDetail}//????????????
    ]},
]