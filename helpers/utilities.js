/*
 *Title:Utilities
 *Description:Important Utility Functions
 *Author:Md Maruf Hossain
 * Date 10/03/2024
*/
//dependencies

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
       let hash = crypto.createHash("sha256","password")
           .update(str)
           .digest("hex");
   }
};

//export module
module.exports= utilities;