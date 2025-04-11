export default function Logo() {
  return (
    <a href="">
      <section className="w-40 h-13 p-2 flex gap-1">
        <div className="w-9 h-9">
          <img className="object-cover" src="image.png" alt="logo" />
        </div>
        <div className="leading-3 h-6 my-1.5">
          <span className="block text-[12px] font-bold">Geulditbul</span>
          <span className="block text-[10px]">Writing Assistant v1</span>
        </div>
      </section>
    </a>
  );
}
