import React, { createContext, useContext, useCallback } from "react";
import { useControllableValue } from "ahooks";
import { cloneDeep } from "lodash-es";
import { v4 } from "uuid";

import { TreeNode } from "@/interface";

export interface ITreeState {
  state: TreeNode[];
  onNameEdit: (node: TreeNode, name: string) => void;
  onAdd: (node: TreeNode, name: string, type: TreeNode["type"]) => void;
  onDelete: (node: TreeNode) => void;
}

const TreeContext = createContext<ITreeState>({} as ITreeState);

export const useTreeContext = () => useContext(TreeContext);

export interface ITreeProviderProps {
  value: TreeNode[];
  onChange: (value: TreeNode[]) => void;
}

const TreeProvider = (props: React.PropsWithChildren<ITreeProviderProps>) => {
  const { children } = props;

  const [state, setState] = useControllableValue<TreeNode[]>(props);

  const onNameEdit = useCallback<ITreeState["onNameEdit"]>(
    (node, name) => {
      node.name = name;
      setState((state) => cloneDeep(state));
    },
    [setState]
  );

  const onAdd = useCallback<ITreeState["onAdd"]>(
    (node, name, type) => {
      if (node.type === "folder") {
        node.files = node.files ?? [];
        node.files.push({ id: v4(), name, type, parentNode: node });
        setState((state) => cloneDeep(state));
      }
    },
    [setState]
  );

  const onDelete = useCallback<ITreeState["onDelete"]>(
    (node) => {
      if (node?.parentNode?.files) {
        node.parentNode.files = node.parentNode.files.filter(
          (file) => file.id !== node.id
        );
        setState((state) => cloneDeep(state));
      } else {
        setState((state) => state.filter((file) => file.id !== node.id));
      }
    },
    [setState]
  );

  return (
    <TreeContext.Provider value={{ state, onNameEdit, onAdd, onDelete }}>
      {children}
    </TreeContext.Provider>
  );
};

export const TreeProviderHOC = (componet: React.FC) => {
  return (props: ITreeProviderProps) => {
    return (
      <TreeProvider {...props}>{React.createElement(componet)}</TreeProvider>
    );
  };
};
