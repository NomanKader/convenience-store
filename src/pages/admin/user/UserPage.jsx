import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import UserFormComponent from "../../../components/User/UserFormComponent";
import { useEffect } from "react";
export default function UserPage({history}){
    useEffect(()=>{
        if(sessionStorage.getItem('UserRole')==null){
            history.push('/')        
        }
    },[])
    return(
        <ThemeProvider theme={theme}>
            <AppBarDrawerComponent title="User Setting" history={history}>
                <UserFormComponent/>
            </AppBarDrawerComponent>    
        </ThemeProvider>
    )
}