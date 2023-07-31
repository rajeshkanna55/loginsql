import { BrowserRouter,Routes, Route ,Navigate} from 'react-router-dom';
import Welcome from "./welcome";
import Register from './registration';
import Login from './login';
import Dashboard from './dashboard';
import Profile from './profile';
import Accessories from './accessories';
import './App.css';
import Mycarts from './mycarts';
import UserDashboard from './profiledashboard';

function App() {

  
    const token=!!localStorage.getItem('user');


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/profile" element={ token ? <Profile />: <Navigate to='/login'/>}></Route>
        <Route path="/accessories" element={ token ? <Accessories/>: <Navigate to='/login'/>}></Route>
        <Route path="/mycarts" element={ token ? <Mycarts/>: <Navigate to='/login'/>}></Route>
        <Route path="/profile/dashboard" element={token ? <UserDashboard/> : <Navigate to='/login'/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
