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
        <div style={{position:'relative',left:'10%',top:'10vh'}} >
        <Grid container gap={2}>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <div className="container">
            <label>New passWord</label>
            <div style={{display:'flex'}}>
            <input type={show ? "text":"password"} placeholder="New password" className="password" />
            {show ? <VisibilityOffIcon sx={{position:'relative',right:'30px',top:'5px'}}onClick={showPassword}/> : <RemoveRedEyeIcon sx={{position:'relative',right:'30px',top:'5px'}} onClick={showPassword}/> }
            </div>
          </div>
          <br></br>
          <div className="container">
            <label>Confirm password</label>
            <div style={{display:'flex'}}>
            <input type={show ? "text":"password"} placeholder="Confirm password" className="Cpass" />
            {show ? <VisibilityOffIcon sx={{position:'relative',right:'30px',top:'5px'}}onClick={showPassword}/> : <RemoveRedEyeIcon sx={{position:'relative',right:'30px',top:'5px'}} onClick={showPassword}/> }
            </div>
          </div>
        </Grid>
        <br></br>
      <div className='container' style={{ display:'flex',justifyContent:'center'}}>
       <button className="changePass">Save</button>
      </div>
      </Grid>
      </div>
    </>
    );
}