import { Grid,Card,Stack,Rating,Button,Backdrop, CardContent, CardActions,CardMedia} from "@mui/material";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './accessories.css';
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from  'react-loader-spinner'

export function Accessories(){
      const token = localStorage.getItem('user');
     const [list,setList] = useState([]),
           [loading,setLoading] = useState(false);

         const navigate= useNavigate();
         const get_products=()=>{
            
           const url='http://localhost:4000/products/acssesories/getall';
           fetch(url,{
             method : 'GET',
             mode: 'cors',
            headers: {
              Authorization : token,
             },
           })
           .then( res => res.json())
           .then( json =>{
               setList(json.data);
           });
          
         }   
           useEffect(()=>{
          
            get_products();
           
           },[]);

           const handleCart=(val)=>{
             setLoading(true);
                  const cart = {
                    product_id: val.id,
                    isCart: true,
                  };
                  const cart_url= 'http://localhost:4000/products/addcart';
                  fetch(cart_url,{
                    method: 'POST',
                    mode: 'cors',
                    headers:{
                      'Content-Type': 'application/json',
                      Authorization:token,
                    },
                    body: JSON.stringify(cart)
                  }).then( async (res) => {
                        const response = await res.json();
                        if(response.message === 'Success')
                        {
                          setLoading(false);
                           get_products();
                           
                        }
                        else{
                             alert('something went wrong');
                        }
                  }).catch(err => alert('Unable to process your request'));
           }
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <InfinitySpin width="200" color="white" />
        </Backdrop>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Navbar />
          </Grid>
          {/* <Grid item xs={1} sm={2} md={3} lg={2}>
            <Sidebar />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    position: "fixed",
                    width: "100%",
                    top: "8vh",
                    zIndex: 1,
                  }}
                >
                  <p>Top Bar</p>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {list.map((val, index) => (
                    <Grid item xs={6} sm={4} md={4} lg={2} key={val.id}>
                      <Card sx={{ position: "relative", top: "14vh" }}>
                        <CardMedia
                          sx={{
                            height: 200,
                            backgroundSize: "200px 200px",
                            backgroundPosition: "center",
                          }}
                          image={val.product_image}
                          title={val.product_name}
                        />

                        {/* <img
                                src={val.product_image}
                                style={{ width: "90%", height: "150px" }}
                                alt={val.product_name}
                              ></img> */}
                        <div className="container">
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            textAlign: "start",
                            marginBottom: '0px'
                          }}
                        >
                          {val.product_name}
                        </p>

                        <p
                          style={{
                            textAlign: "start",
                            fontWeight: "bold",
                            fontSize: "30px",
                            marginBottom: '0px'
                          }}
                        >
                          <CurrencyRupeeIcon />
                          {val.product_prize}
                        </p>
                      
                        <Rating
                          name="size-small"
                          defaultValue={2}
                          size="small"
                        ></Rating>
                        </div>
                        <div className='container' style={{display: 'flex',justifyContent:'space-between',marginBottom:'1vh'}}>
                        {val.isCart === null || val.isCart === 0 ? (
                          <Button
                            variant="contained"
                            onClick={() => handleCart(val)}
                          >
                            Cart
                          </Button>
                        ) : (
                          <Button
                            className="red_bull"
                            sx={{
                              color: "white",
                              backgroundColor: "purple",
                              "&:hover": {
                                color: "white",
                                backgroundColor: "purple",
                              },
                            }}
                            onClick={() => navigate("/mycarts")}
                          >
                            MyCart
                          </Button>
                        )}

                        <Button variant="contained" color="success">
                          Buy
                        </Button>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}

export default Accessories;