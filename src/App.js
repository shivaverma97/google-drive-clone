import SignUp from "./authentication/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LogIn from "./authentication/LogIn";
import Profile from "./profile/Profile";
import PrivateRoutes from "./authentication/PrivateRoutes";
import ResetPassword from "./authentication/ResetPassword"
import UpdateProfile from "./profile/UpdateProfile";
import Dashboard from "./googleDrive/Dashboard";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/signup" Component={SignUp} />
              <Route path="/login" Component={LogIn} />
              <Route path="/user" Component={PrivateRoutes}>
                <Route path="/user" Component={Profile} />
              </Route>
              <Route path="/" Component={PrivateRoutes}>
                <Route path="/" Component={Dashboard} />
              </Route>
              <Route path="/updateprofile" Component={PrivateRoutes}>
                <Route path="/updateprofile" Component={UpdateProfile} />
              </Route>
              <Route path="/resetpassword" Component={ResetPassword} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;


