export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <header style={{ borderBottom: '2px solid #0f0', paddingBottom: '20px', marginBottom: '30px' }}>
        <pre style={{ fontSize: '24px', color: '#0f0', margin: 0 }}>
{`
╔═══════════════════════════════════════╗
║     O M N I C O N T R O L            ║
║     Remote PC Control System         ║
╚═══════════════════════════════════════╝
`}
        </pre>
        <p style={{ marginTop: '10px', color: '#0f0' }}>
          [<a href="#about">ABOUT</a>] [<a href="#features">FEATURES</a>] [<a href="#download">DOWNLOAD</a>] [<a href="https://github.com/OmniControl-HQ/omni-control">GITHUB</a>]
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* About Section */}
        <section id="about" style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#0f0', marginBottom: '15px' }}>{'>'} ABOUT</h2>
          <p style={{ marginBottom: '10px' }}>
            Control your PC from your phone. Turn your smartphone into a wireless mouse, 
            keyboard, and media remote.
          </p>
          <p style={{ marginBottom: '10px' }}>
            100% FREE | OPEN SOURCE | NO ADS | CROSS-PLATFORM
          </p>
          <pre style={{ marginTop: '15px' }}>
{`Status: [ONLINE]
Version: 1.0.0
License: MIT
Platforms: Windows | macOS | Linux | Android | iOS`}
          </pre>
        </section>

        {/* Features Section */}
        <section id="features" style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#0f0', marginBottom: '15px' }}>{'>'} FEATURES</h2>
          <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>► Wireless Mouse Control</li>
            <li style={{ marginBottom: '8px' }}>► Full Keyboard Input</li>
            <li style={{ marginBottom: '8px' }}>► Media Playback Remote</li>
            <li style={{ marginBottom: '8px' }}>► PIN-Protected Authentication</li>
            <li style={{ marginBottom: '8px' }}>► Local Network Only (Privacy)</li>
            <li style={{ marginBottom: '8px' }}>► Ultra Low Latency</li>
          </ul>
        </section>

        {/* How it Works */}
        <section id="how" style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#0f0', marginBottom: '15px' }}>{'>'} HOW IT WORKS</h2>
          <pre>
{`[1] Download desktop app → Install on PC
     ↓
[2] Download mobile app → Install on phone
     ↓
[3] Connect to same WiFi network
     ↓
[4] Scan QR code from desktop app
     ↓
[5] Start controlling!`}
          </pre>
        </section>

        {/* Download Section */}
        <section id="download" style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#0f0', marginBottom: '15px' }}>{'>'} DOWNLOAD</h2>
          
          <h3 style={{ color: '#0f0', marginBottom: '10px', fontSize: '18px' }}>DESKTOP:</h3>
          <ul style={{ listStyle: 'none', paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '5px' }}>
              <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                [Windows] Setup Installer (~76MB)
              </a>
            </li>
            <li style={{ marginBottom: '5px' }}>
              <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                [macOS] DMG Package (~85MB)
              </a>
            </li>
            <li style={{ marginBottom: '5px' }}>
              <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                [Linux] AppImage / DEB (~90MB)
              </a>
            </li>
          </ul>

          <h3 style={{ color: '#0f0', marginBottom: '10px', fontSize: '18px' }}>MOBILE:</h3>
          <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>
              <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                [Android] APK Download (~50MB)
              </a>
            </li>
            <li style={{ marginBottom: '5px' }}>
              <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                [iOS] Build from source (coming soon)
              </a>
            </li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section id="tech" style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#0f0', marginBottom: '15px' }}>{'>'} TECH STACK</h2>
          <pre>
{`Desktop: Electron + Node.js + TypeScript
Mobile:  React Native + Expo
Backend: Fastify + Socket.io + RobotJS
UI:      React + TailwindCSS`}
          </pre>
        </section>

        {/* Stats */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#0f0', marginBottom: '15px' }}>{'>'} STATISTICS</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #0f0' }}>
                <td style={{ padding: '8px' }}>Desktop Platforms</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>3</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #0f0' }}>
                <td style={{ padding: '8px' }}>Mobile Platforms</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>2</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #0f0' }}>
                <td style={{ padding: '8px' }}>Total Features</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>6+</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>License</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>MIT</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '2px solid #0f0', paddingTop: '20px', marginTop: '40px' }}>
        <pre style={{ fontSize: '12px' }}>
{`═══════════════════════════════════════════════════════════
  © 2026 OmniControl | MIT License | Open Source
  GitHub: https://github.com/OmniControl-HQ/omni-control
═══════════════════════════════════════════════════════════`}
        </pre>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          Made with ❤️ by the OmniControl Team
        </p>
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#0f0' }}>
          [Last Updated: 2026-08-05] [Status: ONLINE]
        </p>
      </footer>
    </div>
  );
}
