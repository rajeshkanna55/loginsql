import { Grid } from "@mui/material";
import './userProfileEdit.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function UserProfileEdit(){
   
    return (
      <>
        <Grid container gap={2}>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Username</label>
              <input type="text" placeholder="Username" className="username" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Email</label>
              <input type="email" placeholder="Email" className="email" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Mobile</label>
              <input type="text" placeholder="Mobile" className="mobile" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>DOB</label>
              <input type="date"  className="dob" />
            </div >
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Address</label>
              <br></br>
              <textarea
                cols="50"
                rows="4"
                name="address"
                id="address"
                className="address"
              />
            </div>
          </Grid>
        </Grid>
        <div className='container' style={{ display:'flex' , justifyContent:'end'}}>
         <button className="userEdit">Save</button>
        </div>
      </>
    );
};
