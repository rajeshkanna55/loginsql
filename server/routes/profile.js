var express=require('express');
var router = express.Router();
var connection =require('../lib/db');
var authenticateToken= require('../middleware/authentication')
router.post('/details',authenticateToken,async (req,res)=>{
     const {fullname,age,gender,address}= req.body; 
     const person_id = req.user.id;
     const skill =JSON.stringify(req.body.skill);
     const sign = req.body.on;
     const store="INSERT INTO userdetails(person_id,fullname,age,gender,skill,sign,address) VALUES (?,?,?,?,?,?,?)";
     connection.query(store,[person_id,fullname,age,gender,skill,sign,address],function (err, result) {
        if(err)
        {
            return res.status(500).send({message:"something went wrong"});
          
        }
        else{
            res.status(200).send({message:"profile stored successfully"});
        }
    });
});

router.post('/edit',authenticateToken,async (req,res)=>{
         const {id,fullname,age,address} = req.body;
         const person_id = req.user.id;
         const update= 'UPDATE userdetails SET person_id = ?,fullname = ?,age = ?,address = ? WHERE id = ?';
        connection.query(update,[person_id,fullname,age,address,id],async (err,data)=>{
                 if(err)
                 { 
                    return res.status(500).send({message:"something went wrong"});
                 }
                 else{
                    return res.status(200).send({message:"Success",data: data});
                 }
        });

});

router.get('/users',async (req,res)=>{
    const get= 'SELECT id,age,fullname,address FROM userdetails';
    connection.query(get,async (err,data)=>{
             if(err)
             {
                
                return res.status(500).send({message:"something went wrong"});

             }
             else{
                res.status(200).send({message:"Success",data: data});
             }
    });
});

module.exports = router;