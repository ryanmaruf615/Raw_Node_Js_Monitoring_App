/*
 *Title:Handle Request Response
 *Description:Handle Request Response
 *Author:Md Maruf Hossain
 * Date 07/03/2024
*/
//dependencies
const url = require('url');
const {StringDecoder} =require('string_decoder');

//module scaffolding
const handler = {};

handler.handleReqRes = (req,res) =>{
    //Request handle
    //get the url and parse it
    const parseUrl = url.parse(req.url,true);
    const path =parseUrl.pathname;
    const trimedPath =path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryString = parseUrl.query;
    const headerObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
    });
    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData);
        //Response handle
        res.end('Hello world');
    });
}
module.exports = handler;