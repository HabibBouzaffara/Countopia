import React, { useState } from "react";
import Dropzone from "react-dropzone";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  circularProgressClasses,
} from "@mui/material";

const UploadCsv = ({ setFileData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const FacebookCircularProgress = (props) => {
    return (
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant='determinate'
          sx={{
            color: "#9D8DFE",
          }}
          size={100}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant='indeterminate'
          disableShrink
          sx={{
            color: "#D8D8D8",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={100}
          thickness={4}
          {...props}
        />
      </Box>
    );
  };
  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    console.log("File selected:", file);

    try {
      setLoading(true);
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

      const { responseData } = await response.json(); // Parse the response body as JSON
      console.log("Response:", responseData);
      // Trigger a refresh of the invoices after successful upload
      setFileData(responseData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
      <Typography
        sx={{
          color: "#263238",
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "20px",
          marginLeft: "30px",
        }}
      >
        Import Invoices
      </Typography>
      <Typography
        sx={{
          color: "#A6A6A6",
          fontSize: "15px",
          marginTop: "9px",
          marginLeft: "30px",
          // marginBottom: "25px",
        }}
      >
        Upload a CSV file
      </Typography>

      <Box>
        <Dropzone
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #C7C7C7",
                borderRadius: "20px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                color: "#C7C7C7F",
                backgroundColor: "#F5F5F5",
                width: "80%",
                height: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                marginBottom: "20px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.07)",
                },
              }}
            >
              <input {...getInputProps()} />
              {!loading && (
                <>
                  <UploadFileOutlinedIcon
                    sx={{
                      fontSize: "80px",
                      color: !file ? "rgba(191,181,255,0.5)" : "#9D8DFE",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: !file ? "rgba(191,181,255,0.5)" : "#9D8DFE",
                    }}
                  >
                    Drag and drop CSV file here, or click to select files
                  </Typography>
                </>
              )}
              {loading && (
                <>
                  <FacebookCircularProgress />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#9D8DFE",
                    }}
                  >
                    Uploading The file !
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Dropzone>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            marginBottom: "20px",
            marginRight: "100px",
          }}
        >
          <Button
            variant='contained'
            endIcon={<ArrowForwardOutlinedIcon />}
            disabled={!file}
            sx={{
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
            Upload
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UploadCsv;
