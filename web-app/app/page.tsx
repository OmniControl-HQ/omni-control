export default function Home() {
  const navItems = [
    { name: "Home", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Download", href: "#download" },
    { name: "Documentation", href: "#setup" },
    { name: "Screenshots", href: "#screenshots" },
    { name: "GitHub", href: "https://github.com/OmniControl-HQ/omni-control" },
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
          Free Open Source Remote PC Control Software - Turn Your Smartphone
          Into a Wireless Trackpad, Keyboard & Media Controller
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
              powerful wireless trackpad, keyboard, and media remote for your
              PC. Control your Windows, macOS, or Linux computer from anywhere
              in your home using your Android or iOS device.
            </p>
            <p style={{ marginBottom: "12px" }}>
              Unlike commercial remote control software that requires
              subscriptions or contains ads, Omni Control is completely free and
              respects your privacy. All communication happens locally on your
              WiFi network through fast Socket.io protocol - no internet
              connection required, no data collection, and no third-party
              servers.
            </p>
            <p>
              Built with modern technologies including Electron, React Native,
              Fastify, and RobotJS, Omni Control offers real-time, low-latency
              control with secure 4-digit PIN authentication to protect your
              connection.
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
                alignItems: "start",
              }}
            >
              <div
                style={{
                  border: "1px solid #999",
                  textAlign: "center",
                }}
              >
                <img
                  src="/screenshots/desktop-dashboard.png"
                  alt="Desktop Dashboard - Omni Control Server"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <p
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  Desktop Server Dashboard
                </p>
              </div>
              <div
                style={{
                  border: "1px solid #999",
                  textAlign: "center",
                }}
              >
                <img
                  src="/screenshots/mobile-control.png"
                  alt="Mobile App - Wireless Trackpad Control"
                  style={{
                    width: "50%",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <p
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  Mobile Control Interface
                </p>
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
              <a href="https://github.com/OmniControl-HQ">
                open-source contributors
              </a>{" "}
              who believe in creating accessible technology for everyone.
              Whether you're watching movies on your couch, giving
              presentations, or working from another room, Omni Control makes
              remote PC control simple and intuitive.
            </p>
            <p style={{ marginBottom: "10px" }}>
              Join thousands of users who have replaced expensive remote control
              solutions with Omni Control. This software is 100% free with no
              ads, no tracking, and no premium features locked behind paywalls.
            </p>
            <p>
              Want to contribute? We welcome developers, translators, and
              testers! Check our{" "}
              <a href="https://github.com/OmniControl-HQ/omni-control">
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
              Remote Control Features
            </h2>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Trackpad & Mouse Control:</strong> Smooth cursor
                navigation with multi-touch gestures, customizable sensitivity,
                and complete click controls (left, right, middle click)
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Full Keyboard Support:</strong> Complete multiline text
                input with function keys and system shortcuts support
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Media Remote:</strong> Universal media keys for volume
                control, play/pause, and track navigation - works with any media
                player
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>System Monitoring:</strong> Real-time monitoring of CPU
                usage, RAM utilization, and connected devices directly from your
                phone
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Secure Connection:</strong> Fast Socket.io communication
                protocol protected by 4-digit PIN authentication
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Background Service:</strong> Lightweight system tray
                application with auto-start support across Windows, macOS, and
                Linux
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Cross-Platform Compatibility:</strong> Desktop server
                runs on Windows, macOS, and Linux. Mobile app available for
                Android (iOS coming soon)
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Zero Configuration:</strong> Simple IP address and PIN
                connection - no complex setup required
              </li>
              <li>
                <strong>Open Source & Free Forever:</strong> MIT licensed source
                code, completely free with no ads, no tracking, and no premium
                features
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
                Desktop Server (Required)
              </h3>
              <ul style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                    <strong>Windows:</strong> Setup Installer & Portable EXE -
                    Compatible with Windows 10/11
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                    <strong>macOS:</strong> DMG for Apple Silicon & Intel Macs -
                    macOS 11 Big Sur and later
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                    <strong>Linux:</strong> AppImage & DEB Package - Ubuntu,
                    Debian, Fedora, Arch Linux
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
                Mobile Client
              </h3>
              <ul style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>
                  <a href="https://github.com/OmniControl-HQ/omni-control/releases/latest">
                    <strong>Android:</strong> APK Download - Android 8.0 Oreo
                    and above (Enable "Install from Unknown Sources")
                  </a>
                </li>
                <li>
                  <strong>iOS:</strong> Coming Soon - Build locally with Expo
                  for now
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
              Quick Start Guide - Setup Remote PC Control in 3 Steps
            </h2>
            <ol style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Launch Server:</strong> Download and open Omni Control
                on your desktop computer
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Get Credentials:</strong> Note the IP Address and
                4-digit PIN displayed on the dashboard
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Connect Mobile:</strong> Download the mobile app, enter
                your PC's IP address and PIN, then tap Connect
              </li>
            </ol>
            <p style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
              <strong>Note:</strong> Both devices must be connected to the same
              WiFi network. Omni Control uses local network communication for
              fast, secure control.
            </p>
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
            href="https://github.com/OmniControl-HQ/omni-control"
            style={{ color: "#fff" }}
          >
            GitHub
          </a>{" "}
          |
          <a href="#setup" style={{ color: "#fff", marginLeft: "10px" }}>
            Documentation
          </a>{" "}
          |
          <a
            href="https://github.com/OmniControl-HQ/omni-control/releases/latest"
            style={{ color: "#fff", marginLeft: "10px" }}
          >
            Download
          </a>{" "}
          |
          <a
            href="https://github.com/OmniControl-HQ/omni-control/blob/main/LICENSE"
            style={{ color: "#fff", marginLeft: "10px" }}
          >
            MIT License
          </a>
        </p>
        <p style={{ marginTop: "10px", fontSize: "11px", opacity: 0.8 }}>
          Keywords: remote desktop control, wireless trackpad, wireless mouse,
          remote keyboard, PC control app, free remote control software, open
          source remote desktop, WiFi PC control, smartphone remote control,
          wireless PC remote, cross-platform remote control, media remote
          control
        </p>
      </footer>
    </div>
  );
}
