import { useMemo } from "react";

import { printTree } from "@/lib/print-tree";
import { TreeNode } from "@/interface";

interface PrintContentProps {
  data: TreeNode[];
}

const PrintContent = (props: PrintContentProps) => {
  const printText = useMemo(() => {
    const root: TreeNode = { type: "folder", name: "head", files: props.data };

    return printTree(
      root,
      (node) => node.name,
      (node) => node.files
    );
  }, [props.data]);

  return <div className="whitespace-pre-line">{printText}</div>;
};

export default PrintContent;
