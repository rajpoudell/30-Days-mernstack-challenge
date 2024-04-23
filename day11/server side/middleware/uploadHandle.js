 const path = require('path');
 const multer = require('multer');

 const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    }, 
    filename: function (req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)

    }
 });

 const upload = multer({ 
    storage: storage
}); // Specify the field name for the file

 module.exports = upload;