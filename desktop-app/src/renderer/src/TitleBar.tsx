export default function TitleBar() {
  return (
    <div className="app-drag flex h-10 w-full items-center bg-[#111415]/50 justify-between px-3 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
        <span>Omni Control</span>
      </div>
      <div className="app-no-drag flex items-center gap-1">
        <button
          type="button"
          onClick={() => window.electron.window.minimize()}
          className="rounded-md px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-white active:opacity-80"
        >
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>
        <button
          type="button"
          onClick={() => window.electron.window.toggleMaximize()}
          className="rounded-md px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-white active:opacity-80"
        >
          <span className="material-symbols-outlined text-[18px]">
            crop_square
          </span>
        </button>
        <button
          type="button"
          onClick={() => window.electron.window.close()}
          className="rounded-md px-2 py-1 text-zinc-300 transition hover:bg-red-500/30 hover:text-white active:opacity-80"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
