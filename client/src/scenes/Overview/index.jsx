import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";
import { PieChart } from "@mui/x-charts/PieChart";
import InvoicesRateBar from "./InvoicesRateBar";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const Overview = ({ user }) => {
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#f0f0f0",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#81D9ED",
    },
  }));

  const serviceStatusData = [
    { name: "Ongoing", value: 30, color: "#FFA8A7" },
    { name: "Pending", value: 20, color: "#BFB5FF" },
    { name: "Done", value: 50, color: "#81D9ED" },
  ];
  const clientStatusData = [
    { name: "Total Clients", value: 100, color: "#81D9ED" },
    { name: "Assigned Clients", value: 60, color: "#9EF0E3" },
    { name: "Not Assigned Clients", value: 40, color: "#F7A9A0" },
  ];
  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#263238",
            fontWeight: "bold",
            flexGrow: 1, // Make the first Typography component expand
          }}
        >
          OverView
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          padding: "20px",
          width: "  90%",
          marginLeft: " 40px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#9EF0E3",
            color: "#fff",
            padding: "20px",
            borderRadius: "3px",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AssignmentIcon
            style={{ marginRight: "10px", fontWeight: "normal" }}
          />
          <Typography variant="h6">Projects</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFA8A7",
            color: "#fff",
            padding: "20px",
            borderRadius: "3px",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TaskIcon style={{ marginRight: "10px", fontWeight: "normal" }} />
          <Typography variant="h6">Tasks</Typography>
        </Box>
        {user.role === "superadmin" && (
          <Box
            sx={{
              backgroundColor: "#81D9ED",
              color: "#fff",
              padding: "20px",
              borderRadius: "3px",
              width: "20%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AssignmentIndIcon
              style={{ marginRight: "10px", fontWeight: "normal" }}
            />
            <Typography variant="h6">Admins </Typography>
          </Box>
        )}
        <Box
          sx={{
            backgroundColor: "#BFB5FF",
            color: "#fff",
            padding: "20px",
            borderRadius: "3px",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PeopleIcon style={{ marginRight: "10px", fontWeight: "normal" }} />
          <Typography variant="h6">Clients </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          padding: "20px",
          width: "  90%",
          marginLeft: " 40px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            padding: "20px",
            borderRadius: "3px",
            width: "48%",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Service Status
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <div style={{ width: "50%", marginLeft: "40px" }}>
              <PieChart
                series={[
                  {
                    data: serviceStatusData.map((item) => ({
                      ...item,
                      name: `${item.name} (${item.value}%)`,
                    })), // Include percentage in legend
                    highlightScope: {
                      faded: "global",
                      highlighted: ["Ongoing", "Pending", "Done"],
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
              />
            </div>

            {/* Legend for server status data */}
            <div style={{ marginLeft: "10px" }}>
              {serviceStatusData.map((dataItem, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: dataItem.color,
                      marginRight: "5px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <Typography variant="body1">
                    {dataItem.name} - {dataItem.value}%
                  </Typography>{" "}
                  {/* Add percentage to legend */}
                </div>
              ))}
            </div>
          </div>
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            padding: "20px",
            borderRadius: "3px",
            width: "48%",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Invoices Rate
          </Typography>
          <InvoicesRateBar />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          padding: "20px",
          width: "90%",
          marginLeft: "40px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            padding: "20px",
            borderRadius: "3px",
            width: "10%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Waiting Clients
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            padding: "20px",
            borderRadius: "3px",
            width: "34%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Clients Status
          </Typography>
          <PieChart
            series={[
              {
                data: clientStatusData.map((item) => ({
                  name: item.name,
                  value: item.value,
                })),
                innerRadius: 30,
                outerRadius: 50,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 220,
                cy: 70,
              },
            ]}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            padding: "20px",
            borderRadius: "3px",
            width: "48%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "0px" }}
          >
            Admin Performance
          </Typography>
          <Box sx={{ width: "90%", marginBottom: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">Admin 1</Typography>
              <BorderLinearProgress
                variant="determinate"
                value={80}
                sx={{ width: "70%" }}
              />
              <Typography variant="body1">80%</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "90%", marginBottom: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">Admin 2</Typography>
              <BorderLinearProgress
                variant="determinate"
                value={50}
                sx={{ width: "70%" }}
              />
              <Typography variant="body1">50%</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "90%", marginBottom: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">Admin 3</Typography>
              <BorderLinearProgress
                variant="determinate"
                value={30}
                sx={{ width: "70%" }}
              />
              <Typography variant="body1">30%</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Overview;
