# 🚀 Quick Release Guide

## Create a New Release

```bash
# 1. Update version in desktop-app/package.json
# Change: "version": "1.0.1"

# 2. Commit
git add .
git commit -m "chore: release v1.0.1"

# 3. Create tag
git tag v1.0.1

# 4. Push
git push origin main
git push origin v1.0.1

# Done! GitHub Actions will automatically build and publish
```

## What Happens Automatically

When you push a tag starting with `v*.*.*`:

1. ✅ Builds on 3 platforms (Windows, macOS, Linux)
2. ✅ Creates NSIS installer for Windows
3. ✅ Creates Portable .exe for Windows
4. ✅ Creates DMG for macOS
5. ✅ Creates AppImage and DEB for Linux
6. ✅ Creates GitHub Release with all files
7. ✅ Auto-generates release notes

## Check Build Status

Go to: `https://github.com/OmniControl-HQ/omni-control/actions`

## Download Releases

Go to: `https://github.com/OmniControl-HQ/omni-control/releases`

## Version Format

- Must follow: `v{major}.{minor}.{patch}`
- Examples: `v1.0.0`, `v1.2.5`, `v2.0.0`

## Tips

- Test locally before tagging: `pnpm run build:win`
- Check Actions tab if build fails
- Delete and recreate tag if needed: `git tag -d v1.0.1` then `git push --delete origin v1.0.1`
