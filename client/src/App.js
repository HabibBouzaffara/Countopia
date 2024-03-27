import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import LoginPage from "./scenes/loginPage";
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
            <Route path="/" element={isAuth? <Navigate to="/dashboard" />:<LoginPage />} />
               <Route element={isAuth?<Layout />:<Navigate to="/" />}> 
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
