/**
 * Created by lv on 2017/6/16.
 */
var RWebSocket = require('rwebsocket');


exports.QPSStat=function (app,option) {
    var config={
        ws:options.ws||'ws://localhost:9000/',
        interval:options.interval||600000
    };
    var client = new RWebSocket(config.ws, null, config.interval);

    if(app){
        app.use(function (req,res,next) {
            var t=new Date();
            res.on('finish',function() {
                var duration=((new Date())-t);
                //默认超过20秒向服务器发送请求
                if(duration>2000){
                    if(readyState===1){
                        var jsons=JSON.stringify({
                            "dataType":"SLOWREQ",
                            "data":{
                                "url":req.url,
                                "duration":duration
                            }
                        });
                        client.send(jsons);
                    };
                };
            });

            next();
        });
    }
    client.onopen = function () {

    };
    client.onmessage = function (event) {

    };

    client.connect();


    client.onclose=function(){

    };

    client.onerror=function () {

    };
};

