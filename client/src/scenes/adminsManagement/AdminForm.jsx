import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import * as yup from "yup";

const initialValues= {
  name: "",
  phoneNumber: "",
  location: "",
  picture: "", // Store the file object in the state
  email: "",
  password: "",
  status: true,
  approved: true,
  assigned: [],
  role: "admin",
};

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required").min(6, "min 6 characters"),
  location: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  picture: yup.string(),
})

const AdminForm = ({ open, handleClose, handleSubmit }) => {
  const onSubmit= (values,onSubmitProps) => {
      try {
        handleSubmit(values);
        onSubmitProps.resetForm();
      } catch (err) {
        console.log(err);
      }
    };
  const handleCancel = () => {
    handleClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: "20px", // Add border radius here
        },
      }}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold",color: "#BFB5FF", fontSize: "20px" }}>
        Create New Admin
        <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon sx={{ color: "#BFB5FF",border: "1px solid #BFB5FF", borderRadius: "50%" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Form fields */}
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registerSchema}>
          {({ values, handleChange, handleSubmit,setFieldValue,resetForm,errors, touched,handleBlur }) => (

        <form onSubmit={handleSubmit} onClose={handleClose}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField               
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={ touched.name && errors.name}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                type="text"
                fullWidth
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="location"
                name="location"
                label="Location"
                type="text"
                fullWidth
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                maxSize={200000}
                onDrop={(acceptedFiles) =>{
                  const file =acceptedFiles[0];
                  if(file && file.size > 200000){
                    alert("Image size should not exceed 200KB");
                    return;
                  }                 
                  setFieldValue("picture", acceptedFiles[0])
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border="1px solid #C7C7C7 "
                    p="1rem"
                    borderRadius="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="53px"
                    marginTop={"8px"}
                    sx={{ "&:hover": { cursor: "pointer" } }}

                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                        <>
                    <AddToPhotosOutlinedIcon/>
                      <Typography margin={"0 10px"}>  Add Company Logo Here</Typography>
                    </>
                    ) : (
                      <Typography>{values.picture.name}</Typography>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>

          <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => {resetForm(); handleClose();} } color="error" variant="outlined" sx={{ borderRadius: "15px",width:"100px" }}>
              Cancel
            </Button>
            <Button type="submit" color="primary"  sx={{ backgroundColor: "#BFB5FF",borderRadius: "15px",width:"100px"}}>
              Create
            </Button>
          </DialogActions>
          </Grid>
        </form>
        )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AdminForm;
