
import { Grid, Card ,Button} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Link} from 'react-router-dom';



function App() {
  
 
  return (
    <div className="App">
      <div className="container">
        <Grid container >
      <Grid item xs={12}   >
      <Card sx={{ minHeight: 300, marginTop: "250px" }}>
      <h1 className='nav_content'> Go to login </h1>
      <h4 className='nav_content_main'> welcome to the website here click to enter the website</h4>
       <div className='container' id="test" >
       <Link to={'/register'}>
      <Button variant="contained" size="large">Enter</Button>
      </Link>
       </div>
      </Card>
       </Grid>
      </Grid>
      </div>   
    </div>
  );
}

export default App;
