const multer = require('multer');
const path = require('path')
const fileUpload=(req,file,cb)=>{
    try
    {
        const dest='upload/';
          cb(null,dest)
    }
    catch(err)
    {
        console.log(err)
    }
}

const fileFilter=(req,file,cb)=>{
        if(file.mimetype === 'image/png' || 'image/jpeg' || 'image/jpg')
        {
            cb(null,true)
        }
        else{
            return cb(new Error('Only images (jpg, png) are allowed!'), false);
        }
}

const storage = multer.diskStorage({
    destination: fileUpload,
      filename: function (req, file, cb) {
       
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
      },
})

const upload = multer({
    storage:storage,
    fileFilter: fileFilter,
    limits :{
        fileSize: 2 * 1024 * 1024,
    },
 });

module.exports = upload


