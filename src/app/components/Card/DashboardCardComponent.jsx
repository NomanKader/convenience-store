import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const DashboardCard = ({ totalSalesAmount }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <MonetizationOnIcon fontSize="large" color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{mb:1}}>Total Sales Amount</Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" color="primary" gutterBottom>
          ${totalSalesAmount.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
