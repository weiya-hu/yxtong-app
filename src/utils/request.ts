/**
 * 网络请求配置
 */
 import axios from "axios";
 import message from '../views/component/message/index'
import { AxisPointerComponent } from "echarts/components";

 axios.defaults.timeout = 10000;
 axios.defaults.baseURL = "/api";


 
 /**
  * http request 拦截器
  */
 axios.interceptors.request.use(
   (config) => {   

    //  config.data = JSON.stringify(config.data);
      config.headers = {
        "Content-Type": "application/json"
      };
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );
 
 /**
  * http response 拦截器
  */
 axios.interceptors.response.use(
   (response) => {
    errnoMsg(response)
    //  if (response.data.errno === 10620) {
    //    console.log("登录状态过期");
    //    let url = window.location.pathname==='/app/login'?'/app/login':'/app/login?url='+window.location.pathname
    //    window.location.href=url
    //    message.info('登录状态过期，请再次登录')
    //  }
    //  if(response.data.errno === 10403){
    //     message.info('非法token')
        
    //  }
     return response;
   },
   (error) => {
     console.log("请求出错：", error);
     message.info( error)
   }
 );
 
 /**
  * 封装get方法
  * @param url  请求url
  * @param params  请求参数
  * @returns {Promise}
  */
 export function get(url, params = {}) {
   return new Promise<API.IResult>((resolve, reject) => {
     axios.get(url, {
         params: params,
       }).then((response) => {
         resolve(response.data);
       })
       .catch((error) => {
        message.info(error)
         reject(error);
       });
   });
 }
 
 /**
  * 封装post请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 
 export function post(url, data) {
   return new Promise<API.IResult>((resolve, reject) => {
     axios.post(url, data).then(
       (response) => {
         //关闭进度条
         resolve(response.data);
       },
       (err) => {
        message.info(err.data.message)
         reject(err);
       }
     );
   });
 }
 
 /**
  * 封装patch请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 export function patch(url, data = {}) {
   return new Promise((resolve, reject) => {
     axios.patch(url, data).then(
       (response) => {
         resolve(response.data);
       },
       (err) => {
         msag(err);
         reject(err);
       }
     );
   });
 }
 
 /**
  * 封装put请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 
 export function put(url, data = {}) {
   return new Promise((resolve, reject) => {
     axios.put(url, data).then(
       (response) => {
         resolve(response.data);
       },
       (err) => {
         msag(err);
         reject(err);
       }
     );
   });
 }
 
 //统一接口处理，返回数据
 export default function (fecth, url, param) {
   let _data = "";
   return new Promise((resolve, reject) => {
     switch (fecth) {
       case "get":
         console.log("begin a get request,and url:", url);
         get(url, param)
           .then(function (response) {
             resolve(response);
           })
           .catch(function (error) {
             console.log("get request GET failed.", error);
             reject(error);
           });
         break;
       case "post":
         post(url, param)
           .then(function (response) {
             resolve(response);
           })
           .catch(function (error) {
             console.log("get request POST failed.", error);
             reject(error);
           });
         break;
       default:
         break;
     }
   });
 }
 //统一接口status为0，errno的不同值做处理
 function errnoMsg(res){
   if(!res.data.status){
     switch(res.data.errno){
       case 10500: message.info('服务器未知错误');break;
       case 10400: message.info('错误的请求');break;
       case 10403: message.info('非法token');break;
       case 10600: message.info('业务异常');break;
      //  case 10610: message.info('参数校验失败');break;
       case 10611: message.info('参数转换失败');break;
       case 10620: 
         message.info('身份认证失败');
          window.location.pathname==='/app/user' && (window.location.href='/app/login?url='+window.location.pathname)
        break;
       case 10621: message.info('未授权');break;
       case 10622: message.info('用户未找到');break;
       case 10623: message.info('用户已禁用');break;
       case 10624: message.info('密码错误');break;
       case 10625: message.info('用户绑定失败');
     }
   }
 }
 //失败提示
 function msag(err) {
   if (err && err.response) {
     switch (err.response.status) {
       case 400:
         alert(err.response.data.error.details);
         break;
       case 401:
         alert("未授权，请登录");
         break;
 
       case 403:
         alert("拒绝访问");
         break;
 
       case 404:
         alert("请求地址出错");
         break;
 
       case 408:
         alert("请求超时");
         break;
 
       case 500:
         alert("服务器内部错误");
         break;
 
       case 501:
         alert("服务未实现");
         break;
 
       case 502:
         alert("网关错误");
         break;
 
       case 503:
         alert("服务不可用");
         break;
 
       case 504:
         alert("网关超时");
         break;
 
       case 505:
         alert("HTTP版本不受支持");
     }
   }
 }
 
 /**
  * 查看返回的数据
  * @param url
  * @param params
  * @param data
  */
 function landing(url, params, data) {
   console.log(url)
   if (data.code === -1) {
   }
 }
 
 