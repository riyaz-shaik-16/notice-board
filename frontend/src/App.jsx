import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

// Admin components
import {
  AdminOfficials,
  CreateOfficial,
  AdminLayout,
} from "./components/admin";

// Pages
import { AdminDashboard, Home, Login, NotFound, PublicNotices } from "./pages";
import { CreateNotice, OfficialLayout, MyNotices } from "./components/official";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notices" element={<PublicNotices />} />

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="officials" element={<AdminOfficials />} />
            <Route path="officials/create" element={<CreateOfficial />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="official" />}>
          <Route path="/official" element={<OfficialLayout />}>
            <Route path="create-notice" element={<CreateNotice />} />
            <Route path="notices" element={<MyNotices />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
