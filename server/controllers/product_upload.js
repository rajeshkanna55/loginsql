const connection = require("../lib/db");



const product_upload = async (req,res) => {
    try{
        if(!req.file)
        {
           return res.status(404).send({message: 'Please Upload File'});
        }
        else{
            //  const base_url =req.protocol+ '://'+ req.hostname + ':' + 4000;
            //  const profile_path=req.file.destination+ ''+req.file.filename;
            //  const save_path = req.file.path;
            //  const profile = base_url + '/'+ profile_path;
            const { product_name,product_prize } = req.body;
            const uploader_id= req.user.id;
            const product_image = `upload/products/acssesories/${req.file.filename}`;
            const file_query='INSERT INTO products (uploader_id,product_name,product_prize,product_image) VALUES (?,?,?,?)';
            connection.query(file_query,[uploader_id,product_name,product_prize,product_image],async (err,result)=>{
                if(err)
                {
                  
                    return res.status(500).send({message: 'server error'});
                }
                else
                {
                    return res.status(200).send({message : 'Success' ,data : result});
                }
            })
        }
      }
      catch(err)
      {
        return res.status(500).send({message: 'Function Error'});
      }
}

const getall_products = async (req,res) => {
      
          const user_id= req.user.id;
     
    const get_product = 'SELECT products.id,products.product_image,products.product_name,products.product_prize,carts.isCart FROM products LEFT JOIN carts ON carts.product_id = products.id AND carts.user_id = ?';
    connection.query(get_product,[user_id],async (err,data)=>{
         if(err)
         {
            return res.status(500).send({message: 'server error'});
         }
         else{
              data.forEach((value)=>{
                  value.product_image=req.protocol+ '://'+ req.hostname + ':' + 4000 + '/' + value.product_image;
              });
            return res.status(200).send({message : 'Success' ,data : data});
         }
    });  

}

const addtocart = async (req,res) => {
    try {
        
        const user_id= req.user.id;
        const {product_id,isCart }  = req.body; 
        if(isCart === true)
        {
            const  recart = 'SELECT isCart FROM carts WHERE product_id = ? AND user_id = ?';
            connection.query(recart,[product_id,user_id],async (err,result)=>{
                if(err)
                {
                    return res.status(500).send({ message: err});
                }
                else if(result.length !== 0)
                {
                   const reAddCart='UPDATE carts SET isCart = ? WHERE product_id = ? AND user_id = ?';
                   connection.query(reAddCart,[isCart,product_id,user_id], (err,result)=>{
                    if(err)
                    {
                        return res.status(500).send({ message: "server error" });
                    }
                    else{
                        return res.status(200).send({ message: "Success" });
                    }
                   })

                }
                else {
                         
                    const add_cart = 'INSERT INTO carts (product_id,user_id,isCart) VALUES (?,?,?)';
                    connection.query(add_cart,[product_id,user_id,isCart],async (err,result)=>{
                        if (err) {
                          return res.status(500).send({ message: "server error" });
                        }
                         else 
                         {
                          return res.status(200).send({ message: "Success" });
                        }
                    });
                }
               
            });
        }
        else{
            const cancel_cart = 'UPDATE carts SET isCart = ? WHERE product_id = ? AND user_id = ?';
            connection.query(cancel_cart,[isCart,product_id,user_id],async (err,result)=>{
                if(err)
                {
                    return res.status(500).send({ message: "server error" });
                }
                else
                {
                    return res.status(200).send({ message: "Success" });
                }
            })
        }
    }
    catch(err)
    {
        return res.status(500).send({message: 'server error'}); 
    }
}

const getMyCarts = (req,res) => {
    try{

        const person_id= req.user.id;
        const  getperosnscart= 'SELECT products.id,products.product_image,products.product_name,products.product_prize,carts.isCart FROM products INNER JOIN carts ON carts.product_id = products.id WHERE carts.user_id = ? AND carts.isCart = 1 GROUP BY products.id, products.product_image, products.product_name, products.product_prize, carts.isCart';
        connection.query(getperosnscart,[person_id],async (err,data)=>{
              if(err)
              {
                return res.status(500).send({message: 'server error'}); 
              }
              else{
                 var total_cart_amount = 0;
                data.forEach((value)=>{
                    value.product_image=req.protocol+ '://'+ req.hostname + ':' + 4000 + '/' + value.product_image;
                    total_cart_amount = value.product_prize + total_cart_amount; 
                });
                return res.status(200).send({message : 'Success' ,data : data,total: total_cart_amount});
              }
        });
    }
    catch(err)
    {
            return res.status(500).send({ message: "server error" });  
    }
}
module.exports = { product_upload , getall_products ,addtocart ,getMyCarts}