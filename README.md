# OmniControl (TypeScript Monorepo)

[![Build and Release](https://github.com/OmniControl-HQ/omni-control/actions/workflows/release.yml/badge.svg)](https://github.com/OmniControl-HQ/omni-control/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/OmniControl-HQ/omni-control)](https://github.com/OmniControl-HQ/omni-control/releases)
[![License](https://img.shields.io/github/license/OmniControl-HQ/omni-control)](LICENSE)

OmniControl is a remote PC control solution built with TypeScript - control your computer from your mobile device.

## Project Structure

- `desktop-app/`: Electron.js server with Node.js, Socket.io, and TypeScript.
- `mobile-app/`: Expo React Native mobile client connecting to the desktop server, built using TypeScript.

## Getting Started

### Prerequisites
Make sure you have `pnpm` installed globally:
```bash
npm install -g pnpm
```

### Installation
Run the following command at the root to install all dependencies for both desktop and mobile apps:
```bash
pnpm install
```

### Running the Apps

- **Desktop App**:
  ```bash
  pnpm desktop:start
  ```

- **Mobile App**:
  ```bash
  pnpm mobile:start
  ```

## 📦 Releases

Download the latest release for your platform:
- **Windows**: [Download Installer](https://github.com/OmniControl-HQ/omni-control/releases/latest)
- **macOS**: [Download DMG](https://github.com/OmniControl-HQ/omni-control/releases/latest)
- **Linux**: [Download AppImage](https://github.com/OmniControl-HQ/omni-control/releases/latest)

### Creating a Release

See [RELEASING.md](RELEASING.md) for instructions on creating new releases.

```bash
# Quick release
git tag v1.0.1
git push origin v1.0.1
# GitHub Actions will automatically build and publish!
```
