/*
 *Title:Routes
 *Description:Application Routes
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/
//dependencies
const {sampleHandle} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');
const {tokenHandler} = require('./handlers/routeHandlers/tokenHandler');

const routes = {
    sample: sampleHandle,
    user: userHandler,
    token:tokenHandler
};
module.exports = routes;