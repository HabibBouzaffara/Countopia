import { Box } from "@mui/material";
import React, { useState } from "react";
import CleanedInvoice from "./CleanedInvoice";
import UploadCsv from "./UploadCsv";
import OriginalInvoice from "./OriginalInvoice";
import CustomSnackbar from "scenes/CustomSnackBar";

const UploadInvoice = ({ user }) => {
  console.log(user);
  const [fileData, setFileData] = useState(null);
  const [cleanedVersion, setCleanedVersion] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  // console.log(cleanedVersion);

  if (successMessage !== "" && !openAlert) {
    setOpenAlert(true);
    setAlertMessage(successMessage);
    setErrorMessage(false);
  }

  return (
    <Box {...(!fileData && { minHeight: "720px" })}>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          width: "90%",
          marginTop: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "12px",
        }}
      >
        {!fileData && <UploadCsv user={user} setFileData={setFileData} />}
        {fileData && !cleanedVersion && (
          <OriginalInvoice
            file={fileData}
            setCleanedVersion={setCleanedVersion}
            setFileData={setFileData}
          />
        )}
        {cleanedVersion && (
          <CleanedInvoice
            adminId={user._id}
            adminName={user.name}
            cleanedVersion={cleanedVersion}
            setCleanedVersion={setCleanedVersion}
            setFileData={setFileData}
            setSuccessMessage={setSuccessMessage}
          />
        )}
      </Box>
      <CustomSnackbar
        open={openAlert}
        onClose={() => {
          setSuccessMessage("");
          setOpenAlert(false);
        }}
        autoHideDuration={3000}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
    </Box>
  );
};

export default UploadInvoice;
