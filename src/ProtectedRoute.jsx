// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // localStorage에서 토큰 꺼내기 (sessionStorage 써도 됨)
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    // 토큰 없으면 로그인 페이지로 보내기
    return <Navigate to="/login" replace />;
  }

  // 토큰 있으면 요청한 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
