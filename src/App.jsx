import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StaffScanner from "./pages/StaffScanner";
import BeneficiosManager from "./pages/BeneficiosManager";
import CanjeBeneficios from "./pages/CanjeBeneficios";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h1 className="text-3xl font-bold text-center text-blue-600 my-5">
          Distrito Pass 🚀
        </h1>


        <nav>
          <Link to="/">Home</Link> | 

          {!currentUser && (
            <>
              <Link to="/login">Login</Link> 
            </>
          )}

          {currentUser && (
            <>
              {["admin", "staff"].includes(currentUser.rol) && (
                <>
                  <Link to="/register">Registro</Link> | 
                </>
              )}

              <Link to="/dashboard">Dashboard</Link> | 

              {(currentUser.rol === "staff" || currentUser.rol === "admin") && (
                <>
                  <Link to="/scanner">Escaneo NFC</Link> | 
                  <Link to="/canje">Canje</Link> | 
                </>
              )}

              {currentUser.rol === "admin" && (
                <>
                  <Link to="/beneficios">Beneficios</Link> | 
                  <Link to="/admin">Admin</Link> | 
                </>
              )}

              <LogoutButton />
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<h2>Bienvenido a Distrito Pass</h2>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute roles={["usuario", "staff", "admin"]}>
              <Dashboard />
            </ProtectedRoute>} />

          <Route path="/scanner" element={
            <ProtectedRoute roles={["staff", "admin"]}>
              <StaffScanner />
            </ProtectedRoute>} />

          <Route path="/beneficios" element={
            <ProtectedRoute roles={["admin"]}>
              <BeneficiosManager />
            </ProtectedRoute>} />

          <Route path="/canje" element={
            <ProtectedRoute roles={["staff", "admin"]}>
              <CanjeBeneficios />
            </ProtectedRoute>} />

          <Route path="/admin" element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
