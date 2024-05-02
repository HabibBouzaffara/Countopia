import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Checkbox,
  Icon,
  Button,
} from "@mui/material";
import { CloseFullscreen } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Delete } from "@mui/icons-material";
import AssignInvoices from "./AssignInvoices";

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

  const handleAssignClick = useCallback(() => {
    const selectedRows = selectedItems.filter((item) =>
      checkedRows.includes(item._id)
    );
    setSelectedRows(selectedRows);

    setDialogs((prevState) => ({ ...prevState, assignInvoices: true }));
  }, [selectedItems, checkedRows, setDialogs, setSelectedRows]);

  const handleConfirmAssign = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignInvoices: false }));
    window.location.reload();
  }, []);

  const handleCancelAssign = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignInvoices: false }));
  }, []);

  const handleCheckboxChange = (id, assigned) => {
    if (!assigned) {
      if (checkedRows.includes(id)) {
        setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
      } else {
        setCheckedRows([...checkedRows, id]);
      }
    }
  };
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
        throw new Error(result.msg);
      }
      console.log(result);
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
  }, [user._id]);

  const handleViewItems = (items, id) => {
    setSelectedItems(items);
    setInvoiceId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!journal) return null;

  return (
    <>
      <div
        style={{
          maxHeight: "600px",
          width: "71%",
          margin: "auto",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        <DataGrid
          sx={{
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
            { field: "date", headerName: "Date", width: 170 },
            { field: "adminName", headerName: "Admin Name", width: 160 },
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
              sx={{
                maxHeight: "600px",
                marginBottom: "10px",
                borderRadius: "20px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#BFB5FF",
                },
              }}
              rows={selectedItems.map((item, index) => ({
                ...item,
                id: item._id,
              }))}
              columns={[
                {
                  field: "checkbox",
                  headerName: "Select",
                  width: 90,
                  disableColumnMenu: true,
                  disableColumnFilter: true,
                  hideSortIcons: true,
                  disableReorder: true,
                  disableExport: true,
                  sortable: false,

                  renderCell: (params) => (
                    <Checkbox
                      sx={{
                        "&.Mui-checked": { color: "#BFB5FF" },
                      }}
                      checked={checkedRows.includes(params.row.id)}
                      onChange={() =>
                        handleCheckboxChange(params.row.id, params.row.assigned)
                      }
                      disabled={params.row.assigned} // Disable checkbox if row is assigned
                    />
                  ),
                },
                { field: "client_id", headerName: "Client ID", width: 70 },
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
                { field: "category", headerName: "Category", width: 70 },
              ]}
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
          />
        </Box>
      </Modal>
    </>
  );
};

export default Journal;
