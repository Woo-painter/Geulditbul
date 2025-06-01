// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // 또는 바로 글쓰기 페이지: navigate("/write")
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
      <h1 className="text-5xl font-bold mb-4">✍️ Geuilditbul</h1>
      <p className="text-lg text-gray-600 mb-8">
        당신의 글쓰기를 더 똑똑하게, 더 빠르게.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
