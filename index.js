/*
 *Title:Uptime Monitoring Application
 *Description:A RESTFul API to monitor up or downtime of user defined links
 *Author:Md Maruf Hossain
 * Date 07/03/2024
*/
//dependencies
const http = require('http');
const buffer = require("buffer");
const {handleReqRes} = require('./helpers/handleReqRes');
//app object - module scaffolding
const app = {};

//configuration
app.config = {
    port:3000
};

//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`listening to port ${app.config.port}`);
    });
}

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();