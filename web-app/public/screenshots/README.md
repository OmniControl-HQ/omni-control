# Screenshots

## Required Images

Place your screenshots in this folder with the following names:

### 1. `desktop-dashboard.png`
- **Recommended Size:** 1920x1080 or 1280x720
- **Format:** PNG with transparency or JPG
- **Content:** Desktop app dashboard showing:
  - System monitoring (CPU, RAM, Uptime)
  - Connected devices
  - IP address in top bar
  - Navigation sidebar
  - Glassmorphism UI

### 2. `mobile-control.png`
- **Recommended Size:** 1080x2340 (9:19.5 aspect ratio) or 1080x1920
- **Format:** PNG with transparency or JPG
- **Content:** Mobile app showing:
  - Touch trackpad interface
  - Mouse control buttons
  - Clean, modern UI
  - Dark theme with glassmorphism

## Screenshot Tips

### Desktop Screenshot
1. Open OmniControl desktop app
2. Navigate to Dashboard/Overview page
3. Make sure there are some connected devices showing
4. Use Windows Snipping Tool or:
   ```powershell
   # PowerShell screenshot
   Add-Type -AssemblyName System.Windows.Forms
   [System.Windows.Forms.SendKeys]::SendWait('%{PRTSC}')
   ```

### Mobile Screenshot
1. Open mobile app in emulator or device
2. Navigate to Mouse control page
3. Take screenshot:
   - **Android:** Power + Volume Down
   - **iOS Simulator:** Cmd + S
   - **Expo:** Shake device → "Take Screenshot"

### Editing
- Remove any sensitive information (real IPs, PINs)
- Crop to focus on main UI
- Ensure good lighting/contrast
- Add subtle shadow for depth (optional)

## Alternative: Use Placeholders

If you don't have screenshots yet, use these placeholder services:

```markdown
<!-- Desktop placeholder -->
<img src="https://via.placeholder.com/1280x720/1a1c1d/2e5bff?text=Desktop+Dashboard" alt="Desktop Dashboard" width="100%"/>

<!-- Mobile placeholder -->
<img src="https://via.placeholder.com/1080x2340/1a1c1d/2e5bff?text=Mobile+Control" alt="Mobile App" width="60%"/>
```

Or use Figma mockups:
- https://www.figma.com/community/file/mockups
- Export as PNG at 2x resolution

## Current Status

- [ ] `desktop-dashboard.png` - Not added yet
- [ ] `mobile-control.png` - Not added yet

Once you add the images, the main README.md will automatically display them!
