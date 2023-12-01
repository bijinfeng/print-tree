import React, { useReducer, useLayoutEffect } from "react";
import { v4 } from "uuid";

import { TreeContext, reducer } from "./state";
import { Folder } from "./tree-folder";
import { File } from "./tree-file";
import styles from "./style.module.less";

import { useDidMountEffect } from "@/lib/utils";
import { TreeNode } from "@/interface";

interface TreeProps {
  data: TreeNode[];
  children: React.ReactNode;
  onUpdate?: (data: TreeNode[]) => void;
  onNodeClick?: (node: TreeNode) => void;
}

const Tree = ({ children, data, onNodeClick, onUpdate }: TreeProps) => {
  const [state, dispatch] = useReducer(reducer, data);

  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: data });
  }, [data]);

  useDidMountEffect(() => {
    onUpdate?.(state);
  }, [state]);

  const isImparative = data && !children;

  return (
    <TreeContext.Provider
      value={{
        isImparative,
        state,
        dispatch,
        onNodeClick: (node) => onNodeClick?.(node),
      }}
    >
      <div className={styles.tree}>
        {/* @ts-ignore */}
        {isImparative ? <TreeRecusive data={state} /> : children}
      </div>
    </TreeContext.Provider>
  );
};

interface TreeRecusiveProps {
  data: TreeNode[];
  parentNode?: TreeNode;
}

const TreeRecusive = ({ data, parentNode }: TreeRecusiveProps) => {
  return data.map((item) => {
    item.parentNode = parentNode;

    if (!item.id) item.id = v4();

    if (item.type === "file") {
      return <File key={item.id} id={item.id} name={item.name} node={item} />;
    }

    if (item.type === "folder") {
      return (
        // @ts-ignore
        <Folder key={item.id} id={item.id} name={item.name} node={item}>
          {/* @ts-ignore */}
          <TreeRecusive parentNode={item} data={item.files ?? []} />
        </Folder>
      );
    }
  });
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
