// packages
import { Route, Routes } from "react-router-dom";
import { Homepage, ChatPage, ProfilePage } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default App;
