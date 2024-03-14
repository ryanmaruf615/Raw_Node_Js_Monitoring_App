/*
 *Title:user Handler
 *Description:route Handler to handle user related routes
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/

//dependencies
const data = require('../../lib/data');


//module scaffolding
const handler = {};

handler.userHandler = (requestProperties,callback) =>{
    const acceptedMethods = ['get','post','put','delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1){
            handler._users[requestProperties.method](requestProperties,callback);
    }else {
        callback(405);
    }

};

handler._users = {};

handler._users.post= (callback,requestProperties) => {

    const firstName =
        typeof (requestProperties.body.fristName) === 'string'
    && requestProperties.fristName.trim().length > 0 ?
        requestProperties.body.fristName : false;

    const lastName =
        typeof (requestProperties.body.lastName) === 'string'
    && requestProperties.lastName.trim().length > 0 ?
        requestProperties.body.lastName : false;

    const phone =
        typeof (requestProperties.body.phone) === 'string'
    && requestProperties.phone.trim().length === 11 ?
        requestProperties.body.phone : false;

    const password =
        typeof (requestProperties.body.password) === 'string'
    && requestProperties.password.trim().length > 0 ?
        requestProperties.body.password : false;

    const tosAgreement =
        typeof (requestProperties.body.tosAgreement) === 'boolean'
    && requestProperties.tosAgreement.trim().length > 0 ?
        requestProperties.body.tosAgreement : false;

    if(firstName && lastName && phone && tosAgreement){
        //make sure that the user does not already exist
        data.read('users',phone,(err,user)=>{
           if (err){
               //next step
               let userObject = {
                   firstName,
                   lastName,
                   phone,
                   tosAgreement,
               }
           }else {
               callback(500,'User Already exist');
           }
        });
    }else {
        callback(400,{
            error: 'You have a problem in your request',
        })
    }


};

handler._users.get= (requestProperties,callback) => {
    callback(200);
};

handler._users.put= (callback,requestProperties) => {

};

handler._users.delete= (callback,requestProperties) => {

};
module.exports = handler;