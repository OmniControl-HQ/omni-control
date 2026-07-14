# OmniControl (TypeScript Monorepo)

OmniControl is a monorepo boilerplate implemented fully in TypeScript.

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
