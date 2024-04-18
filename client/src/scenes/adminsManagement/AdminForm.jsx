import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';

const AdminForm = ({ open, handleClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      location: "",
      picture: null, // Store the file object in the state
      email: "",
      password: "",
      status: true,
      role: "admin",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: "20px", // Add border radius here
        },
      }}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold",color: "#BFB5FF", fontSize: "20px" }}>
        Create New Admin
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon sx={{ color: "#BFB5FF",border: "1px solid #BFB5FF", borderRadius: "50%" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Form fields */}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
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
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
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
                value={formik.values.location}
                onChange={formik.handleChange}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  formik.setFieldValue("picture", acceptedFiles[0])
                }
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
                    {!formik.values.picture ? (
                        <>
                    <AddToPhotosOutlinedIcon/>
                      <Typography margin={"0 10px"}>  Add Company Logo Here</Typography>
                    </>
                    ) : (
                      <Typography>{formik.values.picture.name}</Typography>
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
                value={formik.values.email}
                onChange={formik.handleChange}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>

          <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} color="error" variant="outlined" sx={{ borderRadius: "15px",width:"100px" }}>
              Cancel
            </Button>
            <Button type="submit" color="primary"  sx={{ backgroundColor: "#BFB5FF",borderRadius: "15px",width:"100px"}}>
              Create
            </Button>
          </DialogActions>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminForm;
