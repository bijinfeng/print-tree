import React from "react";
import { TreeProviderHOC, useTreeContext } from "./context";
import { TreeFile } from "./tree-file";
import { TreeFolder } from "./tree-folder";
import { TreeNode } from "@/interface";

const TreeEdit: React.FC = () => {
  const { state } = useTreeContext();

  return <TreeGroup data={state} />;
};

interface ITreeGroupProps {
  data: TreeNode[];
}
const TreeGroup = ({ data }: ITreeGroupProps) => {
  return (
    <div className=" space-y-1">
      {data.map((item) => {
        if (item.type === "file") {
          return <TreeFile key={item.id} data={item} />;
        }

        if (item.type === "folder") {
          return (
            <TreeFolder key={item.id} data={item}>
              {item.files && <TreeGroup data={item.files} />}
            </TreeFolder>
          );
        }

        return null;
      })}
    </div>
  );
};

export default TreeProviderHOC(TreeEdit);
