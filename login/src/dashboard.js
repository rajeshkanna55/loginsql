import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './dashboard.css';
import { useState,forwardRef } from 'react';
import { Grid,Button,Dialog,DialogTitle,DialogContent,DialogContentText,Slide,DialogActions} from '@mui/material';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });
export function Dashboard(){
   
      
     
        const [open, setOpen] = useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
    return (
      <>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={8}>
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle sx={{textAlign:'center'}}>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
      </>
    );
}

export default Dashboard;