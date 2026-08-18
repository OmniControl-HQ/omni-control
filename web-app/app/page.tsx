export default function Home() {
  const navItems = [
    { name: "Home", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Download", href: "#download" },
    { name: "Documentation", href: "#setup" },
    { name: "Screenshots", href: "#screenshots" },
    { name: "GitHub", href: "https://github.com/Omni Control-HQ/omni-control" },
    { name: "Support", href: "#why" },
  ];

  return (
    <div>
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          padding: "40px 20px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#fff",
            margin: "0 0 10px 0",
            fontWeight: "bold",
          }}
        >
          Omni Control
        </h1>
        <p style={{ fontSize: "18px", color: "#fff", margin: "0 0 25px 0" }}>
          Free Open Source Remote PC Control Software - Control Your Computer
          from Your Phone
        </p>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "6px 14px",
                background: "rgba(0,0,0,0.2)",
                fontSize: "13px",
                fontWeight: "bold",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main
        style={{ maxWidth: "760px", margin: "0 auto 40px", padding: "0 20px" }}
      >
        <div
          style={{
            background: "#f5f1e8",
            padding: "25px 30px",
            border: "1px solid #ccc",
          }}
        >
          {/* About */}
          <section id="about" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              What is Omni Control?
            </h2>
            <p style={{ marginBottom: "12px" }}>
              <strong>Omni Control</strong> is a free, open-source remote
              desktop control application that transforms your smartphone into a
              powerful wireless mouse, keyboard, and media remote for your PC.
              Control your Windows, macOS, or Linux computer from anywhere in
              your home using your Android or iOS device.
            </p>
            <p style={{ marginBottom: "12px" }}>
              Unlike commercial remote control software that requires
              subscriptions or contains ads, Omni Control is completely free and
              respects your privacy. All communication happens locally on your
              WiFi network - no internet connection required, no data
              collection, and no third-party servers.
            </p>
            <p>
              Built with modern technologies including{" "}
              <a href="https://nodejs.org">Node.js</a>,{" "}
              <a href="https://reactnative.dev">React Native</a>, and{" "}
              <a href="https://socket.io">Socket.io</a>, Omni Control offers
              real-time, low-latency control with enterprise-grade security
              through PIN-protected authentication.
            </p>
          </section>

          {/* Screenshots */}
          <section id="screenshots" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              Screenshots
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <div
                style={{
                  background: "#ddd",
                  border: "1px solid #999",
                  padding: "60px 20px",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Desktop App Screenshot
                <br />
                <small>(Windows/macOS/Linux)</small>
              </div>
              <div
                style={{
                  background: "#ddd",
                  border: "1px solid #999",
                  padding: "60px 20px",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Mobile App Screenshot
                <br />
                <small>(Android/iOS)</small>
              </div>
            </div>
          </section>

          {/* Why Choose */}
          <section id="why" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              Why Choose Omni Control for Remote PC Control?
            </h2>
            <p style={{ marginBottom: "10px" }}>
              <strong>Omni Control</strong> is developed by passionate{" "}
              <a href="https://github.com/Omni Control-HQ">
                open-source contributors
              </a>{" "}
              who believe in creating accessible technology for everyone.
              Whether you're watching movies on your couch, giving
              presentations, or working from another room, Omni Control makes
              remote PC control simple and intuitive.
            </p>
            <p style={{ marginBottom: "10px" }}>
              Join thousands of users who have replaced expensive remote control
              solutions with Omni Control. If you find this software valuable,
              consider <a href="#donate">supporting the project</a> to help us
              continue development and maintenance.
            </p>
            <p>
              Want to contribute? We welcome developers, translators, and
              testers! Check our{" "}
              <a href="https://github.com/Omni Control-HQ/omni-control">
                GitHub repository
              </a>{" "}
              to get started with contributing to this free remote control
              software.
            </p>
          </section>

          {/* Features */}
          <section id="features" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              Comprehensive Remote Control Features
            </h2>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Intuitive Touch Interface:</strong> Clean, modern UI
                optimized for mobile devices
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Zero Ads & Tracking:</strong> Completely ad-free with no
                user analytics or data collection
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Advanced Control System:</strong>
                <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                  <li>
                    Control multiple computers simultaneously from one device
                  </li>
                  <li>
                    Specialized modes for mouse, keyboard, and media control
                  </li>
                  <li>Customizable gesture controls and shortcuts</li>
                </ul>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Professional-Grade Features:</strong>
                <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                  <li>
                    <strong>Wireless Mouse Control:</strong> Smooth cursor
                    movement with multi-touch gestures, scrolling, and all click
                    actions
                  </li>
                  <li>
                    <strong>Full Keyboard Support:</strong> Complete text input
                    with 15+ keyboard shortcuts (Copy, Paste, Cut, Undo, etc.)
                  </li>
                  <li>
                    <strong>Media Remote:</strong> Play/pause, volume control,
                    track navigation for any media player
                  </li>
                  <li>
                    <strong>PIN Authentication:</strong> Secure 4-digit PIN
                    protection for all connections
                  </li>
                  <li>
                    <strong>End-to-End Encryption:</strong> Optional encryption
                    for sensitive environments
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Web-Based Remote Access:</strong> Control your PC
                through any web browser using our React-powered interface
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Multi-Device Management:</strong> Save and switch
                between multiple PCs with one tap
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Network Intelligence:</strong>
                <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                  <li>Automatic device discovery on local network</li>
                  <li>QR code pairing for instant connection setup</li>
                  <li>Connection history and favorites</li>
                </ul>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Smart Connectivity:</strong> Automatic local network
                discovery with UPnP/NAT-PMP port forwarding
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Cross-Platform Compatibility:</strong> Works seamlessly
                on Windows 10/11, macOS, Linux, Android 8+, and iOS 12+
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>System Tray Integration:</strong> Desktop app runs
                quietly in background with auto-start on boot
              </li>
              <li>
                <strong>Open Source & Extensible:</strong> MIT licensed source
                code available for customization and community contributions
              </li>
            </ul>
          </section>

          {/* Download */}
          <section id="download" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              Download Free Remote Control Software
            </h2>
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Desktop Applications (Server)
              </h3>
              <ul style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/Omni Control-HQ/omni-control/releases/latest">
                    <strong>Windows Remote Control:</strong> Setup Installer &
                    Portable EXE (~76 MB) - Compatible with Windows 10/11
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/Omni Control-HQ/omni-control/releases/latest">
                    <strong>macOS Remote Control:</strong> DMG for Apple Silicon
                    & Intel (~85 MB) - macOS 11 Big Sur and later
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/Omni Control-HQ/omni-control/releases/latest">
                    <strong>Linux Remote Control:</strong> AppImage & DEB
                    Package (~90 MB) - Ubuntu, Debian, Fedora, Arch
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Mobile Applications (Client)
              </h3>
              <ul style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/Omni Control-HQ/omni-control/releases/latest">
                    <strong>Android Remote Control App:</strong> APK Download
                    (~50 MB) - Android 8.0 Oreo and above
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Omni Control-HQ/omni-control">
                    <strong>iOS Remote Control App:</strong> Build from source
                    (TestFlight beta coming soon) - iOS 12+
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* How to Use */}
          <section id="setup">
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              How to Setup Remote PC Control
            </h2>
            <ol style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}>
                Download and install the desktop application on your computer
              </li>
              <li style={{ marginBottom: "8px" }}>
                Download and install the mobile app on your smartphone or tablet
              </li>
              <li style={{ marginBottom: "8px" }}>
                Ensure both devices are connected to the same WiFi network
              </li>
              <li style={{ marginBottom: "8px" }}>
                Open the desktop app and note the PIN displayed on screen
              </li>
              <li style={{ marginBottom: "8px" }}>
                Open the mobile app and scan the QR code or enter the IP address
                manually
              </li>
              <li>Start controlling your PC wirelessly!</li>
            </ol>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#fff",
          fontSize: "12px",
        }}
      >
        <p style={{ marginBottom: "5px" }}>
          © 2026 Omni Control - Free Open Source Remote PC Control Software
        </p>
        <p>
          <a
            href="https://github.com/Omni Control-HQ/omni-control"
            style={{ color: "#fff" }}
          >
            GitHub
          </a>{" "}
          |
          <a href="#setup" style={{ color: "#fff", marginLeft: "10px" }}>
            Documentation
          </a>{" "}
          |
          <a href="#" style={{ color: "#fff", marginLeft: "10px" }}>
            Privacy Policy
          </a>{" "}
          |
          <a
            href="https://github.com/Omni Control-HQ/omni-control/blob/main/LICENSE"
            style={{ color: "#fff", marginLeft: "10px" }}
          >
            MIT License
          </a>
        </p>
        <p style={{ marginTop: "10px", fontSize: "11px", opacity: 0.8 }}>
          Keywords: remote desktop control, wireless mouse, remote keyboard, PC
          control app, free remote control software, open source remote desktop,
          WiFi PC control, smartphone remote control, wireless PC remote,
          cross-platform remote control
        </p>
      </footer>
    </div>
  );
}
