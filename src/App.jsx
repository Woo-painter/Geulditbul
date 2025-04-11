import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import WritingPage from "./components/WritingPage";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WritingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
