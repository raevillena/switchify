//initialize http server
var http = require('http');
var url = require('url');

//initialize mqtt server
var mqtt = require('mqtt')
var client = mqtt.connect(require('./creds.json'))

//list of registered topics
var topics = require('./topics.json')

//import device names
var devname = require('./devname.json')

//on connect, subscribe to topics
client.on('connect', function () {
    client.subscribe(topics.dev1)
    client.subscribe(topics.dev2)
    client.subscribe(topics.dev3)
    client.subscribe(topics.dev4)
    client.subscribe(topics.dev5)
})

//on connect subscribe to topics for feedback payload
client.on('message', function (topic, message) {
    switch (topic) {
        case topic.dev1:
            console.log(message.toString())
            break
        case topic.dev2:
            console.log(message.toString())
            break
        case topic.dev3:
            console.log(message.toString())
            break
        case topic.dev4:
            console.log(message.toString())
            break
        case topic.dev5:
            console.log(message.toString())
            break
    }
})


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    //get parameters
    var queryData = url.parse(request.url, true).query;
    response.writeHead(200, { "Content-Type": "text/plain" });

    if (queryData.devID) {
        response.end(queryData.action);
    }

    //in case of an available query set to something like this
    switch (queryData.devID) {
        case devname.dev1:
            if (queryData.action == 'on' || queryData.action == '1') {
                client.publish(topics.dev1, '1',[retain:true])
            } else if (queryData.action == 'off' || queryData.action == '0') {
                client.publish(topics.dev1, '0',[retain:true])
            } else {
                //do nothing
            }
            break;
        case devname.dev2:
            if (queryData.action == 'on' || queryData.action == '1') {
                client.publish(topics.dev2, '1',[retain:true])
            } else if (queryData.action == 'off' || queryData.action == '0') {
                client.publish(topics.dev2, '0',[retain:true])
            } else {
                //do nothing
            }
            break;
        case devname.dev3:
            if (queryData.action == 'on' || queryData.action == '1') {
                client.publish(topics.dev3, '1',[retain:true])
            } else if (queryData.action == 'off' || queryData.action == '0') {
                client.publish(topics.dev3, '0',[retain:true])
            } else {
                //do nothing
            }
            break;
        case devname.dev4:
            if (queryData.action == 'on' || queryData.action == '1') {
                client.publish(topics.dev4, '1',[retain:true])
            } else if (queryData.action == 'off' || queryData.action == '0') {
                client.publish(topics.dev4, '0',[retain:true])
            } else {
                //do nothing
            }
            break;
        case devname.dev5:
            if (queryData.action == 'on' || queryData.action == '1') {
                client.publish(topics.dev5, '1',[retain:true])
            } else if (queryData.action == 'off' || queryData.action == '0') {
                client.publish(topics.dev5, '0',[retain:true])
            } else {
                //do nothing
            }
            break;
    }
});

//finally start http server and accept commands
server.listen(8000, () => {
    console.log("Server Started at localhost port 8000")
});
