import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './dashboard.css';
import { useState ,useEffect} from 'react';
import {Paper,TableBody,TableCell,TableHead,TableContainer,TableRow,Grid,Button,Table,Backdrop} from '@mui/material';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Model } from './components/model';
import { useNavigate } from 'react-router-dom';
import Products from './components/products';
import { InfinitySpin } from  'react-loader-spinner'

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
//   });
export function Dashboard(){
         const [user,setUser] = useState([]),
               [loading,setLoading] = useState(false),
               [data,setData] = useState('');
        
          const navigate = useNavigate();
          const token = localStorage.getItem('user');     
              
         useEffect(()=>{
          const url = "http://localhost:4000/profile/users";
          fetch(url)
              .then(res => res.json())
              .then(json => {
                  setUser(json.data);
              })
         },[]);
     
        const [open, setOpen] = useState(false);
      
        const handleClickOpen =(row) => {
           setData(row);
          setOpen(true);
        };
      
        const handleClose = () => {
           setOpen(false)
        };

       const save=()=>{
        const uri='http://localhost:4000/profile/edit';
        fetch(uri, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization : token
          },
          body: JSON.stringify(data)
        }).then(async (res)=>{
          const response = await res.json();
           
          if(response.message ==='Success')
          {
            alert('successFully Edited')
             setOpen(!open);
             window.location.reload();  
          }
          else
          {
             alert('404 Error Found...!')
          }
        }).catch(err=> alert ('Unable To Processs'));
          
       }
       
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <InfinitySpin width="200" color="white" />
        </Backdrop>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={2}>
            {/* <Sidebar /> */}
          </Grid>
          <Grid item xs={8}>
            {/* <TableContainer
              sx={{ position: "relative", top: 65 }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.fullname}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.age}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">
                        <Button
                          id="edit_user"
                          onClick={() => handleClickOpen(row)}
                        >
                          Edit{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
          </Grid>
        </Grid>
        <Model
          open={open}
          close={handleClose}
          data={data}
          setData={setData}
          save={save}
        />
      </>
    );
}

export default Dashboard;