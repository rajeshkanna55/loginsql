const express=require('express');
const router = express.Router();
const connection =require('../lib/db');
const authenticateToken= require('../middleware/authentication');
const upload = require('../middleware/fileValidation');
const product = require('../middleware/productFileValidarion');
const { product_upload, getall_products, addtocart, getMyCarts } = require('../controllers/product_upload');


router.post('/profile',authenticateToken,upload.single('profile'),async (req,res)=>{
      try{
             const base_url =req.protocol+ '://'+ req.hostname + ':' + 4000;
             const profile_path=req.file.destination+ ''+req.file.filename;
             const save_path = req.file.path;
             const profile = base_url + '/'+ profile_path;
             const user_id= req.user.id;
            const file_query='UPDATE register SET profile_image = ? WHERE id = ?';
            connection.query(file_query,[save_path,user_id],async (err,result)=>{
                if(err)
                {
                    return res.status(500).send({message: err.message});
                }
                else
                {
                    return res.status(200).send({message : 'Success' ,data : profile});
                }
            })
        
      }
      catch(err)
      {
        return res.status(500).send({message: err.message});
      }
});

router.get('/acssesories/getuser',authenticateToken,async (req,res)=>{
         
     try{
           const id= req.user.id;
           const image_query = 'SELECT profile_image FROM userdetails WHERE id = ?';
           connection.query(image_query,[id],async (err,image)=>{
               if(err)
               {
                return res.status(500).send({message: 'Server Error'});
               }
               else if(image[0].profile_image !== null){
                     const valid_array=image[0].profile_image.split("\\");
                     const image_name= valid_array[1];
                     const profile_image=req.protocol+ '://'+ req.hostname + ':' + 4000 + '/upload/' + image_name;
                    return res.status(200).send({message : 'Success' ,data : profile_image});
               }
               else{
                   return res.status(200).send({message : 'Success' ,data : null });
               }    
           });
     }
     catch(err)
     {
           return res.status(500).send({message: 'Server Error'});
     }
     
});

router.post('/acssesories',authenticateToken,product.single('acssesories'),product_upload);
router.get('/acssesories/getall',authenticateToken,getall_products);
router.post('/addcart',authenticateToken,addtocart);
router.get('/mycarts',authenticateToken,getMyCarts);
module.exports = router;