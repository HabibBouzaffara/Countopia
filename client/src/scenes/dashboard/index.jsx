import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Select, MenuItem } from "@mui/material";
import RevenueRateBar from "./RevenueRateBar";
import RevenuePie from "./RevenuePie";
import ProfitExpenses from "./ProfitExpenses";
import ProductsList from "./ProductsList";
import SalesQuantityChart from "./SalesQuantityChart";
import InvoicesCountChart from "./InvoicesCountChart";
import ExpensesPie from "./ExpensesPie";
import ClientCard from "./ClientCard";
import ProgressCircle from "scenes/ProgressCircle";
import wait from "../../assets/stats.png";

const Dashboard = ({ user }) => {
  const [allClients, setAllClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [bestSeller, setBestSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user.role !== "client") {
      const getAllClients = async () => {
        try {
          const url = new URL(process.env.REACT_APP_BASE_URL + "/clients");

          const token = localStorage.getItem("token");
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

          const clientsResponse = await fetch(url, {
            method: "GET",
            headers: headers, // Pass headers object
          });

          const data = await clientsResponse.json();
          if (!clientsResponse.ok) {
            throw new Error(data.msg);
          }
          setSelectedClient(data[data.length - 1]);
          setAllClients(data);
        } catch (err) {
          console.log(err);
        }
      };
      getAllClients();
    } else {
      setSelectedClient(user);
    }
  }, [user]);
  const calculateBestSeller = () => {
    const bestSeller = {};

    // Iterate over each item in the facture array
    selectedClient.factures.forEach((invoice) => {
      // Check if nom_unit is empty or undefined
      if (!invoice.nom_unit || invoice.nom_unit.trim() === "") {
        return; // Skip this invoice if nom_unit is empty or undefined
      }
      // Preprocess date_facture to ensure it has the format mm/dd/yyyy
      const formattedDate = invoice.date_facture.split(" ")[0]; // Remove extra characters after the year
      const parts = formattedDate.split("/");
      const month = parseInt(parts[0]) - 1; // Months are zero-based, so subtract 1
      // Accumulate nombre_unit for each nom_unit
      const { nom_unit, nombre_unit, prix_unit } = invoice;
      const parsedNombreUnit = parseFloat(nombre_unit);
      const parsedPrixUnit = parseFloat(prix_unit);
      if (!bestSeller[nom_unit]) {
        bestSeller[nom_unit] = {
          totalNombreUnit: parsedNombreUnit,
          prix_unit: parsedPrixUnit,
          monthlyUnits: new Array(12).fill(0), // Initialize an array to hold monthly units
        };
      } else {
        bestSeller[nom_unit].totalNombreUnit += parsedNombreUnit;
      }
      // Add nombre_unit to the corresponding month
      bestSeller[nom_unit].monthlyUnits[month] += parsedNombreUnit;
    });

    // Convert object to array of objects for sorting
    const bestSellerArray = Object.entries(bestSeller).map(
      ([nom_unit, data]) => ({ nom_unit, ...data })
    );

    // Sort the array by totalNombreUnit in descending order
    bestSellerArray.sort((a, b) => b.totalNombreUnit - a.totalNombreUnit);

    // Get the top 3 best sellers
    const top3BestSellers = bestSellerArray.slice(0, 3);
    setBestSeller(top3BestSellers);
  };
  if (selectedClient && !bestSeller) {
    calculateBestSeller();
  }
  const handleClientChange = (event) => {
    const clientId = event.target.value;
    const selectedClient = allClients.find((client) => client._id === clientId);
    setSelectedClient(selectedClient);
  };
  if (selectedClient && bestSeller && loading) {
    setLoading(false);
  }

  if (selectedClient && !loading && selectedClient.factures.length === 0) {
    return (
      <Box textAlign='center' mt={8}>
        {user.role !== "client" && (
          <Box>
            <Select
              defaultValue={selectedClient._id}
              onChange={handleClientChange}
              style={{
                fontWeight: "bold",
                color: "#323DB3",
                borderRadius: "20px",
                width: "150px",
                marginBottom: "20px",
              }}
            >
              {allClients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
            <Typography
              variant='h4'
              gutterBottom
              style={{ color: "#BFB5FF", fontWeight: "bold" }}
            >
              Chnage Client
            </Typography>
          </Box>
        )}
        <img width={340} src={wait} alt='logo' />
        <Typography
          variant='h1'
          gutterBottom
          style={{ color: "#BFB5FF", fontWeight: "bold" }}
        >
          Status Pending
        </Typography>
        <Typography
          variant='h2'
          style={{ color: "#323DB3", fontWeight: "bold", fontSize: "30px" }}
        >
          This Client either have no Invoices yet
        </Typography>
        <Typography
          variant='h2'
          style={{ color: "#323DB3", fontWeight: "bold", fontSize: "30px" }}
        >
          or Invoices are being processed by the admin.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: "80vh",
          }}
        >
          <ProgressCircle size={170} />
          <Typography
            variant='body1'
            sx={{ marginTop: "20px", fontSize: "30px" }}
          >
            Loading...
          </Typography>
          <Typography
            variant='body1'
            sx={{ marginTop: "20px", fontSize: "30px" }}
          >
            Retriving Client Data ...
          </Typography>
        </Box>
      )}
      {!loading && (
        <Box
          sx={{
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant='h2'
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
            {user.role !== "client" && (
              <Grid item xs={12} md={4}>
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
                    padding: "20px",
                  }}
                >
                  {allClients && (
                    <Box
                      position='absolute'
                      marginTop={"-200px"}
                      marginLeft={"250px"}
                      fontWeight='bold'
                      borderRadius='20px'
                      padding='5px'
                    >
                      <Select
                        defaultValue={selectedClient ? selectedClient._id : ""}
                        onChange={handleClientChange}
                        style={{
                          fontWeight: "bold",
                          color: "#323DB3",
                          borderRadius: "20px",
                        }}
                      >
                        {allClients.map((client) => (
                          <MenuItem key={client._id} value={client._id}>
                            {client.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  )}
                  <ClientCard selectedClient={selectedClient} />
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={user.role !== "client" ? 7.6 : 11.6}>
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
                  variant='h5'
                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  Profit & Expenses
                </Typography>
                <ProfitExpenses factures={selectedClient.factures} />
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
                  variant='h5'
                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  Total Revenue
                </Typography>
                <RevenueRateBar factures={selectedClient.factures} />
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
                  variant='h5'
                  sx={{ fontWeight: "bold", marginBottom: "30px" }}
                >
                  Sales VS Purchases
                </Typography>
                <RevenuePie factures={selectedClient.factures} />
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
                  variant='h5'
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  Best Sellers
                </Typography>
                <ProductsList bestSeller={bestSeller} />
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
                  variant='h5'
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "15px",
                    marginTop: "-10px",
                  }}
                >
                  Invoices
                </Typography>
                <Grid item xs={12} md={6}>
                  <InvoicesCountChart factures={selectedClient.factures} />
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
                  variant='h5'
                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  Expenses Distributions
                </Typography>
                <ExpensesPie factures={selectedClient.factures} />
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
                  variant='h5'
                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  Products Vs Quantities
                </Typography>

                <SalesQuantityChart quantitiesRate={bestSeller} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
