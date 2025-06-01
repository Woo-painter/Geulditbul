import axios from "axios";
import Logo from "./Logo";
import SideItems from "./SideItems";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const API_URL = "http://127.0.0.1:8000"; // 실제 백엔드 주소로 수정

async function handleLogout() {
  try {
    await axios.post(
      `${API_URL}/auth/logout`,
      {}, // POST body 없음
      {
        withCredentials: true, // 쿠키 포함
      }
    );

    // 프론트엔드 토큰/세션 상태도 정리
    sessionStorage.removeItem("access_token"); // access token이 localStorage에 저장된 경우
    // 또는 상태관리에서 제거: setAccessToken(null) 등

    // 페이지 이동 (예: 로그인 화면)
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
}

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-40  min-h-screen border-r border-gray-300">
      <Logo />
      <SideItems/>
      <button
        className="w-39 cursor-pointer fixed bottom-0 left-0 bg-white"
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
      >
        <section className="w-full h-13 p-2 flex gap-1">
          <div className="w-9 h-9 flex items-center justify-center rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </div>
          <div className="leading-3 h-6 my-1.5">
            <span className="block text-[12px] font-bold text-left">
              로그아웃
            </span>
            <span className="block text-[9px]">현재 계정에서 로그아웃</span>
          </div>
        </section>
      </button>
    </aside>
  );
}
