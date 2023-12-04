import React from "react";
import { useLocalStorageState } from "ahooks";

import TreeEdit from "./components/tree-edit";
import PrintContent from "./components/print-content";
import { TreeNode } from "./interface";

const DEFAULT_TREE_DATA: TreeNode[] = [
  {
    type: "folder",
    name: "client",
    files: [
      {
        type: "folder",
        name: "ui",
        files: [
          { type: "file", name: "Toggle.js" },
          { type: "file", name: "Button.js" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      {
        type: "folder",
        name: "components",
        files: [
          { type: "file", name: "Tree.js" },
          { type: "file", name: "Tree.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "setupTests.js" },
    ],
  },
  {
    type: "folder",
    name: "packages",
    files: [
      {
        type: "file",
        name: "main.js",
      },
    ],
  },
  { type: "file", name: "index.js" },
];

const App: React.FC = () => {
  const [treeData, setTreeData] = useLocalStorageState<TreeNode[]>(
    "tree-data",
    {
      defaultValue: DEFAULT_TREE_DATA,
    }
  );

  if (!treeData) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 border-b">
        <div className="container flex h-14 items-center">
          <span>print tree</span>
        </div>
      </header>
      <div className="flex-1">
        <div className="container flex py-6 gap-8">
          <div className=" flex-[2_2_0%]">
            <TreeEdit value={treeData} onChange={setTreeData} />
          </div>
          <div className=" flex-[3_3_0%]">
            <PrintContent data={treeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
