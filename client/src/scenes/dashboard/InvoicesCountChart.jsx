import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Typography } from "@mui/material";

const cellCount = 12;
const columns = 4;
const rows = Math.ceil(cellCount / columns);
const cellWidth = 60;
const cellHeight = 45;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getColor = (count) => {
  if (count >= 0 && count <= 10) {
    return "#E9E5FF";
  } else if (count >= 11 && count <= 25) {
    return "#BFB5FF";
  } else if (count >= 26 && count <= 50) {
    return "#9D8DFE";
  } else if (count >= 51 && count <= 75) {
    return "#2D37A4";
  } else {
    return "#E7E3FF"; // Default color
  }
};

const Item = ({ count }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Paper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        backgroundColor: hovered ? "#FFFFFF" : getColor(count),
        textAlign: "center",
        color: hovered ? "#000000" : "#00000000", // Text color
        width: cellWidth,
        height: cellHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s, color 0.3s",
        cursor: "pointer",
      }}
    >
      {hovered && <Typography variant="body1">{count}</Typography>}
    </Paper>
  );
};

const Legend = ({ legend, index }) => (
  <div
    key={index}
    style={{
      position: "absolute",
      left: -100, // Adjust as needed for positioning
      top: index * (cellHeight + 12), // Adjust as needed for positioning
      width: 100,
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

const InvoicesCountChart = ({ factures }) => {
  const [monthlyInvoiceCounts, setMonthlyInvoiceCounts] = React.useState([]);

  React.useEffect(() => {
    const fetchMonthlyInvoiceCounts = () => {
      const monthlyInvoiceCounts = new Array(12).fill(0);

      // Iterate over each item in the facture array
      factures.forEach((invoice) => {
        // Preprocess date_facture to ensure it has the format mm/dd/yyyy
        const formattedDate = invoice.date_facture.split(" ")[0];
        const parts = formattedDate.split("/");
        const month = parseInt(parts[0]) - 1; // Months are zero-based, so subtract 1

        // Increment the count of invoices for the corresponding month in the array
        monthlyInvoiceCounts[month]++;
      });
      setMonthlyInvoiceCounts(monthlyInvoiceCounts);
    };
    fetchMonthlyInvoiceCounts();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width: (columns + 1) * cellWidth,
          minHeight: rows * cellHeight,
        }}
      >
        {[...Array(rows)].map((_, index) => (
          <Legend key={index} legend={`Quarter ${index + 1}`} index={index} />
        ))}
        <Masonry columns={columns} spacing={1}>
          {monthlyInvoiceCounts.map((count, index) => (
            <Item key={months[index]} count={count} />
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
                0-10
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
                11-25
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
                  backgroundColor: "#2D37A4",
                  marginRight: "3px",
                  marginLeft: "3px",
                  borderRadius: "5px",
                }}
              ></div>
              <Typography variant="body2" sx={{ color: "#A6A6A6" }}>
                51-
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default InvoicesCountChart;
