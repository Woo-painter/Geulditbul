import Sidebar from "./sidebar";
import Tiptap from "./Tiptap";

export default function WritingPage() {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <Tiptap/>
    </div>
  );
}
