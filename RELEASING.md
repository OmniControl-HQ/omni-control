# 🚀 Release Guide

This document explains how to create releases for OmniControl, including both desktop and mobile apps.

## Overview

OmniControl uses GitHub Actions to automatically build and release both desktop and mobile applications when you push a version tag. A single tag push creates:

- **Desktop Apps:** Windows (Setup + Portable), macOS (DMG + ZIP), Linux (AppImage + DEB)
- **Mobile Apps:** Android APK, iOS IPA

## Prerequisites

### For Desktop Builds

✅ No additional setup required - GitHub Actions has everything built-in.

### For Mobile Builds

You need to set up Expo Application Services (EAS):

#### 1. Create Expo Account

```bash
# Visit https://expo.dev/signup
# Create a free account
```

#### 2. Generate Expo Access Token

1. Go to [https://expo.dev/accounts/[username]/settings/access-tokens](https://expo.dev/accounts)
2. Click "Create Token"
3. Name it "GitHub Actions" or similar
4. Select "Read and write" permissions
5. Copy the generated token

#### 3. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `EXPO_TOKEN`
5. Value: Paste your Expo access token
6. Click **"Add secret"**

#### 4. Configure EAS Project

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure project (from project root)
cd mobile-app
eas build:configure
```

This will:
- Create/update `eas.json` (already exists)
- Generate an EAS Project ID
- Link your local project to Expo

#### 5. Update Project ID

After running `eas build:configure`, copy the project ID shown in the terminal and update it in `mobile-app/app.json`:

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-actual-project-id-here"
      }
    }
  }
}
```

Commit this change:

```bash
git add mobile-app/app.json
git commit -m "chore: update EAS project ID"
git push origin main
```

---

## Release Process

### Step 1: Update Versions

Update version numbers in multiple files:

#### Desktop App Version

```bash
cd desktop-app
```

Edit `package.json`:
```json
{
  "name": "omnicontrol-desktop",
  "version": "1.0.1",  // ← Update this
  "description": "OmniControl Desktop Server"
}
```

#### Mobile App Version

```bash
cd mobile-app
```

Edit `package.json`:
```json
{
  "name": "omnicontrol-mobile",
  "version": "1.0.1",  // ← Update this
  "main": "expo-router/entry"
}
```

Edit `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",  // ← Update this
    "ios": {
      "buildNumber": "2"  // ← Increment this (was "1")
    },
    "android": {
      "versionCode": 2  // ← Increment this (was 1)
    }
  }
}
```

**Important:**
- `version`: Semantic version (e.g., "1.0.1")
- `versionCode` (Android): Integer that must increase with each release
- `buildNumber` (iOS): String that must increase with each release

### Step 2: Commit Changes

```bash
# From project root
git add .
git commit -m "chore: release v1.0.1"
git push origin main
```

### Step 3: Create and Push Tag

```bash
# Create annotated tag
git tag -a v1.0.1 -m "Release v1.0.1"

# Push tag to GitHub
git push origin v1.0.1
```

**Note:** The tag must start with `v` and follow semantic versioning (e.g., `v1.0.1`, `v2.3.0`).

### Step 4: Monitor Build

1. Go to your GitHub repository
2. Click **Actions** tab
3. You'll see "Build and Release" workflow running
4. Click on it to see real-time logs

The workflow will:
- ✅ Build desktop apps in parallel (3 runners: Windows, macOS, Linux)
- ✅ Build mobile apps in parallel (2 EAS builds: Android, iOS)
- ✅ Wait for EAS builds to complete (up to 30 minutes)
- ✅ Download APK and IPA from EAS
- ✅ Upload everything to GitHub Release
- ✅ Generate release notes

### Step 5: Verify Release

Once complete (typically 15-30 minutes):

1. Go to **Releases** in your GitHub repository
2. Your new release (e.g., `v1.0.1`) should be published
3. Verify all files are present:
   - ✅ `OmniControl-1.0.1-x64-Setup.exe` (Windows Setup)
   - ✅ `OmniControl-1.0.1-x64-Portable.exe` (Windows Portable)
   - ✅ `OmniControl-1.0.1-arm64.dmg` (macOS Apple Silicon)
   - ✅ `OmniControl-1.0.1-x64.dmg` (macOS Intel)
   - ✅ `OmniControl-1.0.1.AppImage` (Linux)
   - ✅ `OmniControl-1.0.1-amd64.deb` (Linux Debian/Ubuntu)
   - ✅ `OmniControl-v1.0.1-android.apk` (Android)
   - ✅ `OmniControl-v1.0.1-ios.ipa` (iOS)

---

## Release Checklist

Before creating a release, ensure:

- [ ] All features are tested and working
- [ ] No critical bugs remain
- [ ] Desktop app version updated in `desktop-app/package.json`
- [ ] Mobile app version updated in `mobile-app/package.json`
- [ ] Mobile app version updated in `mobile-app/app.json`
- [ ] iOS `buildNumber` incremented
- [ ] Android `versionCode` incremented
- [ ] CHANGELOG.md updated (if exists)
- [ ] README.md reflects latest features
- [ ] All changes committed and pushed
- [ ] EAS project ID is correct in `app.json`
- [ ] `EXPO_TOKEN` secret is set in GitHub

---

## Troubleshooting

### Desktop Build Fails

**Common issues:**

1. **Missing icon files:**
   - Ensure `desktop-app/build/icon.png` exists
   - electron-builder will auto-convert to `.ico` and `.icns`

2. **Native module rebuild fails:**
   - Check `package.json` → `build` → `asarUnpack` includes robotjs
   - Verify `npmRebuild: false` is set for robotjs

3. **Code signing (macOS):**
   - If you don't have Apple Developer account, builds will work but won't be signed
   - Users will see "unverified developer" warning (they can still run it)

### Mobile Build Fails

**Common issues:**

1. **`EXPO_TOKEN` not found:**
   ```
   Error: EXPO_TOKEN is not set
   ```
   - Add `EXPO_TOKEN` to GitHub Secrets (see Prerequisites)

2. **Invalid project ID:**
   ```
   Error: Project not found
   ```
   - Run `eas build:configure` locally
   - Update `projectId` in `app.json`
   - Commit and push changes

3. **Build timeout:**
   ```
   Build timed out after 1800 seconds
   ```
   - EAS builds can take 20-30 minutes
   - Current timeout is 30 minutes (can be increased in workflow)
   - Check build status at [expo.dev](https://expo.dev)

4. **iOS build requires Apple Developer account:**
   - Free Expo account can build iOS, but may need Apple Developer Program for distribution
   - For internal testing, IPA file can be installed via TestFlight or sideloading tools

### Workflow Debugging

**View detailed logs:**

1. Go to GitHub Actions → Your workflow run
2. Click on failed job (e.g., "Build Mobile (android)")
3. Expand step that failed
4. Look for error messages

**Common workflow issues:**

- **pnpm install fails:** Delete `pnpm-lock.yaml` and regenerate
- **Node version mismatch:** Ensure all packages support Node 20
- **EAS CLI errors:** Update `eas-version: latest` in workflow

---

## Manual Builds

If you need to build manually without GitHub Actions:

### Desktop (Local)

```bash
cd desktop-app

# Development build
pnpm run build

# Production installers
pnpm run build:win     # Windows
pnpm run build:mac     # macOS
pnpm run build:linux   # Linux
```

Output in `desktop-app/dist/`

### Mobile (EAS)

```bash
cd mobile-app

# Android APK
pnpm run build:android

# iOS IPA
pnpm run build:ios

# Both platforms
pnpm run build:all
```

Monitor builds at [expo.dev/accounts/[username]/projects](https://expo.dev/accounts)

Download completed builds:
```bash
eas build:list
eas build:download --id <build-id>
```

---

## Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **Major (X.0.0):** Breaking changes, major new features
- **Minor (1.X.0):** New features, backward-compatible
- **Patch (1.0.X):** Bug fixes, minor improvements

**Mobile version codes:**
- **Android `versionCode`:** Must be integer, always increment
  - Example: 1 → 2 → 3 → 4...
- **iOS `buildNumber`:** Must be string, can be any format
  - Example: "1" → "2" → "3" → "4"...
  - Alternative: "1.0.1.1" → "1.0.1.2"

**Tag format:** Always `vX.Y.Z` (e.g., `v1.0.0`, `v2.1.3`)

---

## Release Notes Template

When creating releases, use this template for description:

```markdown
## 🎉 What's New in v1.0.1

### ✨ Features
- Added feature X
- Improved feature Y

### 🐛 Bug Fixes
- Fixed issue with Z
- Resolved crash when...

### 📱 Mobile
- Android: [Download APK](link)
- iOS: [Download IPA](link)

### 💻 Desktop
- Windows: Setup installer & Portable exe
- macOS: DMG for Apple Silicon & Intel
- Linux: AppImage & DEB package

### 📦 Installation

**Desktop:**
- Windows: Run the Setup installer
- macOS: Open DMG and drag to Applications
- Linux: Make AppImage executable or install DEB

**Mobile:**
- Android: Enable "Unknown Sources" and install APK
- iOS: Install via AltStore or TestFlight

---

**Full Changelog:** https://github.com/OmniControl-HQ/omni-control/compare/v1.0.0...v1.0.1
```

---

## Resources

- [Electron Builder Docs](https://www.electron.build/)
- [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)

---

**Questions?** Open an issue in the repository.
