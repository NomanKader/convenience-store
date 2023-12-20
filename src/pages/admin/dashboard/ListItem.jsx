import  React,{useEffect} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  CategoryOutlined,
  AccountCircleOutlined,
  ProductionQuantityLimits,
  SellOutlined,
} from "@mui/icons-material";
import userData from "../../../data/user_data";

export const mainListItems = (history) => (
  <React.Fragment>
    {sessionStorage.getItem('UserRole')=='manager' ? (
      <>
        <ListItemButton onClick={() => history.push("/manager/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => history.push("/manager/category")}>
          <ListItemIcon>
            <CategoryOutlined />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItemButton>
        <ListItemButton onClick={() => history.push("/manager/stock")}>
          <ListItemIcon>
            <ProductionQuantityLimits />
          </ListItemIcon>
          <ListItemText primary="Product" />
        </ListItemButton>
        <ListItemButton onClick={() => history.push("/manager/report")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItemButton>
      </>
    ) : (
      <ListItemButton onClick={() => history.push("/cashier/sale")}>
        <ListItemIcon>
          <SellOutlined />
        </ListItemIcon>
        <ListItemText primary="Sale" />
      </ListItemButton>
    )}
  </React.Fragment>
);

export const secondaryListItems = (history) =>
  sessionStorage.getItem("UserRole") == "manager" && (
    <React.Fragment>
      <ListItemButton onClick={() => history.push("/manager/user")}>
        <ListItemIcon>
          <AccountCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </React.Fragment>
  );
