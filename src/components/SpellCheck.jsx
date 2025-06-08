import { setLoadingSpell } from "../redux/onoff";
import { setCheck, save } from "../redux/spell";
import axiosInstance from "./axiosInstance";

export default function SpellCheck(editor, dispatch, currentText) {
  axiosInstance
    .post(
      "http://127.0.0.1:8000/api/spellcheck",
      {
        text: currentText,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("교정 결과:", response.data.checked_text);
      console.log("오류 부분:", response.data.corrections);
      console.log("원래문장:", response.data.original_text);
      editor
        .chain()
        .focus()
        .setTextSelection({
          from: 0,
          to: currentText.length + 1,
        })
        .clearAllSpellErrors()
        .run();
      response.data.corrections.map((correction) => {
        if (correction.errortype === 2) {
          editor
            .chain()
            .focus()
            .setTextSelection({
              from: correction.position,
              to: correction.position + 3,
            })
            .setSpellError()
            .run();
        } else {
          editor
            .chain()
            .focus()
            .setTextSelection({
              from: correction.position + 1,
              to: correction.position + 1 + correction.length,
            })
            .setSpellError()
            .run();
        }
      });

      const endPos = editor.state.doc.content.size;
      console.log(endPos);
      editor.commands.setTextSelection(endPos);
      dispatch(
        setCheck({
          corrections: response.data.corrections,
          original_text: response.data.original_text,
          checked_text: response.data.checked_text,
        })
      );
      dispatch(setLoadingSpell(false));
    })
    .catch((error) => {
      console.error("맞춤법 검사 요청 실패:", error);
      dispatch(setLoadingSpell(false));
    });

  // 아니면 디바운스
}
