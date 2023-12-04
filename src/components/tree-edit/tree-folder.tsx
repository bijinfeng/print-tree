import React from "react";
import { TreeNode } from "@/interface";

interface ITreeFolder {
  data: TreeNode;
}

export const TreeFolder = (props: React.PropsWithChildren<ITreeFolder>) => {
  const { children, data } = props;

  return (
    <div className=" flex items-center">
      <span>{data.name}</span>
      {children}
    </div>
  );
};
