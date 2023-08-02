const connection = require("../lib/db");

const getuser=async (req,res) =>{
      const id=req.user.id;
      var query='SELECT id,username,email,mobile,dob,address FROM register WHERE id = ?';
      connection.query(query,[id],async(err,result)=>{
        if(err)
        {
           return res.status(500).send({message : 'Failure'});
        }
        else{
            return res.status(200).send({message: 'Success',data: result});
        }
      })
}

const editUser=async (req,res) =>{
    const {id,username,email,mobile,dob,address} = req.body;
         const update= 'UPDATE register SET username = ?,email = ?,mobile = ?,dob = ? ,address = ? WHERE id = ?';
        connection.query(update,[username,email,mobile,dob,address,id],async (err,data)=>{
                 if(err)
                 { 
                    return res.status(500).send({message:err.message});
                 }
                 else{
                    return res.status(200).send({message:"Success",data: data});
                 }
        });
}
module.exports = { getuser ,editUser};