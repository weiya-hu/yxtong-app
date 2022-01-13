import React from 'react'
import loadable from 'loadable-components'     //npm i loadable-components 用作解决路由懒加载
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from '../views/notFound'
 
const Loading = () => <div>Loading...</div>
 
const Home = loadable(() => import('../views/home'), {
    LoadingComponent: Loading,
})
const Login = loadable(() => import('../views/login/login'), {
    LoadingComponent: Loading,
})

const Register = loadable(() => import('../views/login/register'), {
    LoadingComponent: Loading,
})

const User = loadable(() => import('../views/user/user'), {
    LoadingComponent: Loading,
})
//新闻列表页
const News = loadable(()=> import('../views/news/news'), {
    LoadingComponent: Loading,
})
//新闻详情页
const NewsDetail = loadable(()=> import('../views/news/newsDetail'), {
    LoadingComponent: Loading,
})
//文章作者的更多页面
const NewsAuthorMore = loadable(()=> import('../views/news/authorMore'), {
    LoadingComponent: Loading,
})
const Develop = loadable(() => import('../views/develop.tsx'), {
    LoadingComponent: Loading,
})
 
 
class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/app/login" component={Login} />
                        <Route path="/app/register/:name" component={Register} />
                        <Route path="/app/user" exact component={User} />
                        <Route path="/app/news" component={News} />
                        <Route path="/app/newsdetail" component={NewsDetail} />
                        <Route path="/app/newsauthormore" component={NewsAuthorMore} />
                        <Route extra path="/app" exact component={Home} />
                        {/* 开发中 */}
                        <Route path="/app/develop" component={Develop} />
                        {/* 404页面 */}
                        <Route path="*" component={NotFound} />
                        
                    </Switch>
    
                </Router>
                </div>
        )
    }
}
export default IRouter