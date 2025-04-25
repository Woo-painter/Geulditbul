import Sidebar from "../components/Sidebar";
import Tiptap from "../components/Tiptap";

export default function WritingPage() {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <Tiptap />
      <div className="w-1/3 max-h-126 mt-22 mr-4 bg-white p-4 rounded-xl shadow border flex flex-col space-y-4-auto overflow-y-auto">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            맞춤법 검사
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>“있습니다” → “있습니다.”</li>
            <li>“않되다” → “안되다”</li>
          </ul>
        </div>

        <hr />

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            유의어 추천
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>어휘</li>
            <li>문장</li>
            <li>글자</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            참고문헌 추천
          </h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>오은하, 편지윤, 서혁. (2023). 성인의 어휘 능력 조사 결과 분석 - 어휘 등급과 응답자 수준 비교를 중심으로. 국어교육연구, 83, 167-216.</li>
            <li>신명선. (2020). 관점 선택과 어휘 능력, 그리고 교육. 우리말글, 84, 179-212.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
