import { Grid,Card,Autocomplete,TextField,Radio,Switch,Button, FormControl} from "@mui/material";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export function Profile(){
  const navigate =useNavigate();
    const [skill,setSkill] = useState([]),
          [fullname,setFullname] = useState(''),
          [age,setAge] = useState(""),
          [gender,setGender] =  useState(''),
          [address,setAddress] = useState(''),
          [on,setOn] = useState(false),
          [error,setError] = useState(false);
     
       
   
    const skills=['javascript','html','css','nodejs','python','java','php','c#','c++','c','mongodb','mysql'];
 
    const token = localStorage.getItem('user');


    const handleChange = (event) => {
        setGender(event.target.value);
      };


    const label={inputProps: { 'aria-label': 'Size switch demo' }};


    const controlProps = (item) => ({
        checked: gender === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
      });

   const save=(e)=>{
    e.preventDefault();
         const details={
          person_id: 1,
            fullname:fullname,
            skill:skill,
            age:age,
            gender:gender,
            address: address,
            on:on  
         }   
        if(
          details.fullname === '' ||
          details.skill===[] ||
          details.age==="" ||
          details.gender === '' ||
          details.address === ''
          )
        {
          setError(true);
        }
        else{
          const uri='http://localhost:4000/profile/details';
          fetch(uri, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Authorization:  token 
            },
            body: JSON.stringify(details)
          }).then(async (res)=>{
              if(res.status=== 200)
              {
                alert('profile stored');
                navigate('/dashboard');
              }
              else{
                alert('bad request');
              }
          }).catch(err=>alert(err.message))
        }
   };
      
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Card sx={{ marginLeft: "20px", marginTop: "20px" }}>
              <form onSubmit={save}>
                {error ? (
                  <h3 style={{ textAlign: "center", color: "red" }}>
                    Please Fill The Details
                  </h3>
                ) : (
                  <h3 style={{ textAlign: "center" }}>Enter The Details</h3>
                )}
                <Grid container>
                  <Grid item xs={6}>
                    <div style={{ padding: "20px" }}>
                      <TextField
                        fullWidth
                        label="Fullname"
                        onChange={(e) => {
                          setFullname(e.target.value.trim());
                        }}
                        id="fullWidth"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ padding: "20px" }}>
                      <Autocomplete
                        sx={{ color: "black" }}
                        multiple
                        id="tags-standard"
                        options={skills}
                        getOptionLabel={(option) => option}
                        // defaultValue={[skills[3]]}

                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="skills"
                            placeholder="Search"
                          />
                        )}
                        onChange={(event, value) => {
                          setSkill(value);
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ padding: "20px" }}>
                      <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        id="fullWidth"
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h5 style={{ marginTop: "6px" }}>Gender:</h5>
                      <p style={{ marginLeft: "20px" }}>
                        Male
                        <Radio {...controlProps("Male")} />
                      </p>
                      <p>
                        Female
                        <Radio
                          {...controlProps("Female")}
                          sx={{
                            color: "pink",
                            "&.Mui-checked": {
                              color: "pink",
                            },
                          }}
                        />
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                  <div style={{ padding: "20px" }}>
                      <TextField
                        fullWidth   
                        multiline
                         rows={4}
                        label="Address"
                        onChange={(e) => {
                          setAddress(e.target.value.trim());
                        }}
                        id="standard-multiline-static"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ padding: "20px" }}>
                      <p>
                        Details Are True
                        <Switch
                          {...label}
                          checked={on}
                          onChange={(e) => {
                            setOn(e.target.checked);
                          }}
                        />
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <Button type="submit" variant="contained">
                        Save
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </>
    );
}

export default Profile;