import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import StockComponent from "../../../components/Stock/StockComponent";
import { useEffect } from "react";

export default function StockPage({history}){
    useEffect(()=>{
        if(sessionStorage.getItem('UserRole')==null){
            history.push('/')        
        }
    },[])
    return(
        <ThemeProvider theme={theme}>
            <AppBarDrawerComponent history={history} title="Product">
                <StockComponent/>
            </AppBarDrawerComponent>
        </ThemeProvider>
    )
}