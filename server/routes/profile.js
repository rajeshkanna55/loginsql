var express=require('express');
var router = express.Router();
var connection =require('../lib/db');
router.post('/details',async (req,res)=>{
     const {person_id,fullname,age,gender}= req.body; 
     const skill =JSON.stringify(req.body.skill);
     console.log(req.body.skill);
     const sign = req.body.on;
     const store="INSERT INTO userdetails(person_id,fullname,age,gender,skill,sign) VALUES (?,?,?,?,?,?)";
     connection.query(store,[person_id,fullname,age,gender,skill,sign],function (err, result) {
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