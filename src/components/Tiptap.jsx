import "./styles.scss";

import { useRef, useState, useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "./Menubar";
import FooterBar from "./Footerbar";
import handleSelectionUpdate from "./Synonym";
import Sidebar from "../components/Sidebar";
import SideTool from "./SideTool";
import { resetValue } from "../redux/synonym";
import { reset } from "../redux/spell";
import { handleRefUpdate } from "./Ref";
import SpellCheck from "./SpellCheck";
import { SpellErrorMark } from "./SpellErrorMark";
import { setLoadingSpell } from "../redux/onoff";

export default function Tiptap() {
  const synonymTimerRef = useRef(null);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const onoff = useSelector((state) => state.onoff.value);
  const ref = useSelector((state) => state.ref.value);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const prevSelectionRef = useRef({ from: null, to: null });
  const spellTimerRef = useRef(null);
  const prevTextRef = useRef("");
  const isUserInputRef = useRef(false);
  const countRef = useRef([]);
  const editor = useEditor({
    extensions: [
      SpellErrorMark,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
        showOnlyCurrent: false,
        showOnlyWhenEditable: true,
      }),
    ],
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    onSelectionUpdate({ editor }) {
      handleSelectionUpdate({
        //유의어 추천
        editor,
        synonymTimerRef,
        prevSelectionRef,
        onoff,
        dispatch,
      });
    },
    onUpdate({ editor }) {
      dispatch(resetValue());
      if (onoff.reference) {
        handleRefUpdate(editor, ref, dispatch);
      }
      if (onoff.spellChecker && isUserInputRef.current === false) {
        countRef.current = [];
        // dispatch(reset());
        const currentText = editor.getText();

        if (currentText !== prevTextRef.current) {
          prevTextRef.current = currentText;
          dispatch(setLoadingSpell(true));

          if (spellTimerRef.current) clearTimeout(spellTimerRef.current);
          spellTimerRef.current = setTimeout(() => {
            SpellCheck(editor, dispatch, currentText);
          }, 1500);
        }
      }
    },
  });
  useEffect(() => {
    if (selectedPost && editor) {
      editor.commands.setContent(selectedPost.content);
      setTitle(selectedPost.title);
    }
    const handleKeyDown = (event) => {
      if ([".", "?", "!"].includes(event.key)) {
        const currentText = editor.getText();
        console.log(1);
        SpellCheck(editor, dispatch, currentText);
      }
    };
    editor.view.dom.addEventListener("keydown", handleKeyDown);
  }, [selectedPost, editor]);

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="flex flex-col w-200 prose">
        <input
          className="text-2xl font-bold border-b p-2 m-1"
          type="text"
          placeholder="TITLE"
          value={title}
          name="sibal"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="editor-container">
          <MenuBar editor={editor} />
          <div className="editor-content">
            <EditorContent editor={editor} />
          </div>
          <FooterBar editor={editor} title={title} />
        </div>
      </div>
      <SideTool
        editor={editor}
        isUserInputRef={isUserInputRef}
        countRef={countRef}
      />
    </div>
  );
}
