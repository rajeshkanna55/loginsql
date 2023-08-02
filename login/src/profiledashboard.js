import { Card,CardContent, CardMedia, Grid, TextField ,Backdrop,Radio, Divider} from "@mui/material";
import Navbar from "./components/navbar";
import picture from './assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';
import { useState ,useEffect } from 'react'
import './profiledashboard.css';
import { InfinitySpin } from  'react-loader-spinner'
import MyComponent from "./components/userprofile";
import { getUser, userEdit } from "./users/userapi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export function UserDashboard(){
     const [avatar,setAvatar] = useState(),
           [choice,setchoice] = useState(''),
           [loading,setLoading] = useState(false),
           [data,setData] = useState(''),
           [formdata,setFormdata] = useState(),
           [validation,setValidation] = useState();

           const getUserdata=async (token)=>{
              const data = await getUser(token);
              if(data.message === 'Success' && data.data.length!==0)
              {
                setData(data.data[0]);
                setFormdata(data.data[0]);
              }
              else{
                alert('something went wrong');
              }
           }
          
          const getProfile=(token)=>{
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
    const customTlds = ['com', 'org', 'net', 'io'];


    const save = async () =>{
      const token = localStorage.getItem('user');
      const userEditSchema = Joi.object({
          "id": Joi.number().required(),
        "username": Joi.string().alphanum().min(8).max(30).required(),
        email: Joi.string().email({tlds: { allow: customTlds }}).required(),
        mobile: Joi.string().regex(/^\d{10}$/).required() .messages({
          'string.base': 'Mobile number should be a string',
          'string.empty': 'Mobile number is required',
          'string.pattern.base': 'Mobile number must be a 10-digit number',
          'any.required': 'Mobile number is required',
        }),
        dob:Joi.date()
        .max('now') 
        .iso()
        .required()
        .messages({
          'date.base': 'Date of birth must be a valid date',
          'date.format': 'Date of birth must be in ISO format (YYYY-MM-DD)',
          'date.max': 'Date of birth cannot be in the future',
          'any.required': 'Date of birth is required',
        }),
        address: Joi.string().min(10).max(2000).required(),
      });
      const { error, value }= userEditSchema.validate(formdata);
      console.log('err: ',error,"id: ",typeof formdata.id);
      if(error)
      {  
        const errors={};
        for (let item of error.details) {
               errors[item.path[0]] = item.message;
            }
          setValidation(errors);
      }
      else{
          const response= await userEdit(formdata);
          if(response.message === 'Success')
          {
            alert('edited successfully');
            getUserdata(token);
            setchoice('');
          }
          else{
              alert('Please Try Later');
          }
      } 
    }


   useEffect(()=>{
        setLoading(true);
        const token = localStorage.getItem('user');
        getProfile(token);
        getUserdata(token);
       setLoading(false);
           },[]);
   
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
                 getProfile(token); 
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
                     {data?.username}
                    </p>
                    <div>
                      <p style={{marginBottom: "0px"}}>
                        {data?.email}
                        </p>
                      <p>{data?.mobile}</p>
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
                       <MyComponent choice={choice} formdata={formdata} setFormdata={setFormdata} save={save} validation={validation}/>
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