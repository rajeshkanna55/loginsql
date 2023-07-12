var express=require('express');
var app = express();
var connection=require("./lib/db");
const body=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcrypt');
const router = require('./routes/profile');
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
   const login= 'SELECT email,password FROM register WHERE email= ?';
   connection.query(login,[email],async function (err, result) {
	if(err)
	{
		return  res.status(500).send({message: "something went wrong" ,error : err.message});  
	}
	else{
		const validPassword = await bcrypt.compare(password,result[0].password);
		if(validPassword)
		{
			return  res.status(200).send({message: "login successfully",data: result});	
		}
		else{
			return  res.status(400).send({message: "user not registered",data: result});
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