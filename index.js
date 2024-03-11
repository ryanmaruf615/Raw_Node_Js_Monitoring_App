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
const environment = require('./helpers/environment');
const data = require('./lib/data')

//app object - module scaffolding
const app = {};

//testing file
// data.create('test','newFile', {name:'Maruf',language:'Deutsch'},function (err){
//     console.log('error was' , err);
// });

// data.delete('test','newFile',(err)=> {
//     console.log(err);
// });



//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{

        console.log(`listening to port ${environment.port}`);
    });
}

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();