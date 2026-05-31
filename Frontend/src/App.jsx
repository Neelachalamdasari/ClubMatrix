import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ClubPage from "./pages/ClubPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateClub from "./pages/createClub";
import SingleClub from "./pages/SingleClub";
import JoinedClubs from "./pages/JoinedClubs";
import Notifications from "./pages/Notifications";
import MembersPage from "./pages/MembersPage";
import MyTasks from "./pages/MyTasks";
import UpcomingEvents from "./pages/UpcomingEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute>
              <ClubPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-club"
          element={
            <ProtectedRoute>
              <CreateClub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs/:clubId"
          element={
            <ProtectedRoute>
              <SingleClub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/joined-clubs"
          element={
            <ProtectedRoute>
              <JoinedClubs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs/:clubId/members"
          element={
            <ProtectedRoute>
              <MembersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upcoming-events"
          element={
            <ProtectedRoute>
              <UpcomingEvents />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
