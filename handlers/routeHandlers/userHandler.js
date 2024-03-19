/*
 *Title:user Handler
 *Description:route Handler to handle user related routes
 *Author:Md Maruf Hossain
 * Date 08/03/2024
*/

//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const {parseJSON} = require('../../helpers/utilities');


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

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

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

    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean' &&
        requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exist
        data.read('users', phone, (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', phone, userObject, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'User was created successfully!',
                        });
                    } else {
                        callback(500, { error: 'Could not create user!' });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};


handler._users.get= (requestProperties,callback) => {
   //check the phone number is valid
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
    if(phone){
        //lookup the user
        data.read('users',phone,(err,u)=>{
            const user = {...parseJSON(u)};

            if(!err){
                delete user.password;
                callback(200,user);
            }else {
                callback(404,{
                    'error':'Requested user not found',
                });
            }
        })
    }else {
        callback(404,{
            'error':'Requested user not found',
        });
    }

};

handler._users.put= (requestProperties,callback) => {
    //checking the phone validity
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;


    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;


    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if(phone){
        if(firstName || lastName || password ){

            //lookup the user
            data.read('users',phone,(err,uData)=>{
                const userData = {...parseJSON(uData)};
                if(!err && userData){
                    if(firstName){
                        userData.firstName = firstName;
                    }if(lastName){
                        userData.lastName = lastName;
                    }if(password){
                        userData.password = hash(password);
                    }

                    //store to database
                    data.update('users',phone,userData,(err)=>{
                        if (!err){
                            callback(200,{
                                'message':'User Update successfully'
                            })
                        }else {
                            callback(500,{
                                'error':'There was a problem in server side'
                            });
                        }

                    })
                }else {
                    callback(400,{
                        'error':'You have problem in your request'
                    });
                }
            })
        }else {
            callback(400,{
                'error':'You have problem in your request'
            });
        }
    }else {
        callback(400,{
            'error':'Invalid Pone number'
        });
    }


};

handler._users.delete= (requestProperties,callback) => {
//check the phone number is valid
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
    if(phone){
        //look up the user
        data.read('users',phone,(err,u)=>{
            const userData = {...parseJSON(u)};

            if(!err && userData){
               data.delete('users',phone,(err)=>{
                   if (!err){
                       callback(200,{
                           'message':'User successfully Deleted'
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