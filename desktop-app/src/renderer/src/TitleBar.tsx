export default function TitleBar() {
  return (
    <div className="app-drag flex right-0  items-center  justify-between absolute  backdrop-blur-xl z-20 pt-2 pr-2">
      <div className="app-no-drag flex items-center gap-1">
        <button
          type="button"
          onClick={() => window.electron.window.minimize()}
          className="rounded-md flex items-center justify-center px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-white active:opacity-80"
        >
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>

        <button
          type="button"
          onClick={() => window.electron.window.close()}
          className="rounded-md  flex items-center justify-center px-2 py-1 text-zinc-300 transition hover:bg-red-500/30 hover:text-white active:opacity-80"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
