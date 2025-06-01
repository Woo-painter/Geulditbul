import { useState } from "react";
import axiosInstance from "./axiosInstance";
export default function NewPostInput({ onSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && title.trim() !== "") {
      try {
        const res = await axiosInstance.post(
          "http://localhost:8000/post/posts",
          {
            title: title.trim(),
            content: "", // 내용은 나중에 입력하니까 빈 문자열
          }
        );

        console.log("Post created:", res.data);
        setTitle("");
        setIsEditing(false);
        if (onSuccess) onSuccess(); // 성공 시 목록 리프레시용 콜백
      } catch (err) {
        console.error("Error creating post:", err);
      }
    }
  };

  return (
    <div className="px-3 py-2">
      {isEditing ? (
        <input
          autoFocus
          className="w-full p-1 border rounded text-sm"
          value={title}
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)} // 포커스 잃으면 취소
        />
      ) : (
        <button
          className={`flex items-center p-1 w-full cursor-pointer `}
          onClick={() => setIsEditing(true)}
        >
          <div className="w-6 h-6 flex justify-center items-center">
            <img className="object-cover" src={"add.svg"} alt="" />
          </div>
          <span className={`text-[11px] ml-1 `}>{"새글추가"}</span>
        </button>
      )}
    </div>
  );
}
