//dependencies
const fs = require('fs');
const path = require('path');

const lib = {};


//base directory of the data folder
lib.basedir = path.join(__dirname,'/../.data/');

//write data to file
lib.create = function (dir,file,data,callback){
    //open file for writing
    fs.open(`${lib.basedir+dir}/${file}.json`,'w',
        function (err,fileDescriptor) {
        if(!err && fileDescriptor)
        {
            //convert data to string
            const  stringData = JSON.stringify(data);

            //write data to file and close it
            fs.writeFile(fileDescriptor,stringData,function (err) {
                if(!err){
                    fs.close(fileDescriptor,function (err) {
                        if (!err){
                            callback(false);
                        }else {
                            callback("Error closing the new file")
                        }
                    })
                }else {
                    callback('Error writing to new file');
                }
            })

        }else {
            callback('could not create new file ,it may already exists' +err)
        }
    })
}

module.exports = lib;