import TitleBar from "./TitleBar";
import { OverviewScreen } from "./Dashboard";

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <TitleBar />
      <div className="flex-1 overflow-hidden">
        <OverviewScreen />
      </div>
    </div>
  );
}
