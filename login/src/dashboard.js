import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './dashboard.css';
import { useState,forwardRef ,useEffect} from 'react';
import {Paper,TableBody,TableCell,TableHead,TableContainer,TableRow,TextField,Grid,Button,Dialog,DialogTitle,DialogContent,DialogContentText,Slide,DialogActions,Table} from '@mui/material';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';


// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
//   });
export function Dashboard(){
         const [user,setUser] = useState([]);
         useEffect(()=>{
          const url = "http://localhost:4000/getusers";
          fetch(url)
              .then(res => res.json())
              .then(json => {
                  setUser(json);
              }) 
         },[])
     
        const [open, setOpen] = useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const Editbox=()=>{
          return(
            <>
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth='md'
                sx={{
                  '& .MuiDialog-paper': {
                    backgroundColor: 'rgb(134,110,199)',
                  },
                }}
              >
                <DialogTitle sx={{textAlign:'center',color: 'white'}}>{"Edit The User Details"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                 
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                      <TextField
                      fullWidth
                         id="standard-search"
                         label="Email"
                         type="email"
                         variant="standard"
                        //  multiline
                        //  rows={4}
                         InputLabelProps={{
                           style: {
                             color: "white",
                           },
                         }}
                         InputProps={{
                           style: {
                             color: "white",
                             borderBottom: "1px solid white",
                           },
                         }}
                         sx={{
                          
                           color: " white",
                           borderBottom: "1px solid white",
                         }}
                         onChange={(e) => {
                        
                         }}
                       />
                      </Grid>
                      <Grid item xs={6}>
                      <TextField
                        fullWidth
                         id="standard-search"
                         label="Age"
                         type="number"
                         variant="standard"
              
                         InputLabelProps={{
                           style: {
                             color: "white",
                           },
                         }}
                         InputProps={{
                           style: {
                             color: "white",
                             borderBottom: "1px solid white",
                           },
                         }}
                         sx={{
                         
                           color: " white",
                           borderBottom: "1px solid white",
                         }}
                         onChange={(e) => {
                           
                         
                         }}
                       />
                      </Grid>
                      <Grid item xs={6}>
                      <TextField
                        fullWidth
                         id="standard-search"
                         label="Address"
                         type="email"
                         variant="standard"
                         rows={3}
                         multiline
                         InputLabelProps={{
                           style: {
                             color: "white",
                           },
                         }}
                         InputProps={{
                           style: {
                             color: "white",
                             borderBottom: "1px solid white",
                           },
                         }}
                         sx={{
                        
                           color: " white",
                           borderBottom: "1px solid white",
                         }}
                         onChange={(e) => {
                           
                         
                         }}
                       />
                      </Grid>
                      <Grid item xs={6}>
                      <TextField
                        fullWidth
                         id="standard-search"
                         label="Email"
                         type="email"
                         variant="standard"
                        //  value={'myvalue'}
                         
                         InputLabelProps={{
                           style: {
                             color: "white",
                           },
                         }}
                         InputProps={{
                           style: {
                             color: "white",
                             borderBottom: "1px solid white",
                           },
                         }}
                         sx={{
                         
                           color: " white",
                           borderBottom: "1px solid white",
                         }}
                         onChange={(e) => {
                           
                         
                         }}
                       />
                      </Grid>
                    </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button id='cancel_edit' onClick={handleClose}>Cancel</Button>
                  <Button id='save_edit'  onClick={handleClose}>Save </Button>
                </DialogActions>
              </Dialog>
              </>
          )
        }
      
    return (
      <>
        <Grid container spacing={0}>
          <Grid xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={8}>
          <TableContainer   sx={{marginLeft:'50px',marginTop:'20px'}} component={Paper}>
      <Table sx={{ minWidth: 650, }} aria-label="simple table">
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.username}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center"><Button id='edit_user' onClick={handleClickOpen}>Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              
              
          
          </Grid>
        </Grid>
        <Editbox/>
      </>
    );
}

export default Dashboard;