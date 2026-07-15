import { useState, useEffect } from "react";
import TitleBar from "./TitleBar";

export default function App() {
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {}, []);

  return (
    <>
      <main className=" h-screen w-screen bg-red-300">
        <TitleBar />
      </main>
    </>
  );
}
