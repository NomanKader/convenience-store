import {
  ThemeProvider,
  Container,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import DashboardCardComponent from "../../../components/Card/DashboardCardComponent";
import userData from "../../../data/user_data";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import axios from "axios";
import dayjs from "dayjs";
import GetDashboardDataAPI from "../../../api/dashboard/DashboardController";
import DashboardStockCardComponent from "../../../components/Card/DashboardStockCardComponent";
import DashboardSaleReportCardComponent from "../../../components/Card/DashhboardSaleReportCardComponent";

// TODO remove, this demo shouldn't need to reset the theme.
export default function DashboardPage({ history }) {
  const [dashboardData, setDashboardData] = useState([]);
  const [stockData, setStockData] = useState(0);
  const [showStockData, setShowStockData] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [salesData, setSalesData] = useState([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [showTable, setShowTable] = useState(true);
  console.log(userData.User_Role);
  useEffect(() => {
    const getUserRole = () => {
      const userRole = sessionStorage.getItem("UserRole");
      if (userRole == null) {
        history.push("/");
      } else {
        GetDashboardDataAPI(setDashboardData);
        //getting product list
        axios
          .get(process.env.REACT_APP_API_ENDPOINT + "product")
          .then((response) => {
            setProducts(response.data.products);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
        //getting sale report by today date
        handleSaleReport();
      }
    };

    getUserRole();
  }, []);
  const handleStock = () => {
    console.log("Product", product);
    //getting product stock quantity by product name
    axios
      .get(
        process.env.REACT_APP_API_ENDPOINT +
          "product/quantity/" +
          product.Product_Name
      )
      .then((response) => {
        setStockData(response.data.availableQuantity);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    setShowStockData(true);
  };
  const handleSaleReport = () => {
    setShowTable(false);    
    const from_date = dayjs(fromDate).format("YYYY-MM-DD");;
    const to_date =dayjs(toDate).format("YYYY-MM-DD");;
    setSalesData([]);
    // Fetch sales data based on fromDate and toDate
    axios
      .get(
        process.env.REACT_APP_API_ENDPOINT +
          "sale/between-dates?FromDate=" +
          from_date +
          "&ToDate=" +
          to_date
      )
      .then((response) => {
        console.log("Sale Data", response.data.sales);
        setSalesData(response.data.sales);
        let totalAmount = 0;
        response.data.sales.map(({ total_price }) => {
          totalAmount += parseInt(total_price || 0);
        });
        setTotalSaleAmount(totalAmount);
        setShowTable(true);
        console.log("Total Amount", totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  };

  const handleFromDateChange = (newValue) => {
    setFromDate(newValue);
  };

  const handleToDateChange = (newValue) => {
    setToDate(newValue);
  };
  const columns = [
    {
      name: "product_name",
      label: "Product Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "category_name",
      label: "Category",
    },
    {
      name: "total_price",
      label: "Total",
    },
  ];

  const options = {
    selectableRows: "none",
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBarDrawerComponent history={history} title="Dashboard">
        <Container
          sx={{
            mt: 4,
            mb: 4,
            ml: 0,
            flex: 1,
            flexDirection: "row",
            display: "flex",
          }}
        >
          <Grid container spacing={3} sx={{ flexDirection: "row" }}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={4}>
              <DashboardCardComponent
                title="Daily Sales"
                data={parseInt(dashboardData.totalSaleAmount || 0)}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DashboardCardComponent
                title="Best Seller"
                data={dashboardData.bestSellerProduct}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DashboardCardComponent
                title="Low Stock"
                data={dashboardData.lowStockProducts}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={2}>
              <Autocomplete
                id="product-autocomplete"
                options={products}
                getOptionLabel={(option) => option.Product_Name}
                sx={{ width: { lg: "100%", xs: "80%" }, mt: 1 }}
                value={product}
                onChange={(event, newValue) => setProduct(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product"
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button
                disabled={product == null}
                variant="contained"
                sx={{ mt: { xs: 1, lg: 4 } }}
                onClick={() => handleStock()}
              >
                Check Stock
              </Button>
            </Grid>
            {/* Show Stock Card */}
            <Grid item xs={12} lg={12}>
              <DashboardStockCardComponent title="Quantity" data={stockData} />
            </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="From Date" onChange={(value)=>handleFromDateChange(value)} />
                </LocalizationProvider>
              </Grid>              
              <Grid item xs={12} sm={6} md={4} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="To Date" onChange={(vale)=>handleToDateChange(vale)} />
                </LocalizationProvider>
              </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleSaleReport()}
              >
                Sale Report
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <DashboardSaleReportCardComponent title='Total Sales' data={totalSaleAmount}/>
            </Grid>
            {/* MUI Datatable to display sales data */}
            {showTable && (
              <Grid item xs={12} md={12} lg={12}>
                <MUIDataTable
                  title={
                    fromDate == null && toDate == null
                      ? "Sales Report By Today"
                      : "Sales Data By Date"
                  }
                  data={salesData}
                  columns={columns}
                  options={options}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </AppBarDrawerComponent>
    </ThemeProvider>
  );
}
