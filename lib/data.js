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
};

//read Data From File
lib.read= (dir,file,callback) => {
    fs.readFile(`${lib.basedir+dir}/${file}.json`,
        'utf-8' ,(err,data)=>{
        callback(err,data);
        });
};

//update existing File
lib.update=(dir,file,data,callback)=>{
    //file open for writing
    fs.open(`${lib.basedir+dir}/${file}.json`,'r+',
        (err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            //convert the data to String
            const stringDate = JSON.stringify(data);

            //truncate the file
            fs.ftruncate(fileDescriptor,(err)=>{
               if (!err){
                   //write to the file and close it
                   fs.writeFile(fileDescriptor,stringDate,
                       (err)=>{
                            if(!err){
                                //close the file
                                fs.close(fileDescriptor,(err)=>{
                                    if (!err){
                                        callback(false);
                                    }else{
                                        callback('Error closing File');
                                    }
                                })
                            }else {
                                callback('Error writing to file')
                            }
                   })
               } else {
                    callback('Error truncating file')
               }
            });
        }else {
            console.log(`Error updating File may not Exist`);
        }
        })
};

//Delete Existing File
lib.delete=(dir,file,callback)=>{
    fs.unlink(`${lib.basedir+dir}/${file}.json`,
        (err)=>{
        if(!err){
            callback(false);
        }else {
           callback('Deleting File Error');
        }
    });
};

module.exports = lib;