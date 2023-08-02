var express=require('express');
var app = express();
var connection=require("./lib/db");
const body=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcrypt');
const router = require('./routes/profile');
const router1 = require ('./routes/acssesories')
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authentication');
require('dotenv/config');
var port=4000;
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(cors());
app.post('/registration',async(req,res)=>{
  const { name,email,password } = req.body;
  const salt =await bcrypt.genSalt(10);
  const passWord = await bcrypt.hash(password, salt);
  var check = "SELECT email FROM register WHERE email= ?";
  connection.query(check,[email],(err,result)=>{
      
       if(err){

            return  res.status(500).send({message: "something went wrong" ,error : err.message});
       }
       else if(result.length!==0){
         return  res.status(400).send({message: "Exist",data: result});
          
       }
       else{
        const query = 'INSERT INTO register (username, email, password) VALUES (?,?,?)';
        connection.query(query,[name,email,passWord],function (err, result) {
          if (err) 
          {
             return  res.status(500).send({message: "database connection lost"})
          }
          else{  
           return  res.status(200).send({message: "Success",data: result});
          }
        });
       }
  });
 
      
});
app.post('/login',async (req,res)=>{
   const {email,password} = req.body;
   const login= 'SELECT email,password,id,username FROM register WHERE email= ?';
   connection.query(login,[email],async function (err, result) {
   
	if(err)
	{
    return res.status(500).send({message: 'something went wrong',error: err.message})
  }
  else if(result.length===0)
  {
    
    return  res.status(404).send({message: "Failure"});  

  }
	else{
		const validPassword = await bcrypt.compare(password,result[0].password);
		if(validPassword)
		{
      const user = {
        id:result[0].id,
        username:result[0].username,
        email: result[0].email
      }
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
       let user_detail=JSON.stringify(user);
       const token = jwt.sign(user_detail,jwtSecretKey);
			return  res.status(200).send({message: "Success",data: user,token:token});	
		}
		else{
			return  res.status(400).send({message: "Failure",data: result});
		} 
	}

   });
});
app.get('/getusers',authenticateToken,(req,res)=>{
         const id = req.user.id;
        
       const query='SELECT profile_image FROM register WHERE id = ?'
       connection.query(query,[id],function (err, result) {
        if (err) 
        {
          return res.status(500).send({message: 'something went wrong',error: err.message})
        }
        else if(result[0].profile_image===null)
        {
          const null_path = result[0].profile_image;
          return res.status(200).json({message:'Success',data :null_path});
        }
        else{
          const valid_array=result[0].profile_image.split("\\");
          const image_name= valid_array[1];
          const profile_image=req.protocol+ '://'+ req.hostname + ':' + 4000 + '/upload/' + image_name;
          return res.status(200).json({message:'Success',data :profile_image});
        }
      });
});
app.use('/upload',express.static('upload'));
app.listen(port);
app.use('/profile',router);
app.use('/products',router1)