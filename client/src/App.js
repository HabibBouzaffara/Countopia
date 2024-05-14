import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Profile from "scenes/profile";
import LoginPage from "./scenes/loginPage";
import LandingPage from "scenes/landing.Page/LandingPage";
import Admins from "scenes/adminsManagement";
import Clients from "scenes/clientsManagement";
import UploadInvoice from "scenes/Invoices";
import Overview from "scenes/Overview";
import InvoicesJournal from "scenes/journal/InvoicesJournal";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);

  const InvoicePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");

    return <UploadInvoice clientId={userId} user={user} />;
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/auth'
              element={
                isAuth ? (
                  <Navigate to='/profile' />
                ) : (
                  <LoginPage action='login' />
                )
              }
            />
            <Route path='/register' element={<LoginPage action='register' />} />
            <Route path='/login' element={<LoginPage action='login' />} />
            <Route path='/verify' element={<LoginPage action='verify' />} />
            {isAuth && user ? (
              <Route element={<Layout user={user} />}>
                <Route path='/profile' element={<Profile user={user} />} />
                <Route path='/dashboard' element={<Dashboard user={user} />} />
                {user.role === "superadmin" && (
                  <Route
                    path='/admins'
                    element={<Admins superadmin={user} />}
                  />
                )}
                {(user.role === "superadmin" || user.role === "admin") && (
                  <>
                    <Route path='/clients' element={<Clients user={user} />} />
                    <Route path='/invoices' element={<InvoicePage />} />
                    {/* <Route path='/journal' element={<Journal user={user} />} /> */}
                  </>
                )}

                <Route path='/overview' element={<Overview user={user} />} />
                <Route
                  path='/journal'
                  element={<InvoicesJournal user={user} />}
                />
              </Route>
            ) : (
              <Route path='/auth' element={<LoginPage />} />
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
