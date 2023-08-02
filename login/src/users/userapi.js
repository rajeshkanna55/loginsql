const { get_user, edit_user } = require("./api")


export const getUser= async (token) => {
    try{
        const headers ={
            Authorization: token,  
          }
        const response = await fetch(get_user,{headers});
        return await response.json();  
    }
    catch(err)
    {
        alert('api error');
    }  
}

export const userEdit= async (formdata) => {
    try{
       console.log(formdata);
        const token = localStorage.getItem('user');
        const headers ={
            Authorization: token, 
            'Content-Type': 'application/json' 
          }
        const response = await fetch(edit_user,{ method:'POST',mode:'cors',headers,body:JSON.stringify(formdata), });
        return await response.json(); 
    }
    catch(err)
    {
        alert(err.message);
    }
}