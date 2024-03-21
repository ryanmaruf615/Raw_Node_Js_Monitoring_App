/*
 *Title:Token Handler
 *Description:route Handler to Token related routes
 *Author:Md Maruf Hossain
 * Date 19/03/2024
*/

//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const {createRandomString} = require('../../helpers/utilities');
 const {parseJSON} = require('../../helpers/utilities');


//module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties,callback) =>{
    const acceptedMethods = ['get','post','put','delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1){
        handler._token[requestProperties.method](requestProperties,callback);
    }else {
        callback(405);
    }

};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phone && password){
        data.read('users',phone,(err,userData)=>{
           let hashedPassword = hash(password);
           if(hashedPassword === parseJSON(userData).password){
               let tokenId = createRandomString(20);
               let expires = Date.now()+ 60 * 60 * 1000;
               let tokenObject = {
                   phone,
                   'id': tokenId,
                   expires
               };

               //store the token
               data.create('tokens',tokenId,tokenObject,(err2)=>{
                    if (!err2){
                        callback(200,tokenObject);
                    }else {
                        callback(400, {
                            error: 'There is a problem in the server side!',
                        });
                    }
               });
           }else {
               callback(400, {
                   error: 'Password not valid!',
               });
           }
        });
    }else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._token.get= (requestProperties,callback) => {
//check the phone number is valid
    const id =
        typeof requestProperties.queryString.id === 'string' &&
        requestProperties.queryString.id.trim().length === 20
            ? requestProperties.queryString.id
            : false;
    if(id){
        //lookup the token
        data.read('tokens',id,(err,tokenData)=>{
            const token = {...parseJSON(tokenData)};

            if(!err && token){
                callback(200,token);
            }else {
                callback(404,{
                    'error':'Requested token not found',
                });
            }
        })
    }else {
        callback(404,{
            'error':'Requested token not found',
        });
    }
};

handler._token.put= (requestProperties,callback) => {
    const id =
        typeof requestProperties.body.id === 'string' &&
        requestProperties.body.id.trim().length === 20
            ? requestProperties.body.id
            : false;
    const extend =
        typeof requestProperties.body.extend === 'boolean' &&
        requestProperties.body.extend === true ? true : false;

    if (id && extend){
        data.read('tokens',id,(err,tokenData)=>{
            let tokenObject = parseJSON(tokenData)

            if (tokenObject.expires > Date.now()){
                tokenObject.expires = Date.now() + 60*60*1000;
                //store the updated token
                data.update('tokens',id,tokenObject,(err2)=>{
                    if (!err2){
                        callback(200);
                    }else {
                        callback(400, {
                            error: 'There is a server side error',
                        });
                    }
                })
            }else {
                callback(400, {
                    error: 'Token Already Expired',
                });
            }
        });
    }else {
        callback(400, {
            error: 'There was a problem in your request',
        });
    }

};

handler._token.delete= (requestProperties,callback) => {
//check the token number is valid
    const id =
        typeof requestProperties.queryString.id === 'string' &&
        requestProperties.queryString.id.trim().length === 20
            ? requestProperties.queryString.id
            : false;
    if(id){
        //look up the user
        data.read('tokens',id,(err,tokenData)=>{
            const token = {...parseJSON(tokenData)};

            if(!err && token){
                data.delete('tokens',id,(err)=>{
                    if (!err){
                        callback(200,{
                            'message':'Token successfully Deleted'
                        });
                    }else {
                        callback(500,{
                            'error':'There is a server side error',
                        });
                    }
                });

            }else {
                callback(500,{
                    'error':'There is a server side error',
                });
            }
        })
    }else {
        callback(400,{
            'error':'There is a problem in your request'
        })
    }
};
module.exports = handler;