import "./styles.scss";

import { useEffect, useRef, useState } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWord } from "../redux/synonym";
import { setLoadingSynonym } from "../redux/onoff";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group w-full flex justify-evenly">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z" />
          </svg>
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z" />
          </svg>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z" />
          </svg>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z" />
          </svg>
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const FooterBar = ({ editor, title }) => {
  if (!editor) return null;

  function saveDoc() {
    const html = editor.getHTML();
    console.log(html, title);
  }

  return (
    <div className="flex justify-end border-1 border-[#9BA5B7]">
      <button
        className="cursor-pointer flex gap-1 bg-[#545F71] px-2 py-1"
        onClick={() => saveDoc()}
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

function extractSentenceFromSelection(editor) {
  const state = editor.state;
  const { from, to } = state.selection;
  const fullText = editor.getText();

  // 드래그한 위치를 기준으로 문장 확장
  let sentenceStart = from;
  while (sentenceStart > 0 && !/[.?!]/.test(fullText[sentenceStart - 1])) {
    sentenceStart--;
  }

  let sentenceEnd = to;
  while (
    sentenceEnd < fullText.length &&
    !/[.?!]/.test(fullText[sentenceEnd])
  ) {
    sentenceEnd++;
  }
  if (sentenceEnd < fullText.length) sentenceEnd++; // 마침표 포함
  const sentence = fullText.slice(sentenceStart, sentenceEnd).trim();
  return sentence || null;
}

export default function Tiptap() {
  const timeoutRef = useRef(null);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const onoff = useSelector((state) => state.onoff.value);
  let prevSelection = { from: null, to: null };
  const editor = useEditor({
    extensions: [
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
    onSelectionUpdate({ editor }) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // 타이머 초기화
      }
      if (onoff.synonym) {
        const { from, to } = editor.state.selection;
        if (
          from !== to &&
          (from !== prevSelection.from || to !== prevSelection.to)
        ) {
          prevSelection = { from, to };
          dispatch(setLoadingSynonym(true));
          console.log("on");
          timeoutRef.current = setTimeout(() => {
            const selection = window.getSelection()?.toString();
            if (selection) {
              const sentence = extractSentenceFromSelection(editor);
              const params = new URLSearchParams({
                user_sentence: sentence,
                MaskWord: selection,
                start: from,
                end: to,
              });
              const baseURL = "http://127.0.0.1:8000/model/WordRec";
              const fullURL = `${baseURL}?${params.toString()}`;
              axios
                .get(fullURL)
                .then((res) => {
                  console.log(res.data.rec_result);
                  dispatch(setLoadingSynonym(false));
                  console.log("off");
                  dispatch(setWord(res.data.rec_result));
                })
                .catch((err) => {
                  dispatch(setLoadingSynonym(false));
                  console.log("off");
                  console.error(err);
                });
            }
          }, 2000); // 1초 디바운스
        }
      }
    },
  });

  return (
    <div className="flex flex-col w-200 prose">
      <input
        className="text-2xl font-bold border-b p-2 m-1"
        type="text"
        placeholder="TITLE"
        value={title}
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
  );
}
