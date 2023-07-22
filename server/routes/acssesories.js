const express=require('express');
const router = express.Router();
const connection =require('../lib/db');
const authenticateToken= require('../middleware/authentication');
const upload = require('../middleware/fileValidation')


router.post('/acssesories',authenticateToken,upload.single('profile'),async (req,res)=>{
      try{
        if(!req.file)
        {
           return res.status(404).send({message: 'Please Upload File'});
        }
        else{
             const base_url =req.protocol+ '://'+ req.hostname + ':' + 4000;

             const profile_path=req.file.destination+ ''+req.file.filename;
             const save_path = req.file.path;
             const profile = base_url + '/'+ profile_path;
             const user_id= req.user.id;
            const file_query='UPDATE userdetails SET profile_image = ? WHERE id = ?';
            connection.query(file_query,[save_path,user_id],async (err,result)=>{
                if(err)
                {
                    return res.status(500).send({message: 'Server Error'})
 
                }
                else
                {
                    return res.status(200).send({message : 'Success' ,data : profile});
                }
            })
        }
      }
      catch(err)
      {
        return res.status(500).send({message: 'Server Error'});
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
               else{

                     const valid_array=image[0].profile_image.split("\\");
                     const image_name= valid_array[1];
                     const profile_image=req.protocol+ '://'+ req.hostname + ':' + 4000 + '/upload/' + image_name;

                    return res.status(200).send({message : 'Success' ,data : profile_image});
               }
           })
     }
     catch(err)
     {
           return res.status(500).send({message: 'Server Error'});
     }
     
})

module.exports = router;