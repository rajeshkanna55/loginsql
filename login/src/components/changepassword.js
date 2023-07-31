import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Grid } from '@mui/material';
import { useState } from 'react';
import './changepassword.css'
export default function Changepassword(){
        const [show,setShow]= useState(false);
      const showPassword=()=>{
        setShow(!show);
      }
    return(
        <>
      
        <Grid container gap={2}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <div className="container">
            <label>New passWord</label>
            <input type={show ? "text":"password"} placeholder="New password" className="password" />
            {show ? <VisibilityOffIcon onClick={showPassword}/> : <RemoveRedEyeIcon Onclick={showPassword}/> }
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <div className="container">
            <label>Confirm password</label>
            <input type="password" placeholder="Confirm password" className="Cpass" />
          </div>
        </Grid>
      </Grid>
      <div className='container' style={{ display:'flex' , justifyContent:'end'}}>
       <button className="changePass">Save</button>
      </div>
    </>
    );
}