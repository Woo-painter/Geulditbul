import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import WritingPage from "./page/WritingPage";
import Login from "./page/Login1";
import SignUp from "./page/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WritingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
