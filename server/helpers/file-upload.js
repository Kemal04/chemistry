const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if (file.fieldname === "video_img") {
            cb(null, './public/video/img/');
        }
        else if (file.fieldname === "video_file") {
            cb(null, './public/video/file/');
        }
        else if (file.fieldname === "street_qr") {
            cb(null, './public/img/street_qr/');
        }
        else if (file.fieldname === "building_qr") {
            cb(null, './public/img/building_qr/');
        }
        else if (file.fieldname === "street_img") {
            cb(null, './public/img/street/');
        }
        else if (file.fieldname === "building_img") {
            cb(null, './public/img/building/');
        }
        else if (file.fieldname === "blog_img") {
            cb(null, './public/img/blog/');
        }
        else if (file.fieldname === "audio_file") {
            cb(null, './public/audio/');
        }
     },
        
    filename: function(req, file, cb){
        cb(null, path.parse(file.fieldname).name + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).fields([
    { name: 'video_img', maxCount: 1 }, 
    { name: 'video_file', maxCount: 1 },
    { name: 'street_qr', maxCount: 1 },
    { name: 'building_qr', maxCount: 1 },
    { name: 'street_img', maxCount: 1 },
    { name: 'building_img', maxCount: 1 },
    { name: 'blog_img', maxCount: 1 },
    { name: 'audio_file', maxCount: 1 },
]);

module.exports.upload = upload;