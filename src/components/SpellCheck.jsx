import { setLoadingSpell } from "../redux/onoff";
import { setCheck } from "../redux/spell";
import axiosInstance from "./axiosInstance";

export default function SpellCheck(editor, timerRef, prevTextRef, dispatch) {
  const currentText = editor.getText();
  const lastChar = currentText.slice(-1); // 마지막 문자

  const shouldRunImmediately = [".", "?", "!"].includes(lastChar);

  if (currentText !== prevTextRef.current) {
    prevTextRef.current = currentText;

    if (timerRef.current) clearTimeout(timerRef.current);
    dispatch(setLoadingSpell(true));

    const runSpellCheck = () => {
      axiosInstance
        .post(
          "http://0.0.0.0:8000/api/spellcheck",
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
    };

    if (shouldRunImmediately) {
      runSpellCheck(); // 마침부호 입력 시 즉시 실행
    } else {
      timerRef.current = setTimeout(runSpellCheck, 1500); // 아니면 디바운스
    }
  }
}
