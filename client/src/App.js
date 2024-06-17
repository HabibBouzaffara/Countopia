import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
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
import Assistance from "scenes/assistance";
import ProtectedRoute from "./ProtectedRoute.js"; // Import the ProtectedRoute component

function InvoicePage({ user }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  return <UploadInvoice clientId={userId} user={user} />;
}

function App() {
  const { mode, token, user } = useSelector((state) => ({
    mode: state.mode,
    token: state.token,
    user: state.user,
  }));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(token);

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

            <Route
              path='/*'
              element={
                <ProtectedRoute>
                  <Layout user={user} />
                </ProtectedRoute>
              }
            >
              <Route path='dashboard' element={<Dashboard user={user} />} />
              <Route path='profile' element={<Profile user={user} />} />
              {user && user.role === "superadmin" && (
                <Route path='admins' element={<Admins superadmin={user} />} />
              )}
              {user &&
                (user.role === "superadmin" || user.role === "admin") && (
                  <>
                    <Route path='clients' element={<Clients user={user} />} />
                    <Route
                      path='invoices'
                      element={<InvoicePage user={user} />}
                    />
                  </>
                )}
              <Route path='overview' element={<Overview user={user} />} />
              <Route path='journal' element={<InvoicesJournal user={user} />} />
              <Route path='assistance' element={<Assistance user={user} />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
