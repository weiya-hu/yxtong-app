(this["webpackJsonpyxt-cp-app"]=this["webpackJsonpyxt-cp-app"]||[]).push([[17],{100:function(t,n,e){"use strict";e.d(n,"A",(function(){return c})),e.d(n,"f",(function(){return u})),e.d(n,"s",(function(){return i})),e.d(n,"h",(function(){return o})),e.d(n,"B",(function(){return a})),e.d(n,"b",(function(){return s})),e.d(n,"y",(function(){return d})),e.d(n,"j",(function(){return f})),e.d(n,"k",(function(){return l})),e.d(n,"c",(function(){return b})),e.d(n,"e",(function(){return j})),e.d(n,"d",(function(){return m})),e.d(n,"r",(function(){return p})),e.d(n,"t",(function(){return O})),e.d(n,"a",(function(){return g})),e.d(n,"g",(function(){return h})),e.d(n,"z",(function(){return v})),e.d(n,"i",(function(){return y})),e.d(n,"u",(function(){return w})),e.d(n,"v",(function(){return x})),e.d(n,"w",(function(){return k})),e.d(n,"x",(function(){return N})),e.d(n,"l",(function(){return D})),e.d(n,"n",(function(){return P})),e.d(n,"o",(function(){return _})),e.d(n,"m",(function(){return C})),e.d(n,"p",(function(){return M})),e.d(n,"q",(function(){return Y}));var r=e(5),c=function(){return Object(r.a)("user/public/uinfo.get")},u=function(t){return Object(r.b)("user/center/integral/record.page",t)},i=function(){return Object(r.b)("user/singin.do",{})},o=function(){return Object(r.a)("user/singin/today.get")},a=function(){return Object(r.a)("user/tasks.list")},s=function(t){return Object(r.a)("news/creation/article.page",t)},d=function(t){return Object(r.a)("user/upload.sign",t)},f=function(t){return Object(r.b)("news/creation/article/publish.do",t)},l=function(t){return Object(r.b)("news/creation/article.in",t)},b=function(){return Object(r.a)("company/relation/audit.get")},j=function(){return Object(r.a)("dim/industry.list")},m=function(){return Object(r.a)("dim/geo.list")},p=function(t){return Object(r.b)("company/authentication.in",t)},O=function(t){return Object(r.b)("company/authenticate.do",t)},g=function(t){return Object(r.b)("company/code/check.do",t)},h=function(t){return Object(r.a)("user/center/integral/today.get",t)},v=function(t){return Object(r.a)("user/team/fans.list",t)},y=function(){return Object(r.a)("user/public/member.list")},w=function(){return Object(r.a)("user/team/count.get")},x=function(){return Object(r.a)("user/team/direct/recommend/count.get")},k=function(){return Object(r.a)("user/team/indirect/recommend/count.get")},N=function(t){return Object(r.a)("user/team/recommend.list",t)},D=function(t){return Object(r.a)("user/promote/article.get",t)},P=function(t){return Object(r.a)("user/public/promote/article.get",t)},_=function(){return Object(r.a)("dim/promote/industry.list")},C=function(t){return Object(r.a)("user/promote/article.page",t)},M=function(t){return Object(r.a)("user/promote/integral/record.page",t)},Y=function(t){return Object(r.a)("user/promote/poster.page",t)}},170:function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},375:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return p}));var r=e(36),c=e(17),u=e(18),i=e(19),o=e(20),a=e(28),s=e.n(a),d=e(0),f=e(100),l=e(39),b=e(102),j=e.n(b),m=e(1),p=function(t){Object(i.a)(e,t);var n=Object(o.a)(e);function e(){var t;Object(c.a)(this,e);for(var u=arguments.length,i=new Array(u),o=0;o<u;o++)i[o]=arguments[o];return(t=n.call.apply(n,[this].concat(i))).state={newsDetail:{}},t.getContent=Object(r.a)(s.a.mark((function n(){var e,r;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=l.a.getUrlParam("articleId"),n.next=3,Object(f.n)({id:e});case 3:(r=n.sent).status&&t.setState({newsDetail:r.body});case 5:case"end":return n.stop()}}),n)}))),t.toLogin=function(){var t=l.a.getUrlParam("invite_code");window.location.href="/app/login?invite_code="+t},t}return Object(u.a)(e,[{key:"componentDidMount",value:function(){this.getContent(),document.body.style.overflow="hidden"}},{key:"render",value:function(){var t=this.state.newsDetail;return Object(m.jsxs)("div",{id:"article-detail-h5",children:[Object(m.jsx)("div",{className:"title",children:t.title}),Object(m.jsxs)("div",{className:"flexb article-detail-info",children:[Object(m.jsxs)("div",{className:"from",children:["\u6765\u6e90\uff1a",t.creator_name]}),Object(m.jsxs)("div",{className:"from",children:["\u53d1\u5e03\u65e5\u671f\uff1a",j()(t.update_time).format("YYYY\u5e74MM\u6708DD\u65e5")]})]}),Object(m.jsx)("div",{dangerouslySetInnerHTML:{__html:t.content},className:"news-content"}),Object(m.jsx)("div",{className:"foot-more fleximg",children:Object(m.jsx)("div",{className:"fleximg",onClick:this.toLogin,children:"\u67e5\u770b\u66f4\u591a"})})]})}}]),e}(d.Component)}}]);
//# sourceMappingURL=17.bdb9dd39.chunk.js.map