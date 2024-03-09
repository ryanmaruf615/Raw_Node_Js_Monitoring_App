/*
 *Title:Not Found Handler
 *Description:Sample Handler
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/
//module scaffolding
const handler = {};

handler.notFoundHandle = (requestProperties,callback) =>{
    callback(404,{
        message:'Your requested url not found'
    });
}

module.exports = handler;