import React, { createContext, useContext, useEffect, useState } from "react";
import { InsideTreeNode, TreeNode } from "@/interface";
import { tranformTreeNode } from "@/lib/utils";

export interface ITreeState {
  state: InsideTreeNode[];
}

const TreeContext = createContext<ITreeState>({} as ITreeState);

export const useTreeContext = () => useContext(TreeContext);

export interface ITreeProviderProps {
  data?: TreeNode[];
}

const TreeProvider = (props: React.PropsWithChildren<ITreeProviderProps>) => {
  const { children, data } = props;

  const [state, setState] = useState<InsideTreeNode[]>([]);

  useEffect(() => {
    const nextState = (data ?? []).map((it) => tranformTreeNode(it));
    setState(nextState);
  }, [data]);

  return (
    <TreeContext.Provider value={{ state }}>{children}</TreeContext.Provider>
  );
};

interface TreeEditProps {
  value: TreeNode[];
  onChange: (value: TreeNode[]) => void;
}

export const TreeProviderHOC = (componet: React.FC) => {
  return (props: TreeEditProps) => {
    return (
      <TreeProvider data={props.value}>
        {React.createElement(componet)}
      </TreeProvider>
    );
  };
};
