import Login from "./components/Login/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import AuthProvider from "./context/AuthProvider";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" exact element={<ChatRoom />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
