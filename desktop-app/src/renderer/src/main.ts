// Renderer process entry point — runs in the browser context (Chromium)
// Vite handles HMR here automatically in dev mode
import './styles.css'

const app = document.getElementById('app')!

app.innerHTML = `
  <div class="title-bar">
    <div class="title-bar-drag">
      <span class="title-bar-text">OmniControl</span>
    </div>
    <div class="title-bar-controls">
      <button class="title-bar-btn" id="minimize-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <button class="title-bar-btn" id="maximize-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      </button>
      <button class="title-bar-btn close" id="close-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  </div>
  <div class="container">
    <div class="logo-container">
      <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 17l6-6-6-6M12 19h8" />
      </svg>
    </div>
    <h1>OmniControl</h1>
    <div class="status-badge">
      <div class="status-dot"></div>
      Desktop Server Running
    </div>
    <div class="details-box">
      <div class="details-row">
        <span class="label">Socket Port</span>
        <span class="value">5000</span>
      </div>
      <div class="details-row">
        <span class="label">Status</span>
        <span class="value success">Listening</span>
      </div>
      <div class="details-row">
        <span class="label">Connected Clients</span>
        <span class="value" id="client-count">0</span>
      </div>
    </div>
    <p class="instruction">
      Start the mobile app and point it to this machine's local IP on port 5000.
    </p>
  </div>
`

// Add button event listeners
document.getElementById('minimize-btn')?.addEventListener('click', () => {
  window.electron.window.minimize()
})
document.getElementById('maximize-btn')?.addEventListener('click', () => {
  window.electron.window.toggleMaximize()
})
document.getElementById('close-btn')?.addEventListener('click', () => {
  window.electron.window.close()
})
