<div align="center">

# Omni Control

**Turn your smartphone into a wireless trackpad, keyboard, and media controller for your PC.**

[![Release](https://img.shields.io/github/v/release/OmniControl-HQ/omni-control?style=flat-square&color=blue)](https://github.com/OmniControl-HQ/omni-control/releases/latest)
[![Build Status](https://img.shields.io/github/actions/workflow/status/OmniControl-HQ/omni-control/release.yml?style=flat-square)](https://github.com/OmniControl-HQ/omni-control/actions)
[![License](https://img.shields.io/github/license/OmniControl-HQ/omni-control?style=flat-square)](LICENSE)

[Downloads](#-downloads) • [Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 📸 Overview

<div align="center">
  <img src=".github/screenshots/desktop-dashboard.png" alt="Desktop Dashboard" width="60%" />
  <img src=".github/screenshots/mobile-control.png" alt="Mobile App" width="30%" />
</div>

---

## ✨ Features

* **Trackpad & Mouse:** Smooth cursor navigation, multi-touch gestures, custom sensitivity, and click controls.
* **Full Keyboard:** Multiline text input, function keys, and system shortcuts support.
* **Media Remote:** Universal media keys for volume control, play/pause, and track navigation.
* **System Monitoring:** Real-time monitoring of CPU usage, RAM utilization, and connected devices.
* **Secure Connection:** Fast Socket.io communication protected by 4-digit PIN authentication.
* **Background Service:** Lightweight system tray app with auto-start support across Windows, macOS, and Linux.

---

## 📥 Downloads

### Desktop Server

| Platform | Package | Link |
| :--- | :--- | :--- |
| **Windows** | Setup Installer / Portable | [Download (.exe)](https://github.com/OmniControl-HQ/omni-control/releases/latest) |
| **macOS** | DMG (Apple Silicon & Intel) | [Download (.dmg)](https://github.com/OmniControl-HQ/omni-control/releases/latest) |
| **Linux** | AppImage / DEB | [Download](https://github.com/OmniControl-HQ/omni-control/releases/latest) |

### Mobile App

| Platform | Download | Note |
| :--- | :--- | :--- |
| **Android** | [Download APK](https://github.com/OmniControl-HQ/omni-control/releases/latest) | Enable *Install from Unknown Sources* |
| **iOS** | *Coming Soon* | Build locally with Expo |

---

## ⚡ Quick Start

1. **Launch Server:** Open **Omni Control** on your desktop.
2. **Get Auth Credentials:** Note the **IP Address** and **PIN** from the dashboard.
3. **Connect Mobile:** Open the mobile app, enter the IP & PIN, and tap **Connect**.

---

## 🛠️ Tech Stack

* **Desktop App:** Electron, Fastify, React, TypeScript, RobotJS
* **Mobile App:** React Native, Expo, Socket.io Client
* **Monorepo & Tooling:** pnpm workspaces, GitHub Actions

---

## 💻 Local Development

```bash
# Clone the repository
git clone [https://github.com/OmniControl-HQ/omni-control.git](https://github.com/OmniControl-HQ/omni-control.git)
cd omni-control

# Install dependencies
pnpm install

# Start Desktop Server in dev mode
pnpm desktop:dev

# Start Mobile App
pnpm mobile:start