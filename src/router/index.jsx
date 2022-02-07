import React,{Fragment} from 'react'
import loadable from 'loadable-components'     //npm i loadable-components 用作解决路由懒加载
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FrontendAuth from "FrontendAuth";
import {routerMap} from "routerMap";
// import NotFound from '../views/notFound'
 
// const Loading = () => <div>Loading...</div>
 
// const Home = loadable(() => import('../views/home'), {
//     LoadingComponent: Loading,
// })
// const Login = loadable(() => import('../views/login/login'), {
//     LoadingComponent: Loading,
// })

// const Register = loadable(() => import('../views/login/register'), {
//     LoadingComponent: Loading,
// })

// const User = loadable(() => import('../views/user/user'), {
//     LoadingComponent: Loading,
// })
// //新闻列表页
// const News = loadable(()=> import('../views/news/news'), {
//     LoadingComponent: Loading,
// })
// //新闻详情页
// const NewsDetail = loadable(()=> import('../views/news/newsDetail'), {
//     LoadingComponent: Loading,
// })
// //文章作者的更多页面
// const NewsAuthorMore = loadable(()=> import('../views/news/authorMore'), {
//     LoadingComponent: Loading,
// })
// const Develop = loadable(() => import('../views/develop.tsx'), {
//     LoadingComponent: Loading,
// })
// const Oss = loadable(() => import('../views/ossImg.tsx'), {
//     LoadingComponent: Loading,
// })
 
 
class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Fragment>
                    {/*只匹配一个，匹配成功就不往下匹配，效率高*/}
                    <Switch>
                        <FrontendAuth routerConfig={routerMap}/>
                    </Switch>
                </Fragment>
       
                </Router>
        )
    }
}
export default IRouter