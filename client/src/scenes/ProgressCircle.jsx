import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";

const ProgressCircle = ({ size }) => {
  const FacebookCircularProgress = (props) => {
    return (
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant='determinate'
          sx={{
            color: "#9D8DFE",
          }}
          size={size}
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
          size={size}
          thickness={4}
          {...props}
        />
      </Box>
    );
  };
  return <FacebookCircularProgress />;
};

export default ProgressCircle;
