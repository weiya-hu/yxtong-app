//@ts-nocheck
import { getUser } from "service/login";
import store from "store";
import { setUserInfo } from "store/actionCreators";
import message from 'views/component/message/index'
export const util = {
    getScrollTop : () => {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
          bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
    getScrollHeight : () => {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    getWindowHeight : () => {
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
    getIsTOBottom:()=>{
        return util.getScrollHeight() - util.getScrollTop() - util.getWindowHeight()
    },
    firstTokenUserinfo:async()=>{
        const result = await getUser()
        result.status && store.dispatch(setUserInfo(result.body))
    },
    getUrlParam:(name)=>{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substring(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    },
    //点击复制内容
    copy:(url) => {
        let copyDom = document.createElement("input");
        copyDom.setAttribute("value",url);// 获得需要复制的内容
        // copyDom.style.display = "none";//不要让他displaynone,否则复制不出来
        document.body.appendChild(copyDom); // 添加到 DOM 元素中
        copyDom.select(); // 执行选中,注意: 只有 input 和 textarea 可以执行 select() 方法.
        // let content = window.getSelection().toString();// 获得选中的内容
        document.execCommand("copy");// 执行复制命令
        document.body.removeChild(copyDom);// 将 input 元素移除
        message.info('复制成功');
    }
}