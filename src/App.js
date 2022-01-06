import Login from "./components/Login/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
