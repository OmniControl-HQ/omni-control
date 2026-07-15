export {};
declare global {
  interface Window {
    electron: {
      platform: string;
      window: {
        minimize: () => void;
        toggleMaximize: () => void;
        close: () => void;
      };
    };
  }
}
