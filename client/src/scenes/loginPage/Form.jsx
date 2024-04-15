import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import signIn from "../../assets/signIn.svg";
import signUp from "../../assets/signUp.svg";
import verify from "../../assets/verify.svg";
import verified from "../../assets/verified.svg";
import section2 from "../../assets/section2.svg";
import ReactInputVerificationCode from "react-input-verification-code";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  companyName: yup.string().required("required"),
  codeFiscale: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const verifySchema = yup.object().shape({
  otp: yup.string().required("required"),
});

const initialValuesRegisterVerify = {
  otp: "",
  id: "",
};

const initialValuesRegister = {
  name: "",
  companyName: "",
  codeFiscale: "",
  email: "",
  password: "",
  phoneNumber: "",
  location: "",
  status: "",
  picture: "",
  role: "client",
};

const initialValuesLogin = {
  email: "",
  password: "",
  rememberMe: false,
};

const Form = () => {
  const [savedUserId, setSavedUserId] = useState("");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [pageType, setPageType] = useState("login");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:200px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isVerify = pageType === "verify";
  const isVerified = pageType === "verified";
  // const [rememberMe, setRememberMe] = useState(false);

  const register = async (values, onSubmitProps) => {
    
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    try{
    const savedUserResponse = await fetch(
      process.env.REACT_APP_BASE_URL + "/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();

    if (!savedUserResponse.ok) {
      // Handle server error
      setAlertMessage(savedUser.msg || 'Error occurred during login');
      setOpenAlert(true);
      return;
    }
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("verify");
      console.log(savedUser._id);
      setSavedUserId(savedUser._id);
    }
    }catch(error){
      setAlertMessage(error.msg || 'An error occurred. Please try again later.');
      setOpenAlert(true);
    }
  };
  const verifyEmail = async (otp, onSubmitProps, userId) => {
    try{
    const verificationCode = await fetch(
      process.env.REACT_APP_BASE_URL + "/verify-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, userId }),
      }
    );
    const verification = await verificationCode.json();

    if (!verificationCode.ok) {
      // Handle server error
      setAlertMessage(verification.msg || 'Error occurred during login');
      setOpenAlert(true);
      return;
    }
  
    if (verification) {
      setPageType("verified");
    } 
          
  }catch(error){
    setAlertMessage('An error occurred. Please try again later.');
    setOpenAlert(true);
  }
  };

  const login = async (values, onSubmitProps) => {
      try {
        const loggedInResponse = await fetch(
          process.env.REACT_APP_BASE_URL + '/auth/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          }
        );
  
        const loggedIn = await loggedInResponse.json();
        if (!loggedInResponse.ok) {
          // Handle server error
          setAlertMessage(loggedIn.msg || 'Error occurred during login');
          setOpenAlert(true);
          return;
        }
        onSubmitProps.resetForm();
  
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate('/dashboard');
        }
      } catch (error) {
        // Handle other errors (e.g., network error)
        setAlertMessage('An error occurred. Please try again later.');
        setOpenAlert(true);
      }
    
  };
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };

  

    const handleFormSubmit = async (values, onSubmitProps) => {
      try {
        if (isLogin) {
          // If Remember Me is checked, save the email in localStorage
          if (values.rememberMe) {
            localStorage.setItem("rememberedEmail", values.email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          await login(values, onSubmitProps);
        } else if (isRegister) {
          if (!values.name || !values.companyName || !values.codeFiscale || !values.email || !values.password || !values.location || !values.phoneNumber || !values.picture) {
            throw new Error("All fields are required");
          }
          await register(values, onSubmitProps);
        } else if (isVerify) {
          if (!values.otp) {
            throw new Error("OTP is required");
          }
          await verifyEmail(values.otp, onSubmitProps, savedUserId);
        } else if (isVerified) {
          navigate("/");
        }
      } catch (error) {
        setAlertMessage(error.message);
        setOpenAlert(true);
      }
    };
    
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="95%"
      width="95%"
      borderRadius="4rem"
      backgroundColor="#BFB5FF"
      margin="2.5rem"
      marginTop="20px" // Adjusted marginTop to move the purple box closer to the top
      flex="1"
      position="relative"
    >
      <Box
        display="flex"
        flexDirection="row" // Align components vertically
        justifyContent="center"
        alignItems="center"
        height="95%"
        width="97%"
        borderRadius="4rem"
        backgroundColor="white"
        position="relative"
      >
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRight="1px solid #BFB5FF"
          maxWidth="50%"
          position="relative"
          justifyItems={"center"}
        >
          {isLogin && isNonMobileScreens && (
            <img
              src={signIn}
              alt=""
              style={{
                maxWidth: "70%",
                maxHeight: "70%",
                width: "auto",
                height: "auto",
              }}
            />
          )}
          {isRegister && isNonMobileScreens &&(
            <img
              src={signUp}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          )}
          {isVerify && isNonMobileScreens &&(
            <img
              src={verify}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          )}
          {isVerified && isNonMobileScreens &&(
            <img
              src={verified}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          )}

        </Box>

        <Box
          width={isNonMobileScreens ? "50%" : "90%"}
          p="2rem"
          borderRadius="4rem"
          backgroundColor="white"
          height="99%"
          overflow="auto"
          position="relative"
        >
          {/* Text above the form */}
          {isLogin ? (
            <Typography
              variant="h2"
              color="#BFB5FF"
              gutterBottom
              align="center"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              marginTop="20%"
              marginBottom="3rem"
              fontFamily="Poppins"
              fontWeight="900"
              // marginTop="110px"
            >
              Sign In To Countopia
            </Typography>
          ) : isRegister ? (
            <Typography
              variant="h2"
              color="#BFB5FF"
              gutterBottom
              align="center"
              marginBottom="3rem"
              fontFamily="Poppins"
              fontWeight="900"
            >
              Sign Up To Countopia
            </Typography>
          ) :isVerify ? (
            <Typography
              variant="h2"
              color="#BFB5FF"
              gutterBottom
              align="center"
              marginBottom="3rem"
              marginTop="25%"
              fontFamily="Poppins"
              fontWeight="900"
            >
              Verify Your Email
            </Typography>
          ):isVerified ? (
            <Typography
              variant="h2"
              color="#BFB5FF"
              gutterBottom
              align="center"
              marginBottom="3rem"
              marginTop="25%"
              fontFamily="Poppins"
              fontWeight="900"
            >
              Thanks for signing up !
            </Typography>
          ): null}

          {/* Form component */}
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={
              isLogin
                ? initialValuesLogin
                : isRegister
                ? initialValuesRegister
                : initialValuesRegisterVerify
            }
            validationSchema={
              isLogin ? loginSchema : isRegister ? registerSchema :isVerify? verifySchema: null
            }
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="5px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {isRegister && !isVerify && (
                    <>
                      <TextField
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={Boolean(touched.name) && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        label="Company Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.companyName}
                        name="companyName"
                        error={
                          Boolean(touched.companyName) &&
                          Boolean(errors.companyName)
                        }
                        helperText={touched.companyName && errors.companyName}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={
                          Boolean(touched.location) && Boolean(errors.location)
                        }
                        helperText={touched.location && errors.location}
                        sx={{ gridColumn: "span 2" }}
                      />

                      <TextField
                        label="Tax Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.codeFiscale}
                        name="codeFiscale"
                        error={
                          Boolean(touched.codeFiscale) &&
                          Boolean(errors.codeFiscale)
                        }
                        helperText={touched.codeFiscale && errors.codeFiscale}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        label="Phone Number : "
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneNumber}
                        name="phoneNumber"
                        error={
                          Boolean(touched.phoneNumber) &&
                          Boolean(errors.phoneNumber)
                        }
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <Box
                        gridColumn="span 4"
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        p="1rem"
                      >
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border={`2px dashed ${palette.primary.main}`}
                              p="1rem"
                              borderRadius="60px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              height="50px"
                              sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                              <input {...getInputProps()} />
                              {!values.picture ? (
                                <p>Add Company Logo Here</p>
                              ) : (
                                <FlexBetween>
                                  <Typography>{values.picture.name}</Typography>
                                  <EditOutlinedIcon />
                                </FlexBetween>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                      </Box>
                    </>
                  )}

                  {(isLogin || isRegister) && (
                    <>
                      <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        sx={{ gridColumn: "span 4 " }}
                        onChange={handleChange("password")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </>
                  )}
                  </Box>
                  {isVerify && (
                    <div style={ {display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "center"}}>
                      <ReactInputVerificationCode
                        value={values.otp}
                        onChange={(e) => setFieldValue("otp", e)}
                        autoFocus={true}
                        length={4}
                        placeholder=""
                        onComplete={(e) => setFieldValue("otp", e)}
                        onCompleted={(e) => setFieldValue("otp", e)}
                        style={{ display:"center",textAlign:"center" }}
                      />
                      </div>

                  )}
                  
                
                {isVerified &&(
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                    <Typography
                      variant="h4"
                      color="black"
                      marginBottom="40px"
                      align="center"
                      fontFamily="Poppins"
                      fontWeight="200"
                    >
                      An approval email will be sent to you in less than 24H !
                    </Typography>
                    <img
                      src={section2}
                      alt=""
                      style={{
                        margin: "20px",
                        // Your styles for the image
                      }}
                    />
                  </div>
                  
                  )}
                {isLogin && !isVerify && (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.rememberMe}
                          onChange={handleChange}
                          name="rememberMe"
                          icon={
                            <CheckBoxOutlineBlankIcon
                              style={{ color: "#1976D2" }}
                            />
                          } // Blue color for unchecked checkbox
                          checkedIcon={
                            <CheckBoxIcon style={{ color: "#1976D2" }} />
                          } // Blue color for checked checkbox
                        />
                      }
                      label="Remember Me"
                      sx={{ gridColumn: "span 4", marginBottom: "-30px" }} // Adjust the marginTop value as needed
                    />
                  </>
                )}
                {/*remember me checkBox*/}

                {/* BUTTONS */}
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "0.5rem",
                      backgroundColor: "#9D8DFE",
                      borderRadius: "20px",
                      color: palette.background.alt,
                      "&:hover": {
                        color: "#9D8DFE",
                        backgroundColor: palette.action.hover,
                      },
                    }}
                  >
                    {isLogin ? "Sign In" :isRegister? "Sign Up":isVerify? "Verify": "Go to home page"} 
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
                          severity="error"
                          onClose={handleCloseAlert}
                        >
                         {alertMessage}
                        </MuiAlert>
                      </Snackbar>
                  <Typography
                    onClick={() => {
                      setPageType(
                        isLogin ? "register" : isRegister ? "login" : null //change to ? "verify": "register" to test verify page
                      );
                      resetForm();
                      isVerified && navigate("/");
                      
                    }}
                    sx={{
                      textDecoration: "underline",
                      color: palette.primary.contrastText,
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.light,
                      },
                    }}
                  >
                    {isLogin 
                      ? "Don't have an account? Sign Up here."
                      :isRegister
                      ? "Already have an account? Login here."
                      :null
                      }
                    
                  </Typography>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
