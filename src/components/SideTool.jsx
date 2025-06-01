import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { resetValue } from "../redux/synonym";
import { remove } from "../redux/spell";
import { useEffect } from "react";
import { tick } from "../redux/ref";

function handleWordClick(word, editor, from, to, dispatch) {
  console.log(from, to);
  editor.commands.insertContentAt({ from, to }, word);
  dispatch(resetValue());
}

function getAdjustedPosition(originalPosition, edits = []) {
  let shift = 0;
  console.log(edits);
  for (const edit of edits) {
    if (edit.position < originalPosition) {
      shift += edit.diff;
    }
  }
  return shift;
}

function handleText(editor, word, from, length, errortype, ref, countRef) {
  ref.current = true;
  let shift = getAdjustedPosition(from, countRef.current);
  if (errortype === 2) {
    editor
      .chain()
      .focus()
      .setTextSelection({
        from: from + shift,
        to: from + 3 + shift,
      }) // 선택 영역을 먼저 지정
      .removeSpellError() // 마크 씌우기
      .run();
    if (length === -1) {
      editor.commands.deleteRange({
        from: from + 1 + shift,
        to: from + 2 + shift,
      });
      countRef.current.push({ position: from, diff: -1 });
    } else {
      editor.commands.insertContentAt(from + 1 + shift, " ");
      countRef.current.push({ position: from, diff: +1 });
    }
  } else {
    editor
      .chain()
      .focus()
      .setTextSelection({
        from: from + 1 + shift,
        to: from + 1 + length + shift,
      }) // 선택 영역을 먼저 지정
      .removeSpellError() // 마크 씌우기
      .run();
    editor.commands.insertContentAt(
      {
        from: from + 1 + shift,
        to: from + 1 + length + shift,
      },
      word
    );
    countRef.current.push({ position: from, diff: word.length - length });
  }
  ref.current = false;
  // editor.commands.setTextSelection({ from: 0, to: 0 });
  const endPos = editor.state.doc.content.size;
  console.log(endPos);
  editor.commands.setTextSelection(endPos);
}

export default function SideTool({ editor, isUserInputRef, countRef }) {
  const dispatch = useDispatch();
  const onoff = useSelector((state) => state.onoff.value);
  const synonym = useSelector((state) => state.synonym.value);
  const ref = useSelector((state) => state.ref.value);
  const spell = useSelector((state) => state.spell.value);
  useEffect(() => {
    if (ref.isActive) return;
    const interval = setInterval(() => {
      dispatch(tick());
      console.log("-1");
    }, 1000);

    return () => clearInterval(interval);
  }, [ref.isActive, dispatch]);
  return (
    <div className="w-1/3 max-h-126 mt-22 mr-4 bg-white p-4 rounded-xl shadow border flex flex-col space-y-4-auto overflow-y-auto">
      {onoff.spellChecker && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            맞춤법 검사
          </h2>
          {onoff.loadingSpell ? (
            <PacmanLoader color="#000000" size={25} />
          ) : (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {spell.check_result.map((correction, index) => {
                return (
                  <li key={index}>
                    <span className="line-through">{`${correction.error}`}</span>
                    <span>{`-> ${correction.checked}`}</span>
                    <button
                      onClick={() => {
                        handleText(
                          editor,
                          correction.checked,
                          correction.position,
                          correction.length,
                          correction.errortype,
                          isUserInputRef,
                          countRef
                        );
                        dispatch(remove({ idx: index }));
                      }}
                      className="ml-2 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      선택
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <hr />
        </div>
      )}
      {onoff.synonym && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            유의어 추천
          </h2>
          {onoff.loadingSynonym ? (
            <PacmanLoader color="#000000" size={25} />
          ) : (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {synonym.word_result.slice(0, 3).map((word, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">
                      {index + 1}위
                    </span>
                    <span>{word}</span>
                  </div>
                  <button
                    onClick={() =>
                      handleWordClick(
                        word,
                        editor,
                        synonym.from,
                        synonym.to,
                        dispatch
                      )
                    }
                    className="ml-2 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          )}
          <hr />
        </div>
      )}
      {onoff.reference && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            참고문헌 추천
          </h2>
          {onoff.loadingRef ? (
            <PacmanLoader color="#3B82F6" size={25} />
          ) : (
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                <a target="_blank" href={ref.link_result[0]}>
                  {ref.name_result[0]}
                </a>
              </li>
              <li>
                <a target="_blank" href={ref.link_result[1]}>
                  {ref.name_result[1]}
                </a>
              </li>
              <li>
                <a target="_blank" href={ref.link_result[2]}>
                  {ref.name_result[2]}
                </a>
              </li>
            </ul>
          )}
          <hr />
        </div>
      )}
      {/* <span>{`${ref.isActive}`}</span>
      <span>{ref.secondsLeft}</span> */}
    </div>
  );
}
