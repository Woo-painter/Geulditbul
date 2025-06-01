import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./page/Login1";
import SignUp from "./page/SignUp";
import Tiptap from "./components/Tiptap";
import Main from "./page/Main";
import ProtectedRoute from "./ProtectedRoute"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Tiptap />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
