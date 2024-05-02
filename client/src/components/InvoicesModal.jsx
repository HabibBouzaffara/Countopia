import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { CloseFullscreen } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const InvoicesModal = ({ open, handleClose, invoices }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
        }}
      >
        {invoices.length > 0 && (
          <Typography
            id='modal-title'
            variant='h6'
            component='h2'
            gutterBottom
            marginLeft='10px'
          >
            Invoices:
          </Typography>
        )}
        {invoices.length > 0 ? (
          <div style={{ maxWidth: "lg" }}>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: "fixed",
                right: 130,
                marginTop: "-40px",
                color: "grey",
                backgroundColor: "rgba(191,181,255,0.5)",
              }}
            >
              <CloseFullscreen />
            </IconButton>
            <DataGrid
              sx={{
                maxHeight: "600px",
                marginBottom: "10px",
                borderRadius: "20px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#BFB5FF",
                },
              }}
              rows={invoices.map((item, index) => ({
                ...item,
                id: item._id,
              }))}
              columns={[
                {
                  field: "date_facture",
                  headerName: "Date Facture",
                  width: 110,
                },
                { field: "description", headerName: "Description", width: 150 },
                { field: "nom_unite", headerName: "Nom Unite", width: 105 },
                { field: "nombre_unit", headerName: "Nombre Unit", width: 105 },
                { field: "prix_unit", headerName: "Prix Unit", width: 105 },
                { field: "total_unit", headerName: "Total Unit", width: 105 },
                { field: "total_net", headerName: "Total Net", width: 105 },
                { field: "taxe", headerName: "Taxe", width: 90 },
                { field: "total", headerName: "Total", width: 100 },
                { field: "num_facture", headerName: "Num Facture", width: 120 },
                { field: "category", headerName: "Categorie", width: 90 },
              ]}
            />
          </div>
        ) : (
          <div>
            <Typography fontSize='16px' textAlign='center'>
              This client has no invoices yet.
            </Typography>
            <Box display='flex' justifyContent='center'>
              <Button
                onClick={handleClose}
                variant='contained'
                sx={{
                  backgroundColor: "#BFB5FF",
                  color: "white",
                  borderRadius: "15px",
                  width: "60px",
                  marginTop: "20px",
                }}
              >
                OK
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default InvoicesModal;
