import { Card, Grid,TextField,Button,CardContent,Backdrop} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import Image from './assets/question.png';
import back from './assets/back.jpg';
import { InfinitySpin } from  'react-loader-spinner'

export function Login(){
      
         
   const [password,setPassword] = useState(''),
         [email,setEmail] = useState(''),
         [invalid,setInvalid] = useState(false),
         [error,setError] = useState(false),
         [loading,setLoading] = useState(false),
         [img,setImg] = useState(false);
         
    const navigate= useNavigate();

      const login =()=>{
          const details={
            email: email,
            password: password
          };
          if(email!=='' || password!=='')
          {

          setLoading(true);
          const uri='http://localhost:4000/login';
          fetch(uri, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
          })
            .then(async (res) => {
              const response=await res.json();
              setLoading(false);
              if (response.message === 'Success') {
                 const user = response.token; 
                   localStorage.setItem('user',user);
                   alert('Success');
                   navigate('/accessories');
              }
            else if(response.message ==='Failure'){
                  setInvalid(true);
                
            }
            else{
              alert('oops..! something went wrong');
            }
          }).catch((err)=> console.log(err.message));
        }
         else{
          setError(true);
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
                     <br></br>
                     {invalid ? (
                       <h3 style={{ color: "red" }}>Invalid Login</h3>
                     ) : (
                       ""
                     )}
                     <br></br>
                     <TextField
                       error={error && !email}
                       helperText={error && !email ? "email required" : ""}
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
                         setInvalid(false);
                       }}
                     />
                     <br></br>
                     <br></br>
                     <TextField
                       error={error && !password}
                       helperText={
                         error && !password ? "password required" : ""
                       }
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
                         setInvalid(false);
                       }}
                     />
                     <br></br>
                     <br></br>

                     <br></br>
                     <br></br>
                     <Button
                       color="secondary"
                       size={"medium"}
                       variant="contained"
                       onClick={() => {
                         navigate("/register");
                       }}
                     >
                       Signup
                     </Button>
                     <Button
                       color="secondary"
                       size={"medium"}
                       variant="contained"
                       sx={{ position: "relative", left: "35%" }}
                       onClick={login}
                     >
                       SignIn{" "}
                     </Button>
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

export default Login;