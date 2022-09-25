// packages
import { Route, Routes } from "react-router-dom";
// my imports
import { UserContext, UserProvider } from "./context/UserContext";
import { Navbar, Footer, Private } from "./components";
import {
  Courses,
  Home,
  Dashboard,
  Leaderboard,
  Login,
  Register,
} from "./pages";
import { useContext } from "react";

const App = () => {
  const user = useContext(UserContext);

  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/private" element={<Private user={user} />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <Footer />
    </UserProvider>
  );
};

export default App;
