import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Icon,
  Button,
} from "@mui/material";
import { CloseFullscreen } from "@mui/icons-material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Delete } from "@mui/icons-material";
import AssignInvoices from "./AssignInvoices";
import { format } from "date-fns";
import CustomSnackbar from "scenes/CustomSnackBar";

const Journal = ({ user }) => {
  const [journal, setJournal] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [checkedRows, setCheckedRows] = useState([]);
  const [dialogs, setDialogs] = useState({
    confirmation: false,
    assignInvoices: false,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [confirmAssignMessage, setConfirmAssignMessage] = useState("");

  if (confirmAssignMessage !== "" && !openAlert) {
    setOpenAlert(true);
    setAlertMessage(confirmAssignMessage);
    if (confirmAssignMessage === "Invoices assigned successfully to client") {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }

  const handleAssignClick = useCallback(() => {
    const selectedRows = selectedItems.filter((item) =>
      checkedRows.includes(item._id)
    );
    setSelectedRows(selectedRows);

    setDialogs((prevState) => ({ ...prevState, assignInvoices: true }));
  }, [selectedItems, checkedRows, setDialogs, setSelectedRows]);

  const handleConfirmAssign = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignInvoices: false }));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }, []);

  const handleCancelAssign = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignInvoices: false }));
  }, []);

  const deleteJournal = async (journalId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteJournal?journalId=${journalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setAlertMessage(result.msg || "Failed to delete journal");
        setErrorMessage(true);
        setOpenAlert(true);
      }
      console.log(result);
      setAlertMessage("Journal deleted successfully");
      setErrorMessage(false);
      setOpenAlert(true);
      setJournal(journal.filter((journal) => journal._id !== journalId));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteJournal = (journalId) => {
    deleteJournal(journalId);
  };

  useEffect(() => {
    const getJournal = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/getJournal?userId=${user._id}&userRole=${user.role}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { journals } = await response.json();
        if (!response.ok) {
          throw new Error(journals.msg);
        }
        setJournal(journals);
        console.log(journals);
      } catch (err) {
        console.log(err);
      }
    };
    getJournal();
  }, [user]);

  const handleViewItems = (items, id) => {
    setSelectedItems(items);
    items.reduce((acc, item) => {
      acc[item._id] = item.assigned;
      return acc;
    }, {});

    setInvoiceId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customToolbar = () => {
    return (
      <GridToolbarContainer sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <GridToolbar />
      </GridToolbarContainer>
    );
  };

  if (!journal) return null;

  return (
    <>
      <div
        style={{
          maxHeight: "800px",
          width: "81%",
          margin: "auto",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        <DataGrid
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10, 25, 50]}
          hideFooterSelectedRowCount
          sx={{
            maxHeight: "700px",
            borderRadius: "20px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#BFB5FF",
            },
          }}
          rows={journal.map((entry, index) => ({
            ...entry,
            id: entry._id,
            itemsLength: "Invoices: " + entry.items.length,
          }))}
          columns={[
            { field: "id", headerName: "Id", width: 190 },
            {
              field: "date",
              headerName: "Date",
              width: 130,
              valueFormatter: (params) => {
                return format(new Date(params.value), "MM/dd/yyyy");
              },
            },
            { field: "fileName", headerName: "File Name", width: 170 },
            { field: "adminName", headerName: "Admin Name", width: 140 },
            {
              field: "itemsLength",
              headerName: "Informations",
              width: 130,
            },
            {
              field: "view",
              headerName: "View",
              width: 70,
              renderCell: (params) => (
                <IconButton
                  onClick={() =>
                    handleViewItems(params.row.items, params.row.id)
                  }
                >
                  <Icon>
                    <OpenInNewOutlinedIcon />
                  </Icon>
                </IconButton>
              ),
            },
            {
              field: "action",
              headerName: "Action",
              width: 70,
              renderCell: (params) => (
                <IconButton onClick={() => handleDeleteJournal(params.row.id)}>
                  <Icon>
                    <Delete />
                  </Icon>
                </IconButton>
              ),
            },
          ]}
        />
      </div>

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
            width: "95%",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <Typography
            id='modal-title'
            variant='h6'
            component='h2'
            gutterBottom
            marginLeft='10px'
          >
            Invoices:
          </Typography>
          <div style={{ maxWidth: "lg" }}>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: "fixed",
                right: 50,
                marginTop: "-40px",
                color: "grey",
                backgroundColor: "rgba(191,181,255,0.5)",
              }}
            >
              <CloseFullscreen />
            </IconButton>
            <DataGrid
              slots={{ toolbar: customToolbar }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              autoHeight
              sx={{
                marginBottom: "10px",
                borderRadius: "0 0 20px 20px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#BFB5FF",
                },
              }}
              rows={selectedItems.map((item, index) => ({
                ...item,
                id: item._id,
              }))}
              isRowSelectable={(param) => !param.row.assigned}
              checkboxSelection
              onRowSelectionModelChange={(newSelection) => {
                const updatedCheckedRows = [...checkedRows];
                newSelection.forEach((selectedRowId) => {
                  if (!updatedCheckedRows.includes(selectedRowId)) {
                    updatedCheckedRows.push(selectedRowId);
                  }
                });
                const uncheckedRows = checkedRows.filter(
                  (rowId) => !newSelection.includes(rowId)
                );
                uncheckedRows.forEach((uncheckedRowId) => {
                  const index = updatedCheckedRows.indexOf(uncheckedRowId);
                  if (index !== -1) {
                    updatedCheckedRows.splice(index, 1);
                  }
                });
                setCheckedRows(updatedCheckedRows);
              }}
              columns={
                selectedItems[0] &&
                Object.keys(selectedItems[0]).map((key) => ({
                  field: key,
                  headerName: key,
                  width: 150,
                  flex: 1,
                  valueFormatter: (params) => {
                    if (key === "date_facture") {
                      return format(new Date(params.value), "MM/dd/yyyy");
                    }
                    return params.value;
                  },
                }))
              }
            />
          </div>
          <Button
            disabled={checkedRows.length === 0}
            sx={{
              backgroundColor:
                checkedRows.length === 0 ? "rgba(0, 0, 0, 0.07)" : "#BFB5FF",
              color: "black",
            }}
            onClick={handleAssignClick}
          >
            Assign to client
          </Button>
          <AssignInvoices
            admin={user}
            isOpen={dialogs.assignInvoices} // Ensure this prop is correctly set
            invoices={selectedRows}
            onClose={handleConfirmAssign}
            onCancel={handleCancelAssign}
            invoiceId={invoiceId}
            setConfirmAssignMessage={setConfirmAssignMessage}
          />
        </Box>
      </Modal>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => {
          setConfirmAssignMessage("");
          setOpenAlert(false);
        }}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default Journal;
