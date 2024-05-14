import {
  Box,
  Button,
  TextField,
  Typography,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationDialog from "../ConfirmationDialog";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CustomSnackbar from "scenes/CustomSnackBar";
import * as yup from "yup";
// import UserPicture from "components/UserPicture";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "state";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const modifySchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("invalid email"),
  location: yup.string(),
  phoneNumber: yup.string(),
});

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("required"),
  newPassword: yup.string().required("required").min(6, "min 6 characters"),
  confirmPassword: yup
    .string()
    .required("required")
    .min(6, "min 6 characters")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const initValues = {
  _id: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  name: "",
  email: "",
  location: "",
  phoneNumber: "",
  picture: "",
};

const Profile = ({ user }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null); // State to store selected picture
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [modifyValues, setModifyValues] = useState(initValues);
  const [modifyOnSubmitProps, setModifyOnSubmitProps] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const modifyProfile = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      if (values.picture) {
        formData.append("picturePath", values.picture.name);
      }
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/profile",
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.error || data.msg);
        setErrorMessage(true);
        setOpenAlert(true);
      } else {
        setAlertMessage(data.msg || "updated successfully");
        setErrorMessage(false);
        setOpenAlert(true);
        dispatch(
          setUser({ user: data.user, token: data.token }),
          setLogin({ user: data.user, token: data.token })
        );
      }
      onSubmitProps.resetForm();
    } catch (err) {
      console.log(err);
      setAlertMessage(err.msg || "Error occurred. Please try again later.");
      setErrorMessage(true);
      setOpenAlert(true);
    }
  };
  const deletePicture = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/profile/delete-picture",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: user._id }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Failed to delete picture");
      } else {
        setAlertMessage(data.msg || "Picture deleted successfully");
        setErrorMessage(false);
        setOpenAlert(true);
        dispatch(setUser({ user: data.user, token: data.token }));
      }
    } catch (err) {
      console.log(err);
      setAlertMessage(err.msg || "Error occurred while deleting picture");
      setErrorMessage(true);
      setOpenAlert(true);
    }
  };

  const handleModify = async (values, onSubmitProps) => {
    if (message === "modifyProfile") {
      try {
        values._id = user._id;
        values.picture = selectedPicture;
        if (
          !values.newPassword &&
          !values.confirmPassword &&
          !values.oldPassword &&
          !values.name &&
          !values.email &&
          !values.location &&
          !values.phoneNumber &&
          !values.picture
        ) {
          throw new Error("Nothing to update !");
        }
        if (values.newPassword !== values.confirmPassword) {
          throw new Error("Passwords do not match !");
        }
        await modifyProfile(values, onSubmitProps);
      } catch (err) {
        console.log(err);
        setAlertMessage(err.msg || "Error occurred. Please try again later.");
        setErrorMessage(true);
        setOpenAlert(true);
      }
    } else if (message === "deleteProfilePicture") {
      try {
        await deletePicture();
      } catch (err) {
        console.log(err);
      }
    }
  };
  /*delete */
  const handleRemoveClick = async () => {
    setMessage("deleteProfilePicture");
    setOpenConfirmationDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deletePicture();
      setOpenConfirmationDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmationDialog(false);
  };
  /*modify */
  const handleSubmit = async (values, onSubmitProps) => {
    setModifyValues(values);
    setModifyOnSubmitProps(onSubmitProps);
    setMessage("modifyProfile");
    setOpenConfirmationDialog(true);
  };
  const handleConfirmModify = async () => {
    await handleModify(modifyValues, modifyOnSubmitProps);
    setOpenConfirmationDialog(false);
  };

  const handleCancelModify = () => {
    setOpenConfirmationDialog(false);
  };

  const handlePictureChange = (event) => {
    setSelectedPicture(event.target.files[0]);
  };

  if (!user) return null;
  return (
    <Box overflow={"hidden"}>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
      <Typography
        variant='h2'
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
          variant='h5'
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
          variant='h5'
          sx={{
            marginBottom: "20px",
            textAlign: "start",
            gridColumn: "span 6",
            color: "rgba(0, 0, 0, 0.6)",
          }}
          alignSelf={"flex-start"}
        >
          {user.companyName}
        </Typography>

        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={modifySchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            resetForm,
            handleBlur,
            errors,
            touched,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "10px",
                alignItems: "center",
                justifyContent: "end",
                alignContent: "end",
              }}
            >
              {/* Picture upload section */}
              <Input
                type='file'
                onChange={handlePictureChange}
                style={{ display: "none" }}
                id='picture-upload'
              />
              <Box></Box>
              <label htmlFor='picture-upload'>
                {/* <UserPicture
                  sx={{
                    objectFit: "cover",
                    gridColumn: "span 2",
                    cursor: "pointer",
                    height: "20vh",
                    width: "20vh",
                  }}
                  name={user.name}
                  picturePath={user.picturePath}
                /> */}
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  component='img'
                  alt={user.name}
                  border={"3px solid #BFB5FF"}
                  src={
                    selectedPicture
                      ? URL.createObjectURL(selectedPicture)
                      : process.env.REACT_APP_BASE_URL +
                        "/assets/" +
                        user.picturePath
                  }
                  height='20vh'
                  width='20vh'
                  borderRadius='50%'
                  sx={{
                    objectFit: "cover",
                    gridColumn: "span 2",
                    cursor: "pointer",
                  }}
                />
              </label>
              <Box sx={{ gridColumn: "span 4" }}>
                <Button
                  variant='contained'
                  type='button'
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
                  onClick={() =>
                    document.getElementById("picture-upload").click()
                  }
                >
                  <FileUploadOutlinedIcon sx={{ marginRight: "5px" }} />
                  Upload Picture
                </Button>

                <Button
                  variant='outlined'
                  color='error'
                  type='button'
                  onClick={handleRemoveClick}
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
                    variant='h7'
                    sx={{ color: "black", marginLeft: "5px" }}
                  >
                    Delete
                  </Typography>
                </Button>
                <ConfirmationDialog
                  isOpen={openConfirmationDialog}
                  data={message}
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancelDelete}
                />
              </Box>
              {/* End of picture upload section */}

              {/* Other input fields */}
              <TextField
                id='name'
                name='name'
                label='Name'
                variant='outlined'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 3" }}
                InputProps={{ style: { borderRadius: "20px" } }}
                placeholder={user.name}
              />
              {/* Rest of the input fields */}
              <TextField
                id='email'
                name='email'
                label='Email'
                variant='outlined'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 3" }}
                InputProps={{ style: { borderRadius: "20px" } }}
                placeholder={user.email}
              />
              <TextField
                id='location'
                name='location'
                label='location'
                variant='outlined'
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 3" }}
                InputProps={{ style: { borderRadius: "20px" } }}
                placeholder={user.location}
              />
              <TextField
                id='phoneNumber'
                name='phoneNumber'
                label='Phone'
                variant='outlined'
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                }
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 3" }}
                InputProps={{ style: { borderRadius: "20px" } }}
                placeholder={user.phoneNumber}
              />
              {/* Submit and reset buttons */}
              <Box
                sx={{
                  gridColumn: "span 6",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type='submit'
                  variant='contained'
                  style={{
                    backgroundColor: "#BFB5FF",
                    color: "white",
                    borderRadius: "20px",
                    marginRight: "10px",
                    width: "100px",
                  }}
                >
                  Modify
                </Button>
                <ConfirmationDialog
                  isOpen={openConfirmationDialog}
                  data={message}
                  onConfirm={handleConfirmModify}
                  onCancel={handleCancelModify}
                />
                <Button
                  type='reset'
                  onClick={resetForm}
                  variant='outlined'
                  style={{
                    color: "#BFB5FF",
                    borderRadius: "20px",
                    border: "1px solid #BFB5FF",
                    width: "100px",
                  }}
                >
                  Cancel
                </Button>
              </Box>
              {/* End of submit and reset buttons */}
            </form>
          )}
        </Formik>
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
          variant='h5'
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
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={passwordSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              resetForm,
              handleBlur,
              errors,
              touched,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", // Divide the form into two columns
                  gap: "10px",
                }}
              >
                {/* Text Fields */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <TextField
                    id='old-password'
                    type={showOldPassword ? "text" : "password"}
                    name='oldPassword'
                    label='Old Password'
                    variant='outlined'
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.oldPassword) &&
                      Boolean(errors.oldPassword)
                    }
                    helperText={touched.oldPassword && errors.oldPassword}
                    style={{ marginBottom: "10px", width: "90%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownOldPassword}
                            edge='end'
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "20px" },
                    }}
                  />
                  <TextField
                    id='new-password'
                    type={showNewPassword ? "text" : "password"}
                    name='newPassword'
                    label='New Password'
                    variant='outlined'
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.newPassword) &&
                      Boolean(errors.newPassword)
                    }
                    helperText={touched.newPassword && errors.newPassword}
                    style={{ marginBottom: "10px", width: "90%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge='end'
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "20px" },
                    }}
                  />
                  <TextField
                    id='confirm-password'
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    label='Confirm Password'
                    variant='outlined'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    style={{ marginBottom: "10px", width: "90%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge='end'
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "20px" },
                    }}
                  />
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type='submit'
                    variant='contained'
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
                    type='reset'
                    onClick={resetForm}
                    variant='outlined'
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
