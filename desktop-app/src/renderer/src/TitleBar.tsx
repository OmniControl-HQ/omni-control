export default function TitleBar() {
  return (
    <div className="title-bar">
      <div className="title-bar-drag">
        <span className="title-bar-text">OmniControl</span>
      </div>
      <div className="title-bar-controls">
        <button
          className="title-bar-btn"
          onClick={() => window.electron.window.minimize()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className="title-bar-btn"
          onClick={() => window.electron.window.toggleMaximize()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>
        <button
          className="title-bar-btn close"
          onClick={() => window.electron.window.close()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
