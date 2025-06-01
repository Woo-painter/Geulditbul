import { setWord } from "../redux/synonym";
import { setLoadingSynonym } from "../redux/onoff";
import axios from "axios";
import axiosInstance from "./axiosInstance";

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

function handleSelectionUpdate({
  editor,
  synonymTimerRef,
  prevSelectionRef,
  onoff,
  dispatch,
}) {
  if (synonymTimerRef.current) {
    clearTimeout(synonymTimerRef.current);
  }

  if (onoff.synonym) {
    const { from, to } = editor.state.selection;

    if (
      from !== to &&
      (from !== prevSelectionRef.current.from ||
        to !== prevSelectionRef.current.to)
    ) {
      prevSelectionRef.current = { from, to };
      synonymTimerRef.current = setTimeout(() => {
        dispatch(setLoadingSynonym(true));
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
          axiosInstance
            .get(fullURL, {
              withCredentials: true,
            })
            .then((res) => {
              dispatch(setLoadingSynonym(false));
              dispatch(setWord({ result: res.data.rec_result, from, to }));
            })
            .catch((err) => {
              dispatch(setLoadingSynonym(false));
              console.error(err);
            });
        }
      }, 2000);
    }
  }
}

export default handleSelectionUpdate;
