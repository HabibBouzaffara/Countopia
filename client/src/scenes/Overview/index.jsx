import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";
import { PieChart } from "@mui/x-charts/PieChart";
import InvoicesRateBar from "./InvoicesRateBar";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import UserPicture from "components/UserPicture";

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

const Overview = ({ user }) => {
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState(null);
  const [serviceStatusData, setServiceStatusData] = useState([]);
  const [invoiceStatusData, setInvoiceStatusData] = useState([]);

  const getAdmins = async () => {
    try {
      const admins = await fetch(process.env.REACT_APP_BASE_URL + "/admins", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await admins.json();
      if (!admins.ok) {
        throw new Error(data.msg);
      }
      setAdmins(data);
    } catch (err) {
      console.log(err);
    }
  };

  const AdminBox = ({ name, avatarUrl, invoicesLength }) => (
    <Box sx={{ width: "90%", marginBottom: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <UserPicture name={name} picturePath={avatarUrl} />

        <Typography variant='body1'>{name}</Typography>
        <BorderLinearProgress
          variant='determinate'
          value={invoicesLength}
          sx={{ width: "55%" }}
        />
        <Typography variant='body1'>{invoicesLength}%</Typography>
      </Box>
    </Box>
  );

  useEffect(() => {
    const getAllClients = async () => {
      try {
        const url = new URL(process.env.REACT_APP_BASE_URL + "/clients");
        // Add user._id and user.role as query parameters
        url.searchParams.append("userId", user?._id);
        url.searchParams.append("role", user?.role);

        const clientsResponse = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await clientsResponse.json();
        if (!clientsResponse.ok) {
          throw new Error(data.msg);
        }
        setClients(data);
        const totalClients = data ? data.length : 0;

        const ongoingCount = data.filter(
          (client) => client.service === "ongoing"
        ).length;
        const pendingCount = data.filter(
          (client) => client.service === "pending"
        ).length;
        const doneCount = data.filter(
          (client) => client.service === "done"
        ).length;

        setServiceStatusData([
          {
            name: "Ongoing",
            value: Math.round((ongoingCount / totalClients) * 1000) / 10,
            color: "#FFA8A7",
          },
          {
            name: "Pending",
            value: Math.round((pendingCount / totalClients) * 1000) / 10,
            color: "#BFB5FF",
          },
          {
            name: "Done",
            value: Math.round((doneCount / totalClients) * 1000) / 10,
            color: "#81D9ED",
          },
        ]);

        setInvoiceStatusData([
          {
            name: "Ongoing",
            value: data.filter((client) => client.service === "ongoing").length,
            color: "#FFA8A7",
          },
          {
            name: "Pending",
            value: data.filter((client) => client.service === "pending").length,
            color: "#BFB5FF",
          },
          {
            name: "Done",
            value: data.filter((client) => client.service === "done").length,
            color: "#81D9ED",
          },
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    getAllClients();
    user.role === "superadmin" && getAdmins();
  }, [user]);
  const ClientBox = ({ name, invoicesLength, avatarUrl }) => (
    <Box sx={{ width: "90%", marginBottom: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <UserPicture name={name} picturePath={avatarUrl} />

        <Typography variant='body1' marginRight='70px'>
          {name}
        </Typography>
        <Typography variant='body1'>{invoicesLength} invoices</Typography>
      </Box>
    </Box>
  );
  if (!clients) return null;

  // Dummy data for the last pie chart
  const clientReviewData = [
    { category: "Extremely Satisfied", value: 30, color: "#9EF0E3" },
    { category: "Satisfied", value: 40, color: "#81D9ED" },
    { category: "Poor", value: 20, color: "#BFB5FF" },
    { category: "Very Poor", value: 10, color: "#FFA8A7" },
  ];
  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
      >
        <Typography
          variant='h2'
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
            borderRadius: "20px",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AssignmentIcon
            style={{ marginRight: "10px", fontWeight: "normal" }}
          />
          <Typography variant='h6'>
            Projects:{" "}
            {clients.filter((client) => client.approved === true).length}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFA8A7",
            color: "#fff",
            padding: "20px",
            borderRadius: "20px",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TaskIcon style={{ marginRight: "10px", fontWeight: "normal" }} />
          <Typography variant='h6'>
            Tasks:{clients.filter((client) => client.approved === true).length}
          </Typography>
        </Box>
        {user.role === "superadmin" && admins && (
          <Box
            sx={{
              backgroundColor: "#81D9ED",
              color: "#fff",
              padding: "20px",
              borderRadius: "20px",
              width: "20%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AssignmentIndIcon
              style={{ marginRight: "10px", fontWeight: "normal" }}
            />
            <Typography variant='h6'>Admins: {admins.length}</Typography>
          </Box>
        )}
        {user.role === "admin" && admins && (
          <Box
            sx={{
              backgroundColor: "#81D9ED",
              color: "#fff",
              padding: "20px",
              borderRadius: "20px",
              width: "20%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AssignmentIndIcon
              style={{ marginRight: "10px", fontWeight: "normal" }}
            />
            <Typography variant='h6'>Financial Report: </Typography>
          </Box>
        )}
        <Box
          sx={{
            backgroundColor: "#BFB5FF",
            color: "#fff",
            padding: "20px",
            borderRadius: "20px",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PeopleIcon style={{ marginRight: "10px", fontWeight: "normal" }} />
          <Typography variant='h6'>
            Clients:{" "}
            {clients.filter((client) => client.approved === true).length}
          </Typography>
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
            borderRadius: "20px",
            width: "48%",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>
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
                    data: invoiceStatusData, // Use modified data for PieChart
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
                  <Typography variant='body1'>
                    {dataItem.name} - {dataItem.value}%
                  </Typography>

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
            borderRadius: "20px",
            width: "48%",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>
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
        {user.role === "superadmin" && admins && (
          <Box
            sx={{
              background:
                clients.filter((client) => client.approved === false).length < 3
                  ? "linear-gradient(to top,  #F7A9A0 5%, white 40%)"
                  : clients.filter((client) => client.approved === false)
                      .length >= 3 &&
                    clients.filter((client) => client.approved === false)
                      .length <= 6
                  ? "linear-gradient(to top, #F7A9A0 30%, white 60%)"
                  : clients.filter((client) => client.approved === false)
                      .length > 6
                  ? "linear-gradient(to top,   #F7A9A0 50%, white 90%)"
                  : null,
              color: "#000000",
              padding: "20px",
              borderRadius: "30px",
              width: "10%",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Typography
                variant='h5'
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Waiting Clients
              </Typography>
            </div>
            <Typography
              variant='h1'
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              {clients.filter((client) => client.approved === false).length}
            </Typography>
          </Box>
        )}
        {user.role === "admin" && admins && (
          <Box
            sx={{
              background: "linear-gradient(to top,   #9EF0E3 5%, white 40%)",

              color: "#000000",
              padding: "20px",
              borderRadius: "30px",
              width: "10%",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Typography
                variant='h5'
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Completed invoices
              </Typography>
            </div>

            <Typography
              variant='h1'
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              145
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            padding: "20px",
            borderRadius: "20px",
            width: "34%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space",
            alignItems: "center",
          }}
        >
          <Typography
            variant='h5'
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            Clients Activities
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxHeight: "200px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            {clients.length === 0 ||
            clients.filter((client) => client.approved === true).length ===
              0 ? (
              <Typography>No clients found</Typography>
            ) : (
              clients
                .filter((client) => client.approved === true)
                .map((client) => (
                  <ClientBox
                    key={client._id}
                    name={client.name}
                    avatarUrl={client.picturePath}
                    invoicesLength={client.factures.length}
                  />
                ))
            )}
          </Box>
        </Box>
        {user.role === "superadmin" && admins && (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              padding: "20px",
              borderRadius: "20px",
              width: "48%",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space",
              alignItems: "center",
            }}
          >
            <Typography
              variant='h5'
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Admin Performance
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxHeight: "200px",
                overflow: "auto",
                scrollbarWidth: "thin",
              }}
            >
              {admins.length === 0 ? (
                <Typography>No admins found</Typography>
              ) : (
                admins.map((admin) => (
                  <AdminBox
                    key={admin._id}
                    name={admin.name}
                    avatarUrl={admin.picturePath}
                    invoicesLength={admin.factures.length}
                  />
                ))
              )}
            </Box>
          </Box>
        )}
        {user.role === "admin" && admins && (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              padding: "20px",
              borderRadius: "20px",
              width: "48%",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space",
              alignItems: "center",
            }}
          >
            <Typography
              variant='h5'
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Clients Review
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxHeight: "200px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              {/* Legend */}
              <div
                style={{
                  width: "50%", // Take up half of the available width
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // Align legend items to the left
                }}
              >
                {clientReviewData.map((item, index) => (
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
                        backgroundColor: item.color,
                        marginRight: "5px",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <Typography variant='body1'>
                      {item.category} - {item.value}%
                    </Typography>
                  </div>
                ))}
              </div>

              {/* Pie chart */}
              <PieChart
                series={[
                  {
                    data: clientReviewData.map((item) => ({
                      ...item,
                      value: item.value / 100, // Convert to percentage
                    })),
                    innerRadius: 30,
                    outerRadius: 50, // Increased radius for better visibility
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 270, // 360 degrees for a complete circle
                    cx: 140,
                    cy: 50,
                  },
                ]}
                width={200} // Adjust the width of the chart
                height={200} // Adjust the height of the chart
              />
            </div>
          </Box>
        )}
      </Box>
    </>
  );
};
export default Overview;
