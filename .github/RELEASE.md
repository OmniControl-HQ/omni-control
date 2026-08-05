# Auto Release Process

This repository is configured to automatically build and publish releases when you create a new version tag.

## How to Create a Release

### 1. Update Version

Update version in `desktop-app/package.json`:
```json
{
  "version": "1.0.1"
}
```

### 2. Commit Changes

```bash
git add .
git commit -m "chore: bump version to 1.0.1"
```

### 3. Create and Push Tag

```bash
# Create tag (must start with 'v')
git tag v1.0.1

# Push commits and tag
git push origin main
git push origin v1.0.1
```

### 4. Automatic Build

GitHub Actions will automatically:
- ✅ Build for Windows (NSIS + Portable)
- ✅ Build for macOS (DMG + ZIP)
- ✅ Build for Linux (AppImage + DEB)
- ✅ Create GitHub Release
- ✅ Upload all installers

## Release Files

Once the workflow completes, the following files will be available:

**Windows:**
- `Omni-Control-{version}-x64-Setup.exe` - NSIS Installer
- `Omni-Control-{version}-x64-Portable.exe` - Portable version

**macOS:**
- `Omni-Control-{version}-arm64.dmg` - Apple Silicon
- `Omni-Control-{version}-x64.dmg` - Intel Mac
- `Omni-Control-{version}-arm64-mac.zip` - ZIP archive

**Linux:**
- `Omni-Control-{version}-x64.AppImage` - Universal Linux
- `Omni-Control-{version}-amd64.deb` - Debian/Ubuntu

## Workflow Status

Check the workflow status:
- Go to **Actions** tab in GitHub
- Find the workflow run for your tag
- Monitor build progress for each platform

## Manual Release (Optional)

If you need to manually publish:

```bash
cd desktop-app

# Build and publish
GH_TOKEN=your_github_token pnpm run build:win
npx electron-builder --win --publish always
```

## Requirements

- Repository must be public or you need to configure `GH_TOKEN`
- GitHub token needs `repo` and `workflow` permissions
- All three OS runners (Windows, macOS, Linux) will be used

## Troubleshooting

### Build Fails
- Check **Actions** tab for error logs
- Verify `package.json` version format (must be semver)
- Ensure tag starts with 'v' (e.g., v1.0.0)

### Release Not Created
- Verify `GH_TOKEN` has correct permissions
- Check `publish` config in `package.json`
- Ensure repository owner/name is correct

### Platform-Specific Issues
- **macOS**: Requires code signing for distribution
- **Windows**: NSIS installer may trigger SmartScreen
- **Linux**: AppImage requires FUSE to run

## Version Numbering

Follow semantic versioning:
- **Major**: Breaking changes (v2.0.0)
- **Minor**: New features (v1.1.0)
- **Patch**: Bug fixes (v1.0.1)
