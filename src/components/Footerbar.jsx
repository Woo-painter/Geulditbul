import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./axiosInstance";
import { fetchPosts } from "../redux/post";

const FooterBar = ({ editor, title }) => {
  if (!editor) return null;
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const dispatch = useDispatch();
  const updatePost = async () => {
    const content = editor.getHTML();
    try {
      const res = await axiosInstance.put("http://127.0.0.1:8000/post/save", {
        post_id: selectedPost.post_id,
        title,
        content,
      });
      console.log("Post updated!", res.data);
      dispatch(fetchPosts());
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  return (
    <div className="flex justify-end border-1 border-[#9BA5B7]">
      <button
        className="cursor-pointer flex gap-1 bg-[#545F71] px-2 py-1"
        onClick={() => updatePost()}
      >
        <span className="text-white text-1">SAVE</span>
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
        >
          <path d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z" />
        </svg>
      </button>
    </div>
  );
};

export default FooterBar;
