(this["webpackJsonpyxt-cp-app"]=this["webpackJsonpyxt-cp-app"]||[]).push([[5],{21:function(e,n,t){"use strict";var o=t(4),r=t(8),c={userInfo:null,loginShow:!1,userNewsType:[],fileList:[]};var u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case r.e:return Object(o.a)(Object(o.a)({},e),{},{userInfo:n.userInfo});case r.c:return Object(o.a)(Object(o.a)({},e),{},{userInfo:null});case r.b:return Object(o.a)(Object(o.a)({},e),{},{loginShow:!0});case r.a:return Object(o.a)(Object(o.a)({},e),{},{loginShow:!1});case r.f:return Object(o.a)(Object(o.a)({},e),{},{userNewsType:n.newsType});case r.d:return Object(o.a)(Object(o.a)({},e),{},{fileList:n.fileList});default:return e}},a=(0,t(64).createStore)(u);n.a=a},39:function(e,n,t){"use strict";t.d(n,"a",(function(){return f}));var o=t(36),r=t(28),c=t.n(r),u=t(41),a=t(21),i=t(40),s=t(5),f={getScrollTop:function(){var e=0,n=0;return document.body&&(e=document.body.scrollTop),document.documentElement&&(n=document.documentElement.scrollTop),e-n>0?e:n},getScrollHeight:function(){var e=0,n=0;return document.body&&(e=document.body.scrollHeight),document.documentElement&&(n=document.documentElement.scrollHeight),e-n>0?e:n},getWindowHeight:function(){return"CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight},getIsTOBottom:function(){return f.getScrollHeight()-f.getScrollTop()-f.getWindowHeight()},firstTokenUserinfo:function(){var e=Object(o.a)(c.a.mark((function e(){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.g)();case 2:(n=e.sent).status&&a.a.dispatch(Object(i.e)(n.body));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getUrlParam:function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),t=window.location.search.substring(1).match(n);return null!=t?decodeURI(t[2]):null},copy:function(e){var n=document.createElement("input");n.setAttribute("value",e),document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),s.a.info("\u590d\u5236\u6210\u529f")}}},40:function(e,n,t){"use strict";t.d(n,"e",(function(){return r})),t.d(n,"c",(function(){return c})),t.d(n,"b",(function(){return u})),t.d(n,"a",(function(){return a})),t.d(n,"f",(function(){return i})),t.d(n,"d",(function(){return s}));var o=t(8),r=function(e){return{type:o.e,userInfo:e}},c=function(){return{type:o.c}},u=function(){return{type:o.b}},a=function(){return{type:o.a}},i=function(e){return{type:o.f,newsType:e}},s=function(e){return{type:o.d,fileList:e}}},41:function(e,n,t){"use strict";t.d(n,"e",(function(){return r})),t.d(n,"a",(function(){return c})),t.d(n,"k",(function(){return u})),t.d(n,"l",(function(){return a})),t.d(n,"g",(function(){return i})),t.d(n,"f",(function(){return s})),t.d(n,"h",(function(){return f})),t.d(n,"d",(function(){return d})),t.d(n,"c",(function(){return p})),t.d(n,"m",(function(){return l})),t.d(n,"j",(function(){return b})),t.d(n,"b",(function(){return m})),t.d(n,"i",(function(){return h}));var o=t(6),r=function(e){return Object(o.b)("login/login.do","user",e)},c=function(){return Object(o.a)("public/captcha.get","user")},u=function(e){return Object(o.b)("login/sms/send.do","user",e)},a=function(e){return Object(o.b)("login/regsms/send.do","user",e)},i=function(){return Object(o.a)("public/uinfo.get","user")},s=function(e){return Object(o.b)("login/register.do","user",e)},f=function(){return Object(o.a)("login/out.do","user")},d=function(e){return Object(o.b)("login/wechat/callback.do","user",e)},p=function(e){return Object(o.b)("login/wechat/bind.do","user",e)},l=function(e){return Object(o.a)("login/wechat/qrinfo.get","user",e)},b=function(e){return Object(o.b)("login/resetsms/send.do","user",e)},m=function(e){return Object(o.b)("login/resetsms/check.do","user",e)},h=function(e){return Object(o.b)("login/resetpass/modify.do","user",e)}},5:function(e,n,t){"use strict";var o,r=t(37),c=t(35),u=t(0),a=t(22),i=t(1),s=function(e){var n=e.type,t=e.text;return Object(i.jsx)("div",{className:"message ".concat(n),children:Object(i.jsx)("span",{children:t})})},f=(t(87),function(){var e=Object(u.useState)([]),n=Object(c.a)(e,2),t=n[0],a=n[1];return o=function(e){a((function(n){var t=[].concat(Object(r.a)(n),[e]);return setTimeout((function(){!function(e){var n=e.key;a((function(e){return e.filter((function(e){return n!==e.key}))}))}(e)}),1500),t}))},Object(u.useEffect)((function(){t.length>0&&t.shift()}),[t]),Object(i.jsx)(i.Fragment,{children:t.map((function(e){var n=e.text,t=e.key,o=e.type;return Object(i.jsx)(s,{type:o,text:n},t)}))})}),d=function(){return(1e3*Math.random()).toFixed()},p={info:function(e){o({text:e,key:d(),type:"info"})},success:function(e){o({text:e,key:d(),type:"success"})},warning:function(e){o({text:e,key:d(),type:"warning"})},error:function(e){o({text:e,key:d(),type:"error"})}};n.a=p;!function(){var e=document.getElementById("#message-wrap");e||((e=document.createElement("div")).className="message-wrap",e.id="message-wrap",document.body.append(e)),a.render(Object(i.jsx)(f,{}),e)}()},6:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return i}));var o=t(4),r=t(13),c=t.n(r),u=t(5);function a(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(o,r){c.a.get(e,{params:t,headers:{MODULE:n}}).then((function(e){o(e.data)})).catch((function(e){u.a.info(e),r(e)}))}))}function i(e,n,t){return new Promise((function(o,r){c.a.post(e,t,{headers:{MODULE:n}}).then((function(e){o(e.data)}),(function(e){u.a.info(e.data.message),r(e)}))}))}c.a.defaults.timeout=1e4,c.a.defaults.baseURL="/api",c.a.interceptors.request.use((function(e){return e.headers=Object(o.a)(Object(o.a)({},e.headers),{},{"Content-Type":"application/json"}),e}),(function(e){return Promise.reject(e)})),c.a.interceptors.response.use((function(e){return function(e){if(!e.data.status)switch(e.data.errno){case 10500:u.a.info("\u670d\u52a1\u5668\u672a\u77e5\u9519\u8bef");break;case 10400:u.a.info("\u9519\u8bef\u7684\u8bf7\u6c42");break;case 10403:u.a.info("\u975e\u6cd5token");break;case 10600:case 10611:u.a.info(e.data.message);break;case 10620:u.a.info("\u8eab\u4efd\u8ba4\u8bc1\u5931\u8d25"),"/app/user"===window.location.pathname&&(window.location.href="/app/login?url="+encodeURIComponent(window.location.pathname+window.location.search));break;case 10621:u.a.info("\u672a\u6388\u6743");break;case 10622:u.a.info("\u7528\u6237\u672a\u627e\u5230");break;case 10623:u.a.info("\u7528\u6237\u5df2\u7981\u7528");break;case 10624:u.a.info("\u5bc6\u7801\u9519\u8bef");break;case 10625:u.a.info("\u7528\u6237\u7ed1\u5b9a\u5931\u8d25")}}(e),e}),(function(e){console.log("\u8bf7\u6c42\u51fa\u9519\uff1a",e),u.a.info(e)}))},62:function(e,n,t){},8:function(e,n,t){"use strict";t.d(n,"e",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"b",(function(){return c})),t.d(n,"a",(function(){return u})),t.d(n,"f",(function(){return a})),t.d(n,"d",(function(){return i}));var o="SetUserInfo",r="RemoveUserInfo",c="LoginShow",u="LoginRemove",a="SetUserNewsType",i="SetFileList"},87:function(e,n,t){},89:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),c=t(22),u=t.n(c),a=(t(62),t(17)),i=t(18),s=t(19),f=t(20),d=t(7),p=t(29),l=t(2),b=t(21),m=t(1),h=function(e){Object(s.a)(t,e);var n=Object(f.a)(t);function t(e){return Object(a.a)(this,t),n.call(this,e)}return Object(i.a)(t,[{key:"render",value:function(){var e=this.props,n=e.routerConfig,t=e.location.pathname,o=b.a.getState().userInfo,r=n.find((function(e){return e.path===t}));if(r&&!r.auth&&!o){var c=r.component;return Object(m.jsx)(l.b,{exact:!0,path:t,component:c})}return o?"/app/login"===t?Object(m.jsx)(l.a,{to:"/app/user"}):r?Object(m.jsx)(l.b,{path:t,component:r.component}):Object(m.jsx)(l.a,{to:t}):r?r.auth?Object(m.jsx)(l.a,{to:"/app/login"}):(l.b,void r.component):Object(m.jsx)(l.a,{to:t})}}]),t}(o.Component),g=function(){return Object(m.jsx)("div",{children:"Loading..."})},j=(Object(d.a)((function(){return Promise.all([t.e(0),t.e(1),t.e(4),t.e(16)]).then(t.bind(null,368))}),{LoadingComponent:g}),Object(d.a)((function(){return Promise.all([t.e(0),t.e(1),t.e(4),t.e(14)]).then(t.bind(null,382))}),{LoadingComponent:g})),O=Object(d.a)((function(){return Promise.all([t.e(0),t.e(13)]).then(t.bind(null,369))}),{LoadingComponent:g}),y=[{path:"/app/user",name:"User",component:Object(d.a)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(8)]).then(t.bind(null,377))}),{LoadingComponent:g}),auth:!0},{path:"/app/login",name:"Login",component:j},{path:"/app/register/register",name:"Register",component:O},{path:"/app/register/forget",name:"Register",component:O},{path:"/app/news",name:"News",component:Object(d.a)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(10)]).then(t.bind(null,381))}),{LoadingComponent:g})},{path:"/app/newsdetail",name:"NewsDetail",component:Object(d.a)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(9)]).then(t.bind(null,379))}),{LoadingComponent:g})},{path:"/app/newsauthormore",name:"NewsAuthorMore",component:Object(d.a)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(11)]).then(t.bind(null,370))}),{LoadingComponent:g})},{path:"/app/wechat/callback.do",name:"otherLogin",component:Object(d.a)((function(){return t.e(18).then(t.bind(null,371))}),{LoadingComponent:g})},{path:"/app/bindphone",name:"phoneBindLogin",component:Object(d.a)((function(){return Promise.all([t.e(0),t.e(12)]).then(t.bind(null,372))}),{LoadingComponent:g})},{path:"/app/useragreement",name:"userAgreement",component:Object(d.a)((function(){return t.e(19).then(t.bind(null,373))}),{LoadingComponent:g})},{path:"/app/user/articledetail",name:"ArticleDetailh5",component:Object(d.a)((function(){return Promise.all([t.e(2),t.e(17)]).then(t.bind(null,374))}),{LoadingComponent:g})},{path:"/app/user/posterdetail",name:"PosterShareh5",component:Object(d.a)((function(){return t.e(15).then(t.bind(null,375))}),{LoadingComponent:g})}],w=function(e){Object(s.a)(t,e);var n=Object(f.a)(t);function t(){return Object(a.a)(this,t),n.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){return Object(m.jsx)(p.a,{children:Object(m.jsx)(o.Fragment,{children:Object(m.jsx)(l.d,{children:Object(m.jsx)(h,{routerConfig:y})})})})}}]),t}(r.a.Component),v=w,x=function(e){e&&e instanceof Function&&t.e(20).then(t.bind(null,376)).then((function(n){var t=n.getCLS,o=n.getFID,r=n.getFCP,c=n.getLCP,u=n.getTTFB;t(e),o(e),r(e),c(e),u(e)}))},k=t(39);t(88);k.a.firstTokenUserinfo().then((function(){u.a.render(Object(m.jsx)(v,{}),document.getElementById("root"))})),x()}},[[89,6,7]]]);
//# sourceMappingURL=main.790186d1.chunk.js.map