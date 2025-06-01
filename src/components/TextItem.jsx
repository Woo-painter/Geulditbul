import axiosInstance from "./axiosInstance";
import { fetchPosts, fetchSinglePost } from "../redux/post";
import { useDispatch } from "react-redux";

const deletePost = async (postId, dispatch) => {
  try {
    await axiosInstance.delete(`http://127.0.0.1:8000/post/${postId}`, {});
    console.log("Post deleted");
    // 삭제 후 리덕스나 상태 리프레시
    dispatch(fetchPosts());
  } catch (err) {
    console.error("Error deleting post:", err);
  }
};

export default function TextItem({ image, text, on, id, onClick }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`flex items-center p-1 w-full cursor-pointer ${
        on && "bg-gray-200 text-gray-900 font-semibold"
      }`}
      onClick={() => {
        onClick();
        dispatch(fetchSinglePost(id));
      }}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        <img className="object-cover" src={image} alt="" />
      </div>
      <span className={`text-[11px] ml-1 ${on && "font-bold"}`}>{text}</span>
      {on ? (
        <svg
          className="ml-auto mr-2"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#000000"
          onClick={() => {
            deletePost(id, dispatch);
          }}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      ) : (
        <svg
          className="ml-auto mr-2"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#9BA5B7"
          onClick={() => {
            deletePost(id, dispatch);
          }}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      )}
    </button>
  );
}
