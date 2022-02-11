/**
 * 路由守卫校验
 */
 import { Divider } from "antd";
import React, {Component} from "react";
 import {Route, Redirect} from "react-router-dom";
 import store from "store";
 
 class FrontendAuth extends Component {
     // eslint-disable-next-line no-useless-constructor
     constructor(props) {
         super(props);
     }
 
     render() {
         const {routerConfig, location} = this.props;
         const {pathname} = location;
         const isLogin = store.getState().userInfo;
        //  console.log(pathname, isLogin);
        //  console.log(location);

         // 如果该路由不用进行权限校验，登录状态下登陆页除外
         // 因为登陆后，无法跳转到登陆页
         // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
         const targetRouterConfig = routerConfig.find(
             (item) => item.path === pathname
         );
        //  console.log(targetRouterConfig);
         if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
             const {component} = targetRouterConfig;
             return <Route exact path={pathname} component={component}/>;
         }
         if (isLogin) {
             // 如果是登陆状态，想要跳转到登陆，重定向到主页,但是这里的主页是另一个项目的HTML，像这样重定向页面不会跳转，所以暂时重定向到个人中心
             if (pathname === "/app/login") {
                 return <Redirect to="/app/user"/>;
             } else {
                 // 如果路由合法，就跳转到相应的路由
                 if (targetRouterConfig) {
                     return (
                         <Route path={pathname} component={targetRouterConfig.component}/>
                     );
                 } else {
                     // 如果路由不合法，重定向到 404 页面
                    return <Redirect to={pathname}/>;
                 }
             }
         } else {
             // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
             if(targetRouterConfig){                
                if(targetRouterConfig.auth){
                    return <Redirect to="/app/login"/>;
                }else{
                    <Route path={pathname} component={targetRouterConfig.component}/>
                }
             }else {
                // 如果路由不合法，重定向到 404 页面
                return <Redirect to={pathname}/>;
            }
             
         }
     }
 }
 
 export default FrontendAuth;
 
 