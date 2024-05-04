import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const OriginalInvoice = ({ file, setCleanedVersion, setFileData }) => {
  const [convertedVersion, setConvertedVersion] = useState([]);
  const [tableHead, setTableHead] = useState([]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/uploadInvoices`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const { responseData } = await response.json();
      setCleanedVersion(responseData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const convertToCsv = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/convertToCsv`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to convert file to CSV.");
        }
        const { responseData } = await response.json(); // Parse the response body as JSON

        // Add a unique id to each row
        const dataWithIds = responseData.map((row, index) => ({
          ...row,
          id: index + 1, // Generate a unique id using the index
        }));

        // Trigger a refresh of the invoices after successful upload
        setConvertedVersion(dataWithIds);
        setTableHead(Object.keys(responseData[0]));
      } catch (error) {
        console.error("Error converting file to CSV:", error);
      }
    };
    convertToCsv();
  }, [file]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          sx={{
            color: "#263238",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          {file.name}
        </Typography>
        <Box
          sx={{
            marginTop: "20px",
            alignSelf: "end",
            alignItems: "end",
            marginLeft: "auto",
            marginRight: "30px",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              color: "#BFB5FF",
              fontSize: "15px",
            }}
          >
            Observe your csv before cleaning
          </Typography>
          <Typography
            sx={{
              color: "#A6A6A6",
              fontSize: "15px",
            }}
          >
            Close the SideBar for better experience
          </Typography>
        </Box>
      </Box>

      <Box mt='20px' marginBottom='20px' width='98%' mx='auto'>
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={convertedVersion}
            columns={tableHead.map((header) => ({
              field: header,
              headerName: header,
              flex: 1,
            }))}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          marginBottom: "20px",
          marginRight: "30px",
        }}
      >
        <Button
          variant='contained'
          endIcon={<CloseOutlinedIcon />}
          sx={{
            backgroundColor: "#BFB5FF",
            color: "white",
            borderRadius: "30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#9D8DFE",
            },
          }}
          onClick={() => setFileData(null)}
        >
          Change File
        </Button>
        <Button
          variant='contained'
          endIcon={<ArrowForwardOutlinedIcon />}
          sx={{
            marginLeft: "20px",
            backgroundColor: "#BFB5FF",
            color: "white",
            borderRadius: "30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#9D8DFE",
            },
          }}
          onClick={handleUpload}
        >
          Clean & Categorize
        </Button>
      </Box>
    </>
  );
};

export default OriginalInvoice;
