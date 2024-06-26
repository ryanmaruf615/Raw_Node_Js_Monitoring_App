/*
 *Title:Handle Request Response
 *Description:Handle Request Response
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/
//dependencies
const url = require('url');
const {StringDecoder} =require('string_decoder');
const routes = require('../routes');
const {notFoundHandle} = require('../handlers/routeHandlers/notFoundHandler');
const {parseJSON} = require('../helpers/utilities');


//module scaffolding
const handler = {};

handler.handleReqRes = (req,res) =>{
    //Request handle
    //get the url and parse it
    const parseUrl = url.parse(req.url,true);
    const path =parseUrl.pathname;
    const trimmedPath =path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryString = parseUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryString,
        headersObject,

    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandle;

    req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
    });

    req.on('end',()=>{
            realData += decoder.end();
            requestProperties.body=parseJSON(realData);

            chosenHandler(requestProperties,(statusCode,payload) => {
            statusCode = typeof (statusCode) === 'number' ? statusCode:500;
            payload = typeof(payload) === 'object' ? payload : {};
            const payLoadString = JSON.stringify(payload);
            //return the final object
            res.setHeader('content-type','application/json')
            res.writeHead(statusCode);
            res.end(payLoadString);
        });
    });

}
module.exports = handler;