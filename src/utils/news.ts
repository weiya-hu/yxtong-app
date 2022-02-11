//@ts-nocheck
import { getUser } from "service/login";
import store from "store";
import { setUserInfo } from "store/actionCreators";
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
    }
}