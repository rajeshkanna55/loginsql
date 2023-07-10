import { Card, Grid,TextField,Button} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";

export function Login(){

  
   const [password,setPassword] = useState(''),
         [email,setEmail] = useState(''),
         [error,setError] = useState(false);
  const navigate= useNavigate();
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
              if (await res.status === 200) {
                 alert("login successfully");
                 navigate('/dashboard')
              }
            else if(await res.status=== 400){
                alert('incorrect username or password');
            }
            else{
              alert('oops..! something went wrong');
            }
          }).catch((err)=> alert('api error'))
         }
      }
   
   
   return (
     <>
       <div className="container" style={{ marginTop: "150px" }}>
         <Grid container spacing={1}>
           <Grid item xs={2}>
             <Card sx={{ minHeight: 400, marginTop: "50px" }}></Card>
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

                   <Button
                     sx={{ marginLeft: "250px" }}
                     size={"large"}
                     variant="contained"
                     onClick={login}
                   >
                     SignUp{" "}
                   </Button>
                 </Grid>
               </Grid>
             </Card>
           </Grid>
           <Grid item xs={2}>
             <Card sx={{ minHeight: 400, marginTop: "50px" }}></Card>
           </Grid>
         </Grid>
       </div>
     </>
   );
}

export default Login;