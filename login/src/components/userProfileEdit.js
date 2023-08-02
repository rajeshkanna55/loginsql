import { Grid } from "@mui/material";
import './userProfileEdit.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function UserProfileEdit({formdata,setFormdata,save,validation}){
            
    return (
      <>
        <Grid container gap={2}>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Username</label>
              <input
                type="text"
                value={formdata?.username}
                placeholder="Username"
                className="username"
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                   username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="container" style={{height:'1vh'}}>
            {validation?.username ? <span style={{color:'red',fontSize:'12px'}}>{validation.username}</span>:''} 
            </div>
          </Grid>
          
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={formdata?.email}
                className="email"
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                   email: e.target.value,
                  }));
                }}
              />
               <div style={{height:'1vh'}}>

              {validation?.email ? <span style={{color:'red',fontSize:'12px'}}>{validation.email}</span>:''} 
               </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>Mobile</label>
              <input
                type="text"
                placeholder="Mobile"
                className="mobile"
                value={ formdata?.mobile || ''}
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }));
                }}
              />
               <div className="container" style={{height:'1vh'}}>

              {validation?.mobile ? <span style={{color:'red',fontSize:'12px'}}>{validation.mobile}</span>:''} 
               </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="container">
              <label>DOB</label>
              <input
                type="date"
                className="dob"
                value={formdata?.dob || ''}
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                   dob: e.target.value,
                  }));
                }}
              /> 
              <div className="container" style={{height:'1vh'}}>

              {validation?.dob ? <span style={{color:'red',fontSize:'12px'}}>{validation.dob}</span>:''} 
              </div>
            </div>
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
                value={formdata?.address || ''}
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));
                }}
              />
               <div style={{height:'1vh'}}>

              {validation?.address ? <span style={{color:'red',fontSize:'12px'}}>{validation.address}</span>:''} 
               </div>
            </div>
          </Grid>
        </Grid>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <button className="userEdit" onClick={save} >Save</button>
        </div>
      </>
    );
};
