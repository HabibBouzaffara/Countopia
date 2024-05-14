import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
const InvoicesJournal = ({ user }) => {
  const [allInvoices, setAllInvoices] = useState([]);
  useEffect(() => {
    if (user.role !== "client") {
      const getJournal = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/getAllJournal`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { allInvoices } = await response.json();
          if (!response.ok) {
            throw new Error(allInvoices.msg);
          }
          setAllInvoices(allInvoices);
          console.log(allInvoices[0]);
        } catch (err) {
          console.log(err);
        }
      };
      getJournal();
    } else {
      setAllInvoices(user.factures);
    }
  }, [user]);

  const rowsWithDash = allInvoices.map((row, index) => ({
    id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
    ...row,
  }));
  const tableHead = Object.keys(allInvoices[0] || {}).filter((key) =>
    user.role === "client"
      ? key !== "client_id" && key !== "assigned" && key !== "_id"
      : key !== "assigned" && key !== "_id"
  );
  const columns = tableHead.map((key) => {
    let column = {
      field: key,
      headerName: key,
      flex: 1,
      align: "center",
      headerAlign: "center",
    };

    // Check if the column is named "date_facture"
    if (key === "date_facture") {
      column.type = "date";
      column.valueFormatter = (params) => {
        return format(new Date(params.value.split(" ")[0]), "MM/dd/yyyy");
      };
    }

    return column;
  });

  return (
    <>
      <Typography
        variant='h3'
        sx={{
          marginLeft: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          color: "#263238",
          fontWeight: "bold",
          flexGrow: 1, // Make the first Typography component expand
        }}
      >
        Invoices Journal Table
      </Typography>
      <DataGrid
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        hideFooterSelectedRowCount
        sx={{
          display: "grid",
          maxHeight: "1000px",
          margin: "15px 15px 15px 15px",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#BFB5FF",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "white",
          },
        }}
        rows={rowsWithDash}
        columns={columns}
      />
    </>
  );
};

export default InvoicesJournal;
