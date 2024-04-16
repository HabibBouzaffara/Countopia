import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Profile from "scenes/profile";
import LoginPage from "./scenes/loginPage";
import LandingPage from "scenes/landing.Page/LandingPage";
import state from "state";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  console.log(state.token);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={isAuth? <Navigate to="/profile" />:<LoginPage />} />
               <Route element={isAuth?<Layout />:<Navigate to="/auth" />}> 
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              </Route>   
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
