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
//第三方登录页面，空白页面，承载逻辑，分流跳转到相应页面，目前只有微信登录
const otherLogin = loadable(()=> import('views/login/component/othorLogin/otherLoginIndex'), {
    LoadingComponent: Loading,
})
//手机绑定页面,验证成功后会登陆
const phoneBindLogin = loadable(()=> import('views/login/component/othorLogin/phoneBindLogin/phoneBindLogin'), {
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
    {path: "/app/wechat/callback.do", name: "otherLogin", component: otherLogin},
    {path: "/app/bindphone", name: "phoneBindLogin", component: phoneBindLogin},
];