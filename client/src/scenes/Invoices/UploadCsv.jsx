import React, { useState } from "react";
import Dropzone from "react-dropzone";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Typography } from "@mui/material";
import Journal from "scenes/journal/Journal";

const UploadCsv = ({ user, setFileData }) => {
  const [file, setFile] = useState(null);

  return (
    <Box>
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
          marginTop: "7px",
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
                width: "70%",
                height: "270px",
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

              <UploadFileOutlinedIcon
                sx={{
                  fontSize: "80px",
                  color: !file ? "rgba(191,181,255,0.5)" : "#9D8DFE",
                  marginBottom: "10px",
                }}
              />
              {!file && (
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "rgba(191,181,255,0.5)",
                  }}
                >
                  Drag and drop CSV file here, or click to select files
                </Typography>
              )}
              {file && (
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#9D8DFE",
                  }}
                >
                  {file.name}
                </Typography>
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
            marginRight: "180px",
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
            onClick={() => setFileData(file)}
          >
            Upload
          </Button>
        </Box>
      </Box>
      <Journal user={user} />
    </Box>
  );
};

export default UploadCsv;
