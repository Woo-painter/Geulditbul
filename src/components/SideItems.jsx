import SideItem from "./SideItem";

export default function SideItems() {
  return (
    <div className="flex flex-col py-1">
      <div className="text-[9px] px-3">서비스</div>
      <div>
        <ul>
          <li className="">
            <SideItem image={"spellChecker.png"} text={`맞춤법검사`}/>
          </li>
          <li className="">
            <SideItem image={"synonymRecommend.png"} text={`유의어추천`}/>
          </li>
          <li className="">
            <SideItem image={"recommend.png"} text={'참고문헌추천'}/>
              
          </li>
        </ul>
      </div>
      <div className="text-[9px] px-3">글 목록</div>
      <div>
        <ul>
          <li className="">
            <SideItem image={"text.png"} text={"글 1"}/>
          </li>
        </ul>
      </div>
    </div>
  );
}
