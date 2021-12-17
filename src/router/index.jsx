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
const News = loadable(()=> import('../views/news/news'))
 
 
class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/user" exact component={User} />
                    <Route path="/news" component={News} />
                    <Route path="/" exact component={Home} />
 
                    {/* 404页面 */}
                    <Route path="*" component={NotFound} />
                </Switch>
 
            </Router>
        )
    }
}
export default IRouter