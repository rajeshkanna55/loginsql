import { BrowserRouter,Routes, Route ,Navigate} from 'react-router-dom';
import Welcome from "./welcome";
import Register from './registration';
import Login from './login';
import Dashboard from './dashboard';
import Profile from './profile';
import { Token } from './auth/auth';

function App() {
    

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
         <Route path="/dashboard" element={ Token ? <Dashboard/> : <Navigate to='/login'/> }></Route>
        <Route path="/profile" element={ Token ? <Profile />: <Navigate to='/login'/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
