import { Grid,Card,Stack} from "@mui/material";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddIcon from '@mui/icons-material/Add';
import pic from './assets/HD-wallpaper-forest-flora-forest-vithurshan-dark-europe-faded-green-leaf-mood-moody-sri-lanka-vithurshan-jpeg-wood-thumbnail.jpg'
export function Accessories(){
   const list = [
    {id:1,pic: pic },
    {id:2,pic: pic },
    {id:3,pic: pic },
    {id:4,pic: pic },
    {id:5,pic: pic },
    {id:6,pic: pic },
    {id:7,pic: pic },
    {id:8,pic: pic },
    {id:9,pic: pic },
    {id:10,pic: pic },
    {id:11,pic: pic },
    {id:12,pic: pic },
    {id:13,pic: pic },
    {id:14,pic: pic },
    {id:15,pic: pic },
    {id:16,pic: pic },
    {id:17,pic: pic },
    {id:18,pic: pic },
    {id:19,pic: pic },
    {id:20,pic: pic }
    ];
    return (
      <>
        <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Navbar />
          </Grid>
          <Grid item md={2} lg={2}>
            <Sidebar />
          </Grid>
          <Grid xs={11} md={9} lg={9} sx={{marginTop: '20px',marginLeft:'20px'}} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <p>Top Bar</p>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {list.map((val, index) => (
                    <Grid item xs={12} sm={4} md={2} lg={2}>
                      <Card>
                        <p>Products</p>
                        <img
                          src={val.pic}
                          style={{ width: "100%", height: "100px" }}
                        ></img>
                        <p>{val.id}</p>
                      </Card>
                    </Grid>
                  ))}
                 <Grid item xs={12} sm={4} md={2} lg={2}>
                      <Card >
                       
                        <h3 style={{color : "rgb(134,110,199)",textAlign: 'center'}}>Add <AddIcon /></h3>
                      </Card>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}

export default Accessories;