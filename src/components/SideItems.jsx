import SideItem from "./SideItem";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSpellChecker,
  toggleSynonym,
  toggleReference,
} from "../redux/onoff";
export default function SideItems() {
  const onoff = useSelector((state) => state.onoff.value);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col py-1">
      <div className="text-[9px] px-3">서비스</div>
      <div>
        <ul>
          <li className="">
            <SideItem
              image={"spellChecker.png"}
              text={`맞춤법검사`}
              action={() => dispatch(toggleSpellChecker())}
              on={onoff.spellChecker}
            />
          </li>
          <li className="">
            <SideItem
              image={"synonymRecommend.png"}
              text={`유의어추천`}
              action={() => dispatch(toggleSynonym())}
              on={onoff.synonym}
            />
          </li>
          <li className="">
            <SideItem
              image={"recommend.png"}
              text={"참고문헌추천"}
              action={() => dispatch(toggleReference())}
              on={onoff.reference}
            />
          </li>
        </ul>
      </div>
      <div className="text-[9px] px-3">글 목록</div>
      <div>
        <ul>
          <li className="">
            <SideItem image={"text.png"} text={"글 1"} />
          </li>
        </ul>
      </div>
    </div>
  );
}
