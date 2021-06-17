const s3FolderUpload = require("s3-folder-upload");
const fs = require("fs");
const path = require("path");

function filewalker(dir, done) {
  let results = [];

  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          //   results.push(file);
          filewalker(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);

          if (!--pending) done(null, results);
        }
      });
    });
  });
}


exports.upload = () => {
  const directoryName = "client/dist";
  // I strongly recommend to save your credentials on a JSON or ENV variables, or command line args
  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_PUBLIC,
    secretAccessKey: process.env.AWS_ACCESS_PRIVATE,
    region: "us-east-1",
    bucket: process.env.AWS_BUCKET,
  };
  filewalker("./client/dist", function (err, data) {
    if (err) {
      throw err;
    }
    
    // console.log(data)
    let fileOptions = {
    }
    data.map(row => {
      if (String(row).indexOf(".gz.")!=-1){
        fileOptions[row.split("/client/dist/")[1]]={
          "ContentEncoding":'gzip'
        }
      }
      // return row.split("/client/build/")[1];
    })
    const options = {
      useFoldersForFileTypes: false,
      useIAMRoleCredentials: false,
      filesOptions:fileOptions
    };
    // console.log(options)

    // optional cloudfront invalidation rule
    const invalidation = {};
  
    s3FolderUpload(directoryName, credentials, options, invalidation,fileOptions);
  })
  // optional options to be passed as parameter to the method
  
};
