# Logo Guidelines

## Current Logo

The main logo is located at `.github/logo.png`

**Current Source:** Copied from `desktop-app/src/main/assets/icon.png`

## Logo Specifications

### Main Logo (`logo.png`)
- **Size:** 512x512px (recommended)
- **Format:** PNG with transparency
- **Background:** Transparent
- **Usage:** 
  - GitHub README header
  - Documentation
  - Social media

### Display Sizes
- **README Header:** 120x120px
- **Social Cards:** 1200x630px
- **Favicon:** 32x32px, 16x16px

## Customization

If you want to replace the logo:

1. **Create or design your logo**
   - Use tools like Figma, Canva, or Adobe Illustrator
   - Keep it simple and recognizable
   - Use the brand colors (blue/purple theme)

2. **Export specifications**
   ```
   Format: PNG
   Size: 512x512px minimum
   Background: Transparent
   Color mode: RGB
   ```

3. **Replace the file**
   ```bash
   # Save your new logo as:
   .github/logo.png
   
   # Optionally update app icon too:
   desktop-app/src/main/assets/icon.png
   desktop-app/build/icon.png
   ```

## Alternative Options

### Use Icon Library
```bash
# Install icon generator
npm install -g icon-gen

# Generate from SVG
icon-gen -i logo.svg -o .github --type png --modes ico,icns
```

### Use Online Tools
- **Remove.bg** - Remove background
- **Squoosh** - Optimize PNG
- **Figma** - Design from scratch
- **Canva** - Use templates

## Brand Colors

Based on current design:
- **Primary Blue:** `#2E5BFF` (rgb(46, 91, 255))
- **Primary Purple:** `#A78BFA` (rgb(167, 139, 250))
- **Background Dark:** `#0A0A0A`
- **Surface:** `#1E2021`

## Current Logo Features

The current icon shows:
- Circular power/control symbol
- Blue to purple gradient
- Modern, tech-focused design
- Works well at small sizes
- Recognizable shape

## Tips

- Keep it simple - complex logos don't scale well
- Test at multiple sizes (16px to 512px)
- Ensure good contrast on both dark and light backgrounds
- Make it memorable and unique
- Consider animated version for app splash screen
