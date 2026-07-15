export default function TitleBar() {
  return (
    <div>
      <div>
        <span>OmniControl</span>
      </div>
      <div>
        <button onClick={() => window.electron.window.minimize()}>
          minimize
        </button>
        <button onClick={() => window.electron.window.toggleMaximize()}>
          maximize
        </button>
        <button onClick={() => window.electron.window.close()}>close</button>
      </div>
    </div>
  );
}
