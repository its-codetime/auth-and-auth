import Typography from "@mui/material/Typography";
import { Routes, Route, Navigate } from "react-router-dom";

// auth context
import { useAuth } from "./context/Auth";

// pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import PasswordResetCreate from "./pages/PasswordResetCreate";
import PasswordResetUpdate from "./pages/PasswordResetUpdate";

function App() {
  const {
    user,
    login,
    register,
    logout,
    createPasswordReset,
    verifyPasswordReset,
    updatePassword,
  } = useAuth(); // handles auth

  return (
    <div className="App">
      <header>
        <Typography
          sx={{ margin: 2 }}
          align="center"
          gutterBottom
          variant="h2"
          component="h1"
        >
          Auth & Auth
        </Typography>
      </header>
      <main>
        {user === null ? (
          <Routes>
            <Route
              path="/register"
              element={<Register register={register} />}
            />
            <Route path="/login" element={<Login login={login} />} />
            <Route
              path="/password-reset/create"
              element={
                <PasswordResetCreate
                  createPasswordReset={createPasswordReset}
                />
              }
            />
            <Route
              path="/password-reset/update/:resetToken"
              element={
                <PasswordResetUpdate
                  updatePassword={updatePassword}
                  verifyPasswordReset={verifyPasswordReset}
                />
              }
            />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/user"
              element={<User user={user} logout={logout} />}
            />
            <Route path="*" element={<Navigate to="/user" />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
