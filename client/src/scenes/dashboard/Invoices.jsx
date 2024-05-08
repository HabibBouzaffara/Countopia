import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Typography } from "@mui/material";

const cellCount = 28;
const columns = 7;
const rows = Math.ceil(cellCount / columns);
const cellWidth = 40;
const cellHeight = 30;

const heights = Array.from({ length: cellCount }, (_, index) => index + 1);

const Item = ({ children }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Paper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        backgroundColor: hovered ? "#FFFFFF" : "#E7E3FF",
        textAlign: "center",
        color: hovered ? "#000000" : "#00000000", // Text color
        width: cellWidth,
        height: cellHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {hovered && children}
    </Paper>
  );
};

const Legend = ({ legend, index }) => (
  <div
    key={index}
    style={{
      position: "absolute",
      left: -90, // Adjust as needed for positioning
      top: index * (cellHeight + 10), // Adjust as needed for positioning
      width: 70,
      padding: "4px 8px",
      color: "#A6A6A6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {legend}
  </div>
);

const Invoices = () => (
  <Box>
    <Box
      sx={{
        position: "relative",
        width: (columns + 1) * cellWidth,
        minHeight: rows * cellHeight,
      }}
    >
      {[...Array(rows)].map((_, index) => (
        <Legend key={index} legend={`Week ${index + 1}`} index={index} />
      ))}
      <Masonry columns={columns} spacing={1}>
        {heights.map((height) => (
          <Item key={height}>{height}</Item>
        ))}
      </Masonry>
    </Box>
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <div style={{ marginLeft: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "Row",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "10px",
                backgroundColor: "#E9E5FF",
                marginRight: "3px",
                marginLeft: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <Typography variant="body2" sx={{ color: "#A6A6A6" }}>
              0-25
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "10px",
                backgroundColor: "#BFB5FF",
                marginRight: "3px",
                marginLeft: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <Typography variant="body2" sx={{ color: "#A6A6A6" }}>
              26-50
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "10px",
                backgroundColor: "#9D8DFE",
                marginRight: "3px",
                marginLeft: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <Typography variant="body2" sx={{ color: "#A6A6A6" }}>
              51-75
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "10px",
                backgroundColor: "#2D37A4",
                marginRight: "3px",
                marginLeft: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <Typography variant="body2" sx={{ color: "#A6A6A6" }}>
              76-100
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  </Box>
);

export default Invoices;
