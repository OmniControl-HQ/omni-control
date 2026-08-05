# OmniControl Desktop - Production Build Guide

## Build Setup Complete ✅

The desktop app is fully configured for production builds with **electron-builder**.

## Available Build Commands

```bash
# Build for Windows (64-bit)
pnpm run build:win

# Build for macOS
pnpm run build:mac

# Build for Linux
pnpm run build:linux

# Build for all platforms
pnpm run build:all
```

## Build Outputs

### Windows
- **NSIS Installer**: `dist/OmniControl-1.0.0-x64-Setup.exe`
- **Portable**: `dist/OmniControl-1.0.0-x64.exe`
- **Unpacked**: `dist/win-unpacked/` (for testing)

### macOS
- **DMG**: `dist/OmniControl-1.0.0-arm64.dmg` / `OmniControl-1.0.0-x64.dmg`
- **ZIP**: `dist/OmniControl-1.0.0-arm64-mac.zip`

### Linux
- **AppImage**: `dist/OmniControl-1.0.0-x64.AppImage`
- **DEB**: `dist/OmniControl-1.0.0-amd64.deb`

## Quick Build (Development Test)

To quickly test without creating installers:

```bash
npx electron-vite build
npx electron-builder --dir
```

This creates an unpacked directory in `dist/win-unpacked/` that you can run immediately.

## Build Configuration

Configuration is in `package.json` under the `"build"` key:

- App ID: `com.omnicontrol.desktop`
- Product Name: OmniControl
- Icon: `build/icon.png` (auto-converted to .ico/.icns)
- Native Module: robotjs (unpacked from asar for proper loading)

## Requirements

### All Platforms
- Node.js 18+ 
- pnpm package manager

### Windows
- Windows 10/11
- No additional requirements (electron-builder handles signing)

### macOS
- macOS 10.13+
- Xcode Command Line Tools (for code signing)

### Linux
- FUSE support for AppImage
- dpkg for building .deb packages

## Icon Generation

The app uses `build/icon.png` as the source. electron-builder automatically converts it to platform-specific formats if needed.

To manually generate platform icons:

```bash
npm install -g electron-icon-builder
electron-icon-builder --input=build/icon.png --output=build
```

## Troubleshooting

### robotjs Build Issues
The config disables npm rebuild (`npmRebuild: false`) to avoid Python dependency issues. robotjs binaries are included pre-built.

### Build Fails on Different Platform
You can only build for your current platform without additional setup. Cross-platform builds require:
- Windows → Linux/Mac: Use CI/CD or VMs
- Mac → Windows: Use wine or CI/CD
- Linux → Mac: Requires macOS SDK

### ASAR Unpacking
robotjs is configured to unpack from ASAR archive for proper native module loading. Check `asarUnpack` in package.json if adding more native modules.

## Publishing

To publish releases, add to `package.json`:

```json
"publish": {
  "provider": "github",
  "owner": "yourusername",
  "repo": "omni-control"
}
```

Then use:
```bash
npx electron-builder --publish always
```

## File Structure

```
desktop-app/
├── build/              # Build assets (icons, etc.)
├── dist/               # Build output (gitignored)
├── out/                # Compiled source (gitignored)
├── src/
│   ├── main/          # Electron main process
│   ├── preload/       # Preload scripts
│   └── renderer/      # React frontend
└── package.json       # Build configuration
```

## Next Steps

1. Update version in `package.json` before building
2. Test the app: `dist/win-unpacked/OmniControl.exe`
3. Create release: `pnpm run build:win`
4. Distribute installer: `dist/OmniControl-1.0.0-x64-Setup.exe`
