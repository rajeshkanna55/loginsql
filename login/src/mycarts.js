import {Paper,Stack,CardMedia,Grid,Card,Autocomplete,TextField,Radio,Switch,Button,CardContent,Rating,CardActions, FormControl,Box,Divider, Tabs} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export function Mycarts(){
  const [value, setValue] = useState("1"),
        [list, setList] = useState([]),
        [total,setTotal] = useState('');
  const token = localStorage.getItem("user");
  const getMycarts = () => {
    const url = "http://localhost:4000/products/mycarts";
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
        setTotal(json.total);
      })
      .catch((err) => alert("Unable to process"));
  };

  useEffect(() => {
    getMycarts();
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleRemove = (val) => {
        const cart = {
         product_id: val.id,
          isCart: null,
        };
             const cart_url = "http://localhost:4000/products/addcart";
    fetch(cart_url, {
               method: "POST",
               mode: "cors",
               headers: {
                   "Content-Type": "application/json",
                    Authorization: token,
                        },
               body: JSON.stringify(cart),
                   })
                  .then(async (res) => {
                        const response = await res.json();
                    if (response.message === "Success") 
                    {
                     getMycarts();
                    }
                     else
                    {
                      alert("something went wrong");
                    }
                     })
                   .catch((err) => alert(err));
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        {/* <Grid item xs={2}>
          <Sidebar />
        </Grid> */}
        <Grid item xs={12} sx={{ position: "relative", top: 60 }}>
          <Card>
            <Box sx={{ minHeight: "92vh", typography: "body1" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    position: "fixed",
                    zIndex: 1,
                    backgroundColor: "rgb(134,110,199)",
                    width: "100%",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    centered
                    TabIndicatorProps={{
                      style: {
                        color: "white",
                        backgroundColor: "white", // Set the color you want for the indicator
                      },
                    }}
                  >
                    <Tab
                      sx={{
                      
                        color: "white",
                        "&.Mui-selected": { color: "white" },
                      }}
                      label="My Carts"
                      value="1"
                    />
                    <Tab
                      sx={{
                        
                        color: "white",
                        "&.Mui-selected": { color: "white" },
                      }}
                      label="My Orders"
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ position: "relative", top: 40 }}>
                  <Grid container spacing={1}>
                  {list.map((val, index) => (
                    <Grid item xs={6} sm={4} md={4} lg={2} key={val.id}>
                      <Card>
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
                          <Button
                            variant="contained"
                            sx={{
                              color: "white",
                              backgroundColor: "purple",
                              "&:hover": {
                                color: "white",
                                backgroundColor: "purple",
                              },
                            }}
                            onClick={() => handleRemove(val)}
                          >
                            Remove
                          </Button>
                         <Button variant="contained" color="success">
                          Buy
                        </Button>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                  <div className='container' style={{position:'fixed',top:'88vh',left:'4%',display:'flex',justifyContent: 'space-between',padding:'10px',boxShadow :"0px 5px 10px grey"}}>
                   <h4 style={{fontWeight:'bold',position:'relative',top:'1vh'}}>Total Of Products</h4>
                  <div style={{display:'flex'}}>
                    <h3 style={{fontWeight:'bold',position:'relative',top:'1vh',right:'5%'}}><CurrencyRupeeIcon/>{total}</h3>
                   <Button sx={{ fontWeight:'bold', color: "white",backgroundColor: "rgb(134,110,199)", "&:hover": {color: "white",backgroundColor: "rgb(134,110,199)",}}} size="small" >Place Order</Button>
                   </div>
                  </div>
                  </Grid>
                </TabPanel>
                <TabPanel value="2" sx={{ position: "relative", top: 40 }}>
                  My Orders
                </TabPanel>
              </TabContext>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Mycarts;