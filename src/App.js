// packages
import { Route, Routes } from "react-router-dom";
// my imports
import { UserProvider } from "./context/UserContext";
import { Navbar, Footer, ProtectedRoute } from "./components";
import {
  Courses,
  Home,
  Dashboard,
  Leaderboard,
  Login,
  Register,
} from "./pages";

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
};

export default App;
