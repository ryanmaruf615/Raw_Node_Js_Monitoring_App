/*
 *Title:Routes
 *Description:Application Routes
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/
//dependencies
const {sampleHandle} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');

const routes = {
    sample: sampleHandle,
    user: userHandler,
};
module.exports = routes;