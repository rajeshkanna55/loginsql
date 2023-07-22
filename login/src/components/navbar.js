import { Card ,Button } from "@mui/material";
import { Link } from "react-router-dom";
import pic from '../assets/HD-wallpaper-forest-flora-forest-vithurshan-dark-europe-faded-green-leaf-mood-moody-sri-lanka-vithurshan-jpeg-wood-thumbnail.jpg'
import { useEffect } from "react";
import { useState } from "react";
const Navbar=()=>{
      const [profile,setProfile] = useState();
       
      useEffect(()=>{
            const token = localStorage.getItem('user')
           const url = "http://localhost:4000/products/acssesories/getuser";
             fetch(url,{
                method: 'GET',
                mode: 'cors',
                headers: {
                  Authorization : token
                }
             })
             .then( res => res.json())
             .then( json => {
                    setProfile(json.data);
             })
             
      },[])
    return(
        <>
       <Card sx={{height:'50px',backgroundColor:'rgb(134,110,199)'}}>
       <div style={{float:'right'}}>
        <Link to ={'/message'}>
          <img src={profile} style={{width:'40px',height:'40px',borderRadius: "50%",marginRight:'10px',marginTop: '5px  '}} alt="profile"></img>
         </Link>
       </div>
         </Card>
        </>
    )
}

export default Navbar;