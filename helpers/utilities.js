/*
 *Title:Utilities
 *Description:Important Utility Functions
 *Author:Md Maruf Hossain
 * Date 10/03/2024
*/
//dependencies
const environment = require('../helpers/environment');
//module scaffolding
const crypto = require('crypto');
const utilities = {};


//parse JSON string to object
utilities.parseJSON=(jsonString)=>{
    let output ;

    try{
        output = JSON.parse(jsonString);
    }catch{
        output = {};
    }
    return output;
};

//hash the password
utilities.hash=(str)=>{
   if (typeof(str) === 'string' && str.length > 0 ){
       let hash =
           crypto.createHash("sha256",environment.secretKey)
           .update(str)
           .digest("hex");
       return hash;
   }else {
       return false;
   }
};

//create random string
utilities.createRandomString=(strlength)=>{
    let length = strlength;
    length = typeof (strlength) === 'number' && strlength > 0 ? strlength : false;
    if (length){
            let possibleCharacter = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let output = '';
            for(let i = 1 ; i<= length; i+=1){
                let randomCharacter =
                    possibleCharacter.charAt(Math.floor(Math.random()* possibleCharacter.length));
                    output+= randomCharacter;
            }
            return output;
    }else {
        return false;
    }

};


//export module
module.exports= utilities;