import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import RevenueRateBar from "./RevenueRateBar";
import RevenuePie from "./RevenuePie";
import ProfitExpenses from "./ProfitExpenses";
import ProductsList from "./ProductsList";
import TaxPie from "./TaxPie";
import SalesQuantityChart from "./SalesQuantityChart";
import Invoices from "./Invoices";

const Dashboard = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{ 
          color: "#263238",
          fontWeight: "bold",
          marginLeft: "50px",
          marginBottom: "10px",
        }}
      >
        Statistics
      </Typography>
      <Grid container spacing={2} sx={{ paddingLeft: "40px" }}>
        <Grid item xs={12} md={11.6}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Profit & Expenses
            </Typography>
            <ProfitExpenses />
          </Box>
        </Grid>

        <Grid item xs={12} md={7.6}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Total Revenue
            </Typography>
            <RevenueRateBar />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Sales VS Purchases
            </Typography>
            <RevenuePie />
          </Box>
        </Grid>
        <Grid item xs={12} md={6.6}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Best Sellers
            </Typography>
            <ProductsList />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
                marginTop: "-10px",
              }}
            >
              Invoices
            </Typography>
            <Grid item xs={12} md={6}>
              <Invoices />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Tax Distributions
            </Typography>
            <TaxPie />
          </Box>
        </Grid>
        <Grid item xs={12} md={7.6}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderRadius: "20px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Products Vs Quantities
            </Typography>
            <SalesQuantityChart />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
