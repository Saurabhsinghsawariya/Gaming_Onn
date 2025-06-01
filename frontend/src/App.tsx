import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Games from "./components/games";
import Home from "./components/Home";
import Hero from "./components/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";


import UserProfile from "./components/Profile/User_profile";
import JoinUs from "./pages/Join Us ";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Hero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      
        <Route path="/Join-Us" element={<JoinUs />} />
        <Route
          path="/footer"
          element={
            <ProtectedRoute>
              <Banner />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;