import loadable from 'loadable-components'     //npm i loadable-components 用作解决路由懒加载
const Loading = () => <div>Loading...</div>
 
const Home = loadable(() => import('views/home'), {
    LoadingComponent: Loading,
})
const Login = loadable(() => import('views/login/login'), {
    LoadingComponent: Loading,
})

const Register = loadable(() => import('views/login/register'), {
    LoadingComponent: Loading,
})

const User = loadable(() => import('views/user/user'), {
    LoadingComponent: Loading,
})
//新闻列表页
const News = loadable(()=> import('views/news/news'), {
    LoadingComponent: Loading,
})
//新闻详情页
const NewsDetail = loadable(()=> import('views/news/newsDetail'), {
    LoadingComponent: Loading,
})
//文章作者的更多页面
const NewsAuthorMore = loadable(()=> import('views/news/authorMore'), {
    LoadingComponent: Loading,
})


export const routerMap = [
    {path: "/app/user", name: "User", component: User, auth: true},
    {path: "/app/login", name: "Login", component: Login},
    {path: "/app/register/register", name: "Register", component: Register},
    {path: "/app/register/forget", name: "Register", component: Register},
    {path: "/app/news", name: "News", component: News},
    {path: "/app/newsdetail", name: "NewsDetail", component: NewsDetail},
    {path: "/app/newsauthormore", name: "NewsAuthorMore", component: NewsAuthorMore},
];