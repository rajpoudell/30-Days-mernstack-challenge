 const path = require('path');
 const multer = require('multer');

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Define storage for user images
const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const productUpload = multer({ storage: productStorage });
const userUpload = multer({ storage: userStorage });

module.exports = {
    productUpload,
    userUpload
};