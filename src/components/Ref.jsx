import { setRef, startCooldown } from "../redux/ref";
import { setLoadingRef } from "../redux/onoff";
import axiosInstance from "./axiosInstance";

export function handleRefUpdate(editor, ref, dispatch) {
  const text = editor.getText();
  const length = text.length;
  if (length >= 150 && length !== 0 && ref.isActive === true) {
    dispatch(startCooldown());
    dispatch(setLoadingRef(true));
    const baseURL = "http://127.0.0.1:8000/model/RefRec";
    const encodedText = encodeURIComponent(text);
    const url = `${baseURL}?text=${encodedText}`;
    axiosInstance
      .get(url, {
        withCredentials: true, // 리프레시 토큰 쿠키 쓰면 필요, 아니면 생략 가능
      })
      .then((res) => {
        dispatch(setLoadingRef(false));
        dispatch(
          setRef({
            name_result: res.data.name_result,
            link_result: res.data.link_result,
          })
        );
      })
      .catch((err) => {
        dispatch(setLoadingRef(false));
        console.error(err);
      });
  }
}
