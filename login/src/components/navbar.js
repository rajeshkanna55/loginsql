import { Card ,Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <>
       <Card sx={{height:'50px'}}>
       <div style={{float:'right'}}>
        <Link to={'/'}>
         <Button variant="contained" size="medium">Logout</Button>
         </Link>
       </div>
         </Card>
        </>
    )
}

export default Navbar;