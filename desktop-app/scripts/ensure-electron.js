/**
 * ensure-electron.js
 * Runs after `pnpm install` to guarantee the Electron binary is extracted.
 * Uses PowerShell Expand-Archive as a reliable fallback on Windows.
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const os = require('os');

if (os.platform() !== 'win32') process.exit(0);

const electronDir = path.dirname(require.resolve('electron/package.json'));
const distDir = path.join(electronDir, 'dist');
const exePath = path.join(distDir, 'electron.exe');
const pathTxtPath = path.join(electronDir, 'path.txt');

if (fs.existsSync(exePath)) {
  console.log('[ensure-electron] electron.exe already present. Skipping.');
  process.exit(0);
}

console.log('[ensure-electron] electron.exe not found. Attempting extraction...');

const { version } = require(path.join(electronDir, 'package.json'));
const cacheRoot = process.env.electron_config_cache ||
  path.join(os.homedir(), 'AppData', 'Local', 'electron', 'Cache');

let zipPath = null;

if (fs.existsSync(cacheRoot)) {
  for (const subdir of fs.readdirSync(cacheRoot)) {
    const candidate = path.join(cacheRoot, subdir, `electron-v${version}-win32-x64.zip`);
    if (fs.existsSync(candidate)) { zipPath = candidate; break; }
    const direct = path.join(cacheRoot, `electron-v${version}-win32-x64.zip`);
    if (fs.existsSync(direct)) { zipPath = direct; break; }
  }
}

if (!zipPath) {
  console.log('[ensure-electron] No cached zip found. Running electron install.js...');
  try {
    execSync(`node "${path.join(electronDir, 'install.js')}"`, { stdio: 'inherit' });
  } catch {
    console.error('[ensure-electron] install.js also failed. Please run pnpm install manually.');
    process.exit(1);
  }
  process.exit(0);
}

console.log(`[ensure-electron] Found zip at: ${zipPath}`);
console.log(`[ensure-electron] Extracting to: ${distDir}`);

try {
  execSync(
    `powershell -NoProfile -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${distDir}' -Force"`,
    { stdio: 'inherit' }
  );
  // Write path.txt without CRLF
  fs.writeFileSync(pathTxtPath, 'electron.exe', { encoding: 'utf8', flag: 'w' });
  console.log('[ensure-electron] Electron extracted successfully.');
} catch (err) {
  console.error('[ensure-electron] Extraction failed:', err.message);
  process.exit(1);
}
