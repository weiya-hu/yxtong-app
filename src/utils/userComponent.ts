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
export const userComponent=[
    {name:'个人中心',id:1,children:[
        {name:'我的互动',id:1,children:[
            {name:'我的收藏',id:1,component:MyCollect},
            {name:'我的关注',id:2,component:MyFollow}
        ]}
    ]},
    {name:'我的任务',id:2,children:[
        {name:'我的任务',id:1,component:MyTask}
    ]},
    {name:'我的团队',id:3,children:[
        {name:'我的团队',id:1,component:MyTeam}
    ]},
    {name:'我的推广',id:4,children:[
        {name:'海报',id:1,component:Poster},
        {name:'视频',id:2,component:Video}
    ]},
    {name:'我的收益',id:5,children:[
        {name:'积分明细',id:1,component:profit}
    ]},
    {name:'所属企业',id:6,children:[
        {name:'企业认证',id:1,component:Certificate}
    ]},
    {name:'创作中心',id:7,children:[
        {name:'发布文章',id:1,component:Writing},
        {name:'内容管理',id:2,component:articleList},
        {name:'内容管理',id:3,component:articleDetail}//内容详情
    ]},
]