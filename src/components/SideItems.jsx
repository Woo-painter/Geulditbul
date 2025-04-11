export default function SideItems() {
  return (
    <div className="flex flex-col p-3 py-1">
      <div className="text-[9px]">서비스</div>
      <div>
        <ul>
          <li className="p-1">
            <a className="flex items-center" href="">
              <div className="w-6 h-6 inline-block">
                <img className="object-cover" src="spellChecker.png" alt="" />
              </div>
              <span className="text-[11px]">맞춤법 검사</span>
            </a>
          </li>
          <li className="p-1">
            <a className="flex items-center" href="">
              <div className="w-6 h-6 inline-block">
                <img
                  className="object-cover"
                  src="synonymRecommend.png"
                  alt=""
                />
              </div>
              <span className="text-[11px]">유의어 추천</span>
            </a>
          </li>
          <li className="p-1">
            <a className="flex items-center" href="">
              <div className="w-6 h-6 inline-block">
                <img className="object-cover" src="recommend.png" alt="" />
              </div>
              <span className="text-[11px]">맞춤법 검사</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
