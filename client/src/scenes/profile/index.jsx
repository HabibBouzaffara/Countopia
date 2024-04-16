import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import UserInfo from "state/userInfo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MuiAlert from '@mui/material/Alert';


const pwdInitValues = {
  _id: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  name: "",
  email: "",
  location: "",
  phoneNumber: "",
  }

const Profile = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const user = UserInfo();
  console.log(user);

  const modifyPWD =async (_id, oldPassword, newPassword,name,email,location,phoneNumber , onSubmitProps) => {
    // console.log(_id, oldPassword, newPassword);
    try{
    
    const response = await fetch(process.env.REACT_APP_BASE_URL+"/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, oldPassword, newPassword,name,email,location,phoneNumber }),
    });
    const data = await response.json();
    if (!response.ok) {
      setAlertMessage(data.msg);
      setErrorMessage(true)
      setOpenAlert(true);
    } else {
      setAlertMessage(data.msg||'updated successfully');
      setErrorMessage(false)
      setOpenAlert(true);
    }
    onSubmitProps.resetForm();
  }catch(err){
    console.log(err);
    setAlertMessage(err.msg || 'Error occurred. Please try again later.');
    setErrorMessage(true)
    setOpenAlert(true);
  }
  }

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      values._id = user._id
      if (!values.newPassword && !values.confirmPassword && !values.oldPassword &&!values.name && !values.email && !values.location && !values.phoneNumber) {
        throw new Error("Nothing to update !");
      }
      if(values.newPassword !== values.confirmPassword){
        throw new Error("Passwords do not match !");
      }

    await modifyPWD(values._id,values.oldPassword,values.newPassword,values.name,values.email,values.location,values.phoneNumber, onSubmitProps);
    }catch(err){
      console.log(err);
      setAlertMessage(err.msg || 'Error occurred. Please try again later.');
      setErrorMessage(true)
      setOpenAlert(true);
    }
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  if (!user) return null;
  return (
    <Box overflow={"hidden"}>
      <Typography
        variant="h2"
        sx={{
          color: "#263238",
          marginLeft: "30px",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        My Profile
      </Typography>

      {/* Form for Name, Email, Phone, and Address */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          border: "2px dashed rgba(128, 128, 128, 0.5)",
          backgroundColor: "white",
          padding: "20px",
          width: "97%",
          marginLeft: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            textAlign: "start",
            gridColumn: "span 6",
            color: "rgba(0, 0, 0, 0.3)",
          }}
          alignSelf={"flex-start"}
        >
          Manage your profile settings
        </Typography>

        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            textAlign: "start",
            gridColumn: "span 6",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {user.companyName}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 2,
            maxWidth: "600px",
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            component="img"
            alt="profile"
            src={process.env.REACT_APP_BASE_URL + "/assets/" + user.picturePath}
            height="20vh"
            width="20vh"
            borderRadius="50%"
            sx={{ objectFit: "cover", gridColumn: "span 2" }}
          />
          <Box sx={{ gridColumn: "span 4" }}>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#BFB5FF",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                width: "60%",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              Change Picture
            </Button>
            <Button
              variant="outlined"
              color="error"
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                border: "1px solid #BFB5FF",
                cursor: "pointer",
                width: "60%",
                marginBottom: "10px",
              }}
            >
              <DeleteForeverIcon />
              <Typography
                variant="h7"
                sx={{ color: "black", marginLeft: "5px" }}
              >
                Delete
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", marginTop: "20px" }}>
           <Formik
            initialValues={pwdInitValues}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, resetForm }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: "10px",
                }}
              >
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 3", marginLeft: "60px" }}
                  InputProps={{ style: { borderRadius: "20px" } }}
                  placeholder={user.name}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 3", marginRight: "60px" }}
                  InputProps={{ style: { borderRadius: "20px" } }}
                  placeholder={user.email}
                />
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={values.location}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 3", marginLeft: "60px" }}
                  InputProps={{ style: { borderRadius: "20px" } }}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 3", marginRight: "60px" }}
                  InputProps={{ style: { borderRadius: "20px" } }}
                />
                <Box
                  sx={{
                    gridColumn: "span 6",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#BFB5FF",
                      color: "white",
                      borderRadius: "20px",
                      marginRight: "10px",
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    onClick={resetForm}
                    variant="outlined"
                    style={{
                      color: "#BFB5FF",
                      borderRadius: "20px",
                      border: "1px solid #BFB5FF",
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik> 
        </Box>
      </Box>

      {/* Form for Old Password and New Password */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          border: "2px dashed rgba(128, 128, 128, 0.5)",
          backgroundColor: "white",
          padding: "20px",
          width: "97%",
          marginLeft: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            textAlign: "start",
            gridColumn: "span 6",
            color: "rgba(0, 0, 0, 0.3)",
          }}
          alignSelf={"flex-start"}
        >
          Edit your password
        </Typography>

        <Box sx={{ width: "100%", marginTop: "20px" }}>
  <Formik
    initialValues={pwdInitValues}
    onSubmit={handleSubmit}
  >
    {({ handleChange, handleSubmit, values,resetForm }) => (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Divide the form into two columns
          gap: "10px",
        }}
      >
        {/* Text Fields */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="old-password"
            name="oldPassword"
            label="Old Password"
            variant="outlined"
            value={values.oldPassword}
            onChange={handleChange}
            style={{ marginBottom: "10px" }}
            InputProps={{ style: { borderRadius: "20px" } }}
          />
          <TextField
            id="new-password"
            name="newPassword"
            label="New Password"
            variant="outlined"
            value={values.newPassword}
            onChange={handleChange}
            style={{ marginBottom: "10px" }}
            InputProps={{ style: { borderRadius: "20px" } }}
          />
          <TextField
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            value={values.confirmPassword}
            onChange={handleChange}
            style={{ marginBottom: "10px" }}
            InputProps={{ style: { borderRadius: "20px" } }}
          />
        </div>
        
        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#BFB5FF",
              color: "white",
              borderRadius: "20px",
              marginBottom: "10px",
              width: "90%",
              height: "50px",
            }}
          >
            Confirm Changes
          </Button>
          <Button
            type="reset"
            onClick={resetForm}
            variant="outlined"
            style={{
              color: "#BFB5FF",
              borderRadius: "20px",
              border: "2px solid #BFB5FF",
              width: "90%",
              height: "50px",
            }}
          >
            Cancel
          </Button>
          <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ paddingBottom: '15px' }}
          >
            <MuiAlert
              elevation={6}
              variant="standard"
              severity={errorMessage ? 'error' : 'success'}
              onClose={handleCloseAlert}
            >
              {alertMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      </form>
    )}
  </Formik>
</Box>

      </Box>
    </Box>
  );
};

export default Profile;
