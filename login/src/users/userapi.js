const { get_user } = require("./api")


export const getUser= async (token) => {
    console.log(token);
    try{
        const headers ={
            Authorization: token,  
          }
        const response = await fetch(get_user,{headers});
        return response;  
    }
    catch(err)
    {
        alert('api error');
    }  
}