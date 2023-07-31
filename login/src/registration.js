import { Card, Grid,TextField,Button, CardContent,Backdrop} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import './registration.css';
import back from './assets/back.jpg';
import Joi from 'joi';
import { InfinitySpin } from  'react-loader-spinner'
export function Register(){

  const navigate= useNavigate();
   const [username,setUsername] = useState(""),
         [password,setPassword] = useState(''),
         [email,setEmail] = useState(''),
         [cpass,setCpass] = useState(''),
         [validation,setValidation] = useState(''),
         [cpp,setCpp] = useState(false),
         [error,setError] = useState(false),
         [loading,setLoading] = useState(false);
    const customTlds = ['com', 'org', 'net', 'io'];
      const login =()=>{
         
          const details={
            name: username,
            email: email,
            password: password
          };
          const userRegistrationSchema = Joi.object({
            name: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({tlds: { allow: customTlds }}).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
          });
          const { error, value }= userRegistrationSchema.validate(details);
          if(error)
          {  
            const errors={};
            for (let item of error.details) {
                   errors[item.path[0]] = item.message;
                }
              setValidation(errors);
          }
          else
          {
            if(cpass === password)
            { 
              setLoading(true);
            const uri='http://localhost:4000/registration';
            fetch(uri, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(details)
            })
              .then(async (res) => {
                const response= await res.json();
                setLoading(false);
                if (response.message==='Success') {
                   alert("registered successfully");
                   navigate('/login')
                }
              else if(response.message==='Exist'){
                  alert('already registered');
              }
              else{
                alert('oops..! something went wrong');
              }
            }).catch((err)=>{ if(err) alert('api error');} )
          }
          else
          {
            setCpp(true);
          }
          }
        }
   
   
   return (
     <>
       <Backdrop
         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={loading}
       >
         <InfinitySpin width="200" color="white" />
       </Backdrop>
       <div
         className="conatainer-fluid"
         style={{
           width: "100%",
           height: "100vh",
           backgroundImage: `url(${back})`,
           backgroundSize: "cover",
         }}
       >
         <div
           className="container"
           style={{ position: "relative", top: "15vh", left: "2%" }}
         >
           <Grid container spacing={1}>
             <Grid item xs={1} sm={2} md={3} lg={3}>
               <Card
                 className="card1"
                 sx={{ backgroundColor: "white", marginTop: "50px" }}
               ></Card>
             </Grid>
             <Grid item xs={10} sm={8} md={6} lg={5}>
               <Card sx={{ borderRadius: "20px" }}>
                 <CardContent>
                   <form style={{ position: "relative", left: "15%" }}>
                     <Grid container>
                       <Grid item xs={12}>
                         <TextField
                           error={validation.name}
                           helperText={validation.name}
                           id="standard-search"
                           label="UserName"
                           type="text"
                           variant="standard"
                           InputLabelProps={{
                             style: {
                               color: "black",
                             },
                           }}
                           InputProps={{
                             style: {
                               color: "black",
                               borderBottom: "1px solid black",
                             },
                           }}
                           onChange={(e) => {
                             setUsername(e.target.value.trim());
                           }}
                         />
                       </Grid>
                       <br></br>
                       <br></br>
                       <Grid item xs={12}>
                         <TextField
                           error={validation.email}
                           helperText={validation.email}
                           id="standard-search"
                           label="Email"
                           type="email"
                           variant="standard"
                           fullwidth
                           InputLabelProps={{
                             style: {
                               color: "black",
                             },
                           }}
                           InputProps={{
                             style: {
                               color: "black",
                               borderBottom: "1px solid black",
                             },
                           }}
                           onChange={(e) => {
                             setEmail(e.target.value.trim());
                             setError(false);
                           }}
                         />
                       </Grid>
                       <br></br>
                       <br></br>
                       <Grid item xs={12}>
                         <TextField
                           error={validation.password}
                           helperText={validation.password}
                           id="standard-search"
                           label="Password"
                           type="password"
                           variant="standard"
                           name="PassWord"
                           fullwidth
                           InputLabelProps={{
                             style: {
                               color: "black",
                             },
                           }}
                           InputProps={{
                             style: {
                               color: "black",
                               borderBottom: "1px solid black",
                             },
                           }}
                           onChange={(e) => {
                             setPassword(e.target.value.trim());
                           }}
                         />
                       </Grid>
                       <br></br>
                       <br></br>
                       <Grid item xs={12}>
                         <TextField
                           error={cpp}
                           helperText={cpp ? "enter the same password" : ""}
                           id="standard-search"
                           label="Confirm Password"
                           type="password"
                           variant="standard"
                           name="PassWord"
                           fullwidth
                           InputLabelProps={{
                             style: {
                               color: "black",
                             },
                           }}
                           InputProps={{
                             style: {
                               color: "black",
                               borderBottom: "1px solid black",
                               "&:hover fieldset": {
                                 borderBottomColor: "#007bff", // Border bottom color on hover
                               },
                             },
                           }}
                           onChange={(e) => {
                             setCpass(e.target.value.trim());
                             setCpp(false);
                           }}
                         />
                       </Grid>
                       <br></br>
                       <br></br>
                       <Grid item xs={6} sx={{ paddingTop: "20px" }}>
                         <Button
                           color="secondary"
                           size={"medium"}
                           variant="contained"
                           onClick={() => {
                             navigate("/login");
                           }}
                         >
                           signIn
                         </Button>
                       </Grid>
                       <Grid item xs={1} sx={{ paddingTop: "20px" }}>
                         <Button
                           color="secondary"
                           size={"medium"}
                           variant="contained"
                           sx={{ position: "relative", left: "35%" }}
                           onClick={login}
                         >
                           SignUp{" "}
                         </Button>
                       </Grid>
                     </Grid>
                   </form>
                 </CardContent>
               </Card>
             </Grid>
             <Grid item xs={2}>
               <Card className="card2" sx={{ marginTop: "50px" }}></Card>
             </Grid>
           </Grid>
         </div>
       </div>
     </>
   );
}

export default Register;