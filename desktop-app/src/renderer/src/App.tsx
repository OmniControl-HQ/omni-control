import TitleBar from "./components/core/TitleBar";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConnectedDevicesPage } from "./components/pages/ConnectedDevices";
import { LogsPage } from "./components/pages/Logs";
import { SecurityPage } from "./components/pages/Security";
import { SettingsPage } from "./components/pages/Settings";
import { DashboardLayout, OverviewPage } from "./components/pages/Dashboard";

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <TitleBar />
      <div className="flex-1 overflow-hidden">
        <HashRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="devices" element={<ConnectedDevicesPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="logs" element={<LogsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}
