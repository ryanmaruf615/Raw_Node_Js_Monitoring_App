/*
 *Title:Sample Handler
 *Description:Sample Handler
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/
//module scaffolding
const handler = {};

handler.sampleHandle = (requestProperties,callback) =>{
    console.log(requestProperties);
callback(200,{
    message : 'This is a Sample url'
});
};

module.exports = handler;