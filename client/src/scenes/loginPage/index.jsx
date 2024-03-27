import { Box,Typography, useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    width="90%"
    borderRadius="1.5rem"
    backgroundColor="grey"
    marginTop="2.5rem"
    marginLeft="5rem"
  >
      {/* Left empty part */}
      <Box
        flex="1"
        height="100%"
        borderRight="1px solid #ccc"
      ></Box>

      {/* Right part with form */}
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        padding="6rem"
        alignItems="center"
        backgroundColor="White"

      >
        <Typography variant="h2" color="#9D8DFE" gutterBottom align="center" marginBottom=" 3rem" fontFamily={"Poppins"} fontWeight="900">
          Sign in to Countopia
        </Typography>

        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
