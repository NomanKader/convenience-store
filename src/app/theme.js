'use client'
import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {      
      primary: {
        main: '#a890be',
        contrastText: "#fff"
      },
      secondary:{
        main:'#3688D4'
      },
      accent:{
        main:'#ECF6FF'
      },
      text:{
        main:'#fff'
      },
      success:{
        main:'#008080'
      },
      warning:{
        main:'#FFA700'
      }
    },
  });
  export default theme;