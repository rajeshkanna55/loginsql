import { Card ,Button ,Backdrop} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import picture from '../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';
import { InfinitySpin } from  'react-loader-spinner'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
const Navbar=()=>{
      const [profile,setProfile] = useState(),
            [loading,setLoading] = useState(false);
           const navigate=useNavigate();

           const handleLogout=()=>{
              localStorage.removeItem('user');
              navigate('/login');
           }
      useEffect(()=>{
          setLoading(true);
            const token = localStorage.getItem('user')
           const url = "http://localhost:4000/getusers";
             fetch(url,{
                method: 'GET',
                mode: 'cors',
                headers: {
                  Authorization : token
                }
             })
             .then( async (res) =>{
                    const response = await res.json();
                    setLoading(false);
                    if(response.message === 'Success')
                    {
                      if(response.data === null || response.data === undefined)
                      {
                           setProfile(picture);
                      }
                      else{
                         setProfile(response.data);
                      }
                    }
                    else{
                          alert('Profile Image Cannot Get')
                    }   
             }).catch(err => alert(err))
             
      },[])
    return(
        <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <InfinitySpin width="200" color="white" />
        </Backdrop>
       <Card sx={{height:'8vh',backgroundColor:'rgb(134,110,199)',position:'fixed',top:0,width:"100%",zIndex: 1}}>
        
       <div style={{float:'right'}}>
        <PowerSettingsNewIcon onClick={handleLogout} sx={{marginRight:'20px',color:'white',cursor: 'pointer'}} />
       <ShoppingCartIcon onClick={()=>navigate('/mycarts')} sx={{marginRight:'20px',color:'white',cursor: 'pointer'}}/>
        <Link to ={'/profile/dashboard'}>
          <img src={ profile } style={{width:'40px',height:'40px',borderRadius: "50%",marginRight:'10px',marginTop: '5px  '}} alt="profile"></img>
         </Link>
       </div>
         </Card>
        </>
    )
}

export default Navbar;