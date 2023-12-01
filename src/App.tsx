import React from "react";
import { Pane } from "./components/pane";

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 border-b">
        <div className="container flex h-14 items-center">
          <span>print tree</span>
        </div>
      </header>
      <div className="flex-1">
        <div className="container flex py-6">
          <div className=" flex-[2_2_0%]">
            <Pane />
          </div>
          <div className=" flex-[3_3_0%]">xxxx</div>
        </div>
      </div>
    </div>
  );
};

export default App;
