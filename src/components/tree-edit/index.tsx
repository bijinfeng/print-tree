import React from "react";
import { TreeProviderHOC, useTreeContext } from "./context";
import { TreeFile } from "./tree-file";
import { TreeFolder } from "./tree-folder";
import { InsideTreeNode } from "@/interface";

const TreeEdit: React.FC = () => {
  const { state } = useTreeContext();

  return (
    <div>
      <TreeGroup data={state} />
    </div>
  );
};

interface ITreeGroupProps {
  data: InsideTreeNode[];
}
const TreeGroup = ({ data }: ITreeGroupProps) => {
  return (
    <>
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
    </>
  );
};

export default TreeProviderHOC(TreeEdit);
