import { Card,CardContent, CardMedia, Grid, TextField ,Backdrop,Radio, Divider} from "@mui/material";
import Navbar from "./components/navbar";
import picture from './assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';
import { useState ,useEffect } from 'react'
import './profiledashboard.css';
import { InfinitySpin } from  'react-loader-spinner'
import UserProfileEdit from "./components/userProfileEdit";
import MyComponent from "./components/userprofile";

export function UserDashboard(){
     const [avatar,setAvatar] = useState(),
           [choice,setchoice] = useState(''),
           [loading,setLoading] = useState(false);
        console.log(choice);
          const get_profile=()=>{
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
                       if(response.data === null)
                       {
                            setAvatar(picture);
                       }
                       else{
                          setAvatar(response.data);
                       }
                     }
                     else{
                           alert('Profile Image Cannot Get')
                     }   
              }).catch(err => alert(err))
          } 


   useEffect(()=>{
            setLoading(true);
             get_profile();
             setLoading(false); 
           },[])
   
      const handleContent=(value)=>{
            setchoice(value);
      }

      const handleProfile=(e)=>{
        setLoading(true);
        const formData = new FormData();
        formData.append('profile', e.target.files[0]);
          const token = localStorage.getItem('user');
          const url='http://localhost:4000/products/profile';
          fetch(url,{
            method: 'POST',
            mode: 'cors',
            headers:{
              Authorization : token,
              Accept: 'application/json',
            },
            body: formData
          }).then(async (res)=>{
             const response = await res.json();
             setLoading(false)
              if(response.message === 'Success')
               {
                 alert('profile changed successfully');
                 window.location.reload();
                 get_profile(); 
               }
              else{
                console.log(response);
             }
          })
      }
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <InfinitySpin width="200" color="white" />
        </Backdrop>
        <Grid container>
          <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={12}>
            <div className="container">
              <Grid container>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{ minHeight: 400, position: "relative", top: "15vh" }}
                  >
                    <CardContent>
                      <div>
                        <div className="personal-image">
                          <label className="label">
                            <input
                              type="file"
                              name="profile"
                              onChange={handleProfile}
                            />
                            <figure className="personal-figure">
                              <img
                                src={avatar}
                                className="personal-avatar"
                                alt="avatar"
                              />
                              <figcaption className="personal-figcaption">
                                <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                              </figcaption>
                            </figure>
                          </label>
                        </div>
                      </div>
                    </CardContent>
                    <p style={{ fontWeight: "bold", marginBottom: "0px" }}>
                     Tom Holland
                    </p>
                    <div>
                      <p style={{marginBottom: "0px"}}>baz45@gmail.com</p>
                      <p>+04451 634531</p>
                     <ul className="ul">
                     <Divider />
                      <li className="li"  onClick={()=>handleContent('Edit')}>Edit Profile</li>
                      <Divider />
                      <li className="li"  onClick={()=>handleContent('Change')}>Change Password</li>
                      <Divider/>
                      <li className="li" onClick={()=>handleContent('Log')}>My Activity</li>
                     </ul>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={8} lg={9}>
                  <Card
                    sx={{ minHeight: 400, position: "relative", top: "15vh" }}
                  >
                    <CardContent>
                      <div className="container">
                       <MyComponent choice={choice}/>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </>
    );
}

export default UserDashboard;