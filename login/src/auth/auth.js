import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider=({component})=>{
       const [user,setUser] = useState(null);

   const login=(user)=>{
    setUser(user);
   }

   const logout=()=>{
    setUser(null);
   }
   return (
     <AuthContext.Provider value={{ user, login, logout }}>
       {component}
     </AuthContext.Provider>
   );
}

export const useAuth=()=>{
  return useContext(AuthContext);
}

export const Token=()=>{
   
    const isToken= localStorage.getItem('users');
    if(isToken==='undefined')
    {
      return true;
    }
    else{
      return false;
    }
     
}