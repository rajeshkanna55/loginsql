import { Card, Grid,TextField,Button} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/auth";
import './login.css';
import Image from './assets/question.png'
export function Login(){
      
  
   const [password,setPassword] = useState(''),
         [email,setEmail] = useState(''),
         [error,setError] = useState(false),
         [img,setImg] = useState(false);
         
    const navigate= useNavigate();

  const auth=useAuth();
      const login =()=>{
         if(password==='' && email==='')
         {
           setError(true); 
         }
         else{
          const details={
            email: email,
            password: password
          };
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
              if (response.message === 'Success') {
                 alert("Success");
                 const user = response.token; 
                 localStorage.setItem('user',user);
                  navigate('/dashboard')
              }
            else if(response.message ==='Failure'){
              alert('failure');
                 setImg(true);
            }
            else{
              alert('oops..! something went wrong');
            }
          }).catch((err)=> console.log(err.message));
         }
      }
   
   
   return (
     <>
       <div className="container" style={{ marginTop: "100px" }}>
         <Grid container spacing={1}>
           <Grid item xs={2}>
             <Card className="card1" sx={{ minHeight: 400, marginTop: "50px" }}></Card>
           </Grid>
           <Grid item xs={8}>
             <Card sx={{ minHeight: 500, borderRadius: "20px" }}>
               <Grid
                 container
                 sx={{ marginTop: "100px" }}
                 justifyContent={"center"}
               >
                 <Grid item xs={8}>
                   {error ? (
                     <>
                        
                       <TextField
                       error
                       id="standard-error"
                       label="Email"
                       sx={{ width: "50vh" }}
                       variant="standard"
                     />
                     <br></br>
                       <br></br>
                       <TextField
                       error
                       id="standard-error"
                       label="PassWord"
                       sx={{ width: "50vh" }}
                       variant="standard"
                     />
                    
                     </>
                   
                   ) : (
                     <>
                     <TextField
                     id="standard-search"
                     label="Email"
                     type="email"
                     variant="standard"
                     sx={{ width: "50vh" }}
                     onChange={(e) => {
                      setEmail(e.target.value.trim());
                      setImg(false);
                     }}
                   />
                   <br></br>
                     <br></br>
                     <TextField
                     id="standard-search"
                     label="PassWord"
                     type="password"
                     variant="standard"
                     name="PassWord"
                     sx={{ width: "50vh" }}
                     onChange={(e) => { 
                       setPassword(e.target.value.trim());
                       setImg(false);
                     }}
                   />
                   </>
                   )}

                 
                   {/* <label for="username">UserName</label>
                 <br></br>
                 <input type='text' placeholder="UserName" name="username"    className="user"></input>
                 <br></br>
                 <label for="PassWord">PassWord</label>
                 <br></br>
                 <input type='text' placeholder="PassWord" name="username"    className="user"></input> */}
                  
                   <br></br>
                   <br></br>
                   {img ? <img style={{width: '50px',height:'50px'}}src={Image}></img> : <> </>}
                   <Button
                     sx={{ marginLeft: "200px" }}
                     size={"large"}
                     variant="contained"
                     onClick={login}
                   >
                     SignIn{" "}
                   </Button>
                 </Grid>
               </Grid>
             </Card>
           </Grid>
           <Grid item xs={2}>
             <Card className="card2"sx={{ minHeight: 400, marginTop: "50px" }}></Card>
           </Grid>
         </Grid>
       </div>
     </>
   );
}

export default Login;