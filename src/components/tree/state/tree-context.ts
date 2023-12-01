import React from "react";
import { TreeNode } from "@/interface";

export interface TreeContextState {
  dispatch: any | null;
  state: TreeNode[] | null;
  isImparative: boolean | null;
  onNodeClick: (node: TreeNode) => void;
}

const defaultValue = {
  dispatch: null,
  state: null,
  isImparative: null,
  onNodeClick: () => {},
};

const TreeContext = React.createContext<TreeContextState>(
  defaultValue as TreeContextState
);

const useTreeContext = () => React.useContext(TreeContext);

export { TreeContext, useTreeContext };
