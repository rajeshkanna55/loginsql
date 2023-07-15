var express=require('express');
var app = express();
var connection=require("./lib/db");
const body=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcrypt');
const router = require('./routes/profile');
const jwt = require('jsonwebtoken');
require('dotenv/config');
var port=4000;
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(cors());
app.post('/registration',async(req,res)=>{
  const { name,email,password } = req.body;
  const salt =await bcrypt.genSalt(10);
  const passWord = await bcrypt.hash(password, salt);
  console.log(req.body);
  var check = "SELECT email FROM register WHERE email= ?";
  connection.query(check,[email],(err,result)=>{
      
       if(err){

            return  res.status(500).send({message: "something went wrong" ,error : err.message});
       }
       else if(result.length!=0){
         return  res.status(400).send({message: "already registered",data: result});
          
       }
       else{
        const query = 'INSERT INTO register (username, email, password) VALUES (?,?,?);';
        connection.query(query,[name,email,passWord],function (err, result) {
          if (err) 
          {
             return  res.status(500).send({message: "database connection lost"})
          }
          else{
             
           return  res.status(200).send({message: "registered successfully",data: result});
           
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
app.get('/getusers',(req,res)=>{
       const query='SELECT * FROM register'
       connection.query(query,function (err, result) {
        if (err) throw err.message;
        res.json(result);
      });
});
 
app.listen(port);
app.use('/profile',router);