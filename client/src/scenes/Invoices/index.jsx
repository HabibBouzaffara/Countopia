import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import JsonToCsv from "./JsonToCsv";
import UploadCsv from "./UploadCsv";

const UploadInvoice = ({ clientId }) => {
  const [fileData, setFileData] = useState(null);

  return (
    <>
      {!fileData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
            marginRight: "8%",
          }}
        >
          <Button
            variant='contained'
            startIcon={<GradingOutlinedIcon />}
            sx={{
              backgroundColor: "#9D8DFE",
              color: "white",
              borderRadius: "30px",
              width: "200px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
            }}
            // onClick={handleUpload}
          >
            Financial Journal
          </Button>
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "auto",
          borderRadius: "30px",
        }}
      >
        {!fileData && <UploadCsv setFileData={setFileData} />}

        {fileData && <JsonToCsv fileData={fileData} />}
      </Box>
    </>
  );
};

export default UploadInvoice;
