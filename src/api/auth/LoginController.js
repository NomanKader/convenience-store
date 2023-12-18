import axios from 'axios';
import userData from '../../data/user_data';
const LoginAPI=async(postBody,history)=>{
    await axios.post(process.env.REACT_APP_API_ENDPOINT+'login',postBody)
    .then((res)=>{
        if(res.status===200){
            userData.User_ID=res.data.user.User_ID;
            userData.User_Name=res.data.user.User_Name;
            userData.User_Role=res.data.user.User_Role;    
            sessionStorage.setItem('UserRole',userData.User_Role);
            const routePath=userData.User_Role==='manager'?'/manager/dashboard':'cashier/sale';          
            history.push(routePath)
        }
    }).catch((err)=>{
        console.log(err);        
    })
}
export default LoginAPI;    