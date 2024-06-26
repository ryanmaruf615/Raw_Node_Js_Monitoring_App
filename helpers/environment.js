/*
 *Title:Environments
 *Description:Handle all environment related things
 *Author:Md Maruf Hossain
 * Date 10/03/2024
*/
//dependencies

//module scaffolding
const environments = {};

environments.staging={
    port:3000,
    envName : 'staging',
    secretKey:'mouamarbou',
    maxChecks : 5 ,
}

environments.production={
    port:5000,
    envName : 'production',
    secretKey:'mouamarbou',
    maxChecks : 5
}

//determine which environment was passed
const currentEnvironment =
    typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

//export corresponding environment object
const enviornmentToExport = typeof (environments[currentEnvironment]) === 'object' ?
    environments[currentEnvironment] : environments.staging;
//export module
module.exports= enviornmentToExport;