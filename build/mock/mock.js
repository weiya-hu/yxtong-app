// var http = require('http');
// module.exports = function(req, res, next) {
//     res.charset = 'utf8';
//     res.setHeader('Content-Type', "application/json;charset=utf8");

//     var buf = '';
//     req.on('data', function(chunk) { buf += chunk; });
//     req.on('end', function() {
//         //proxy
//         var beta = 'betaa.qunar.com';
//         var options = {
//             hostname: beta,
//             port: 9000,
//             path: req.originalUrl,
//             method: req.method,
//             headers: Object.assign({}, req.headers, {
//                 'host': beta,
//                 'Origin': beta,
//                 'referer': beta,
//                 'cookie': 'xxxx' // your login cookie info here
//             })
//         };
//         //在本地请求内容接受完毕后，新建一个http.request来负责与真正提供api服务数据的服务器通信
//         var _req = http.request(options, function(_res) {
//             var data = "";
//             _res.setEncoding('utf8');
//             _res.on('data', function(chunk) { //代理响应接受到服务器数据返回
//                     data += chunk;
//                 })
//                 .on('end', function() { //提供数据服务的数据接受完毕
//                     res.end(data); // 由本地的响应实例来响应代理服务器接受到的数据内容
//                 })
//         }).on('error', function(error) {
//             res.end(); //本地响应实例返回空内容
//         });
//         _req.write(buf); //由http.request生成的请求实例来完成请求真正的提供数据服务的服务器
//         _req.end();
//     })
// }