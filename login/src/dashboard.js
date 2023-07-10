import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './dashboard.css';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import { Grid,Card, Button } from '@mui/material';
export function Dashboard(){
    const [open,setOpen] = useState(false);
 
    return(
        <>
         <Grid container>
            <Grid xs={12}>
            <Card>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{
                setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{float:'right'}}>
           <Link to={'/'}>
            <Button variant="contained" size="large">Logout</Button>
            </Link>
          </div>
            </Card>
            </Grid>
 
         </Grid>
          { open &&
        <>
         <Grid container rowSpacing={1}>
            <Grid item xs={2}>
                <Card sx={{minWidth: 300,minHeight:650}} className='nav_bar'>
                    <Button sx={{ float:'right'}}variant="outlined" color="error" onClick={()=>{setOpen(false)}}>X</Button>
                    <div className='container'>
                    <ul style={{listStyle:'none',marginTop: '40px'}}>
                    <li>careers</li>
                    <li>about</li>
                    <li>profile</li>
                    <li>privacy</li>
                  </ul>
                    </div>
                  
                </Card>
            </Grid>
        
         </Grid>
        </>
          }
        </>
    )
}

export default Dashboard;