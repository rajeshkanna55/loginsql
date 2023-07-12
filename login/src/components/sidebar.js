import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import './sidebar.css';
const Sidebar=()=>{
    return(
        <>
         <Card sx={{height:'37rem',marginTop:'10px'}}>
                    <div className='container'>
                    <ul style={{listStyle:'none'}}>
                    <li><AutoGraphIcon/>careers</li>
                    <li><ContentPasteSearchIcon/>about</li>
                    <Link to={'/profile'} style={{textDecoration:'none',color:'black'}}>
                    <li>
                    <AccountCircleIcon/>profile</li>
                    </Link>
                    <li><ArticleIcon/>privacy</li>
                  </ul>
                    </div>
                  
                </Card></>
    )
}
export default Sidebar;