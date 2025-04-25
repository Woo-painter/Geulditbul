export default function SideItem({ image, text }) {
  return (
    <button className="flex items-center p-1 w-full cursor-pointer">
      <div className="w-6 h-6 flex justify-center items-center">
        <img className="object-cover" src={image} alt="" />
      </div>
      <span className="text-[11px] ml-1">{text}</span>
      <svg
       className="ml-auto mr-2"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 4.16671L13.3333 10L7.5 15.8334"
          stroke="#9BA5B7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
