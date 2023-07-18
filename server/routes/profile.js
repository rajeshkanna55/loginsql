var express=require('express');
var router = express.Router();
var connection =require('../lib/db');
var authenticateToken= require('../middleware/authentication')
router.post('/details',authenticateToken,async (req,res)=>{
     const {fullname,age,gender,address}= req.body; 
     const person_id = req.user.id;
     const skill =JSON.stringify(req.body.skill);
     console.log(req.body.on);
     const sign = req.body.on;
     const store="INSERT INTO userdetails(person_id,fullname,age,gender,skill,sign,address) VALUES (?,?,?,?,?,?,?)";
     connection.query(store,[person_id,fullname,age,gender,skill,sign,address],function (err, result) {
        if(err)
        {
            res.status(500).send({message:"something went wrong"});
            console.log(err);
        }
        else{
            res.status(200).send({message:"profile stored successfully"});
        }
    });
});


module.exports = router;