import { useMemo } from "react";

import { printTree } from "@/lib/print-tree";
import { TreeNode } from "@/interface";

interface PrintContentProps {
  data: TreeNode[];
}

const PrintContent = (props: PrintContentProps) => {
  const printText = useMemo(() => {
    return props.data
      .map((it) =>
        printTree(
          it,
          (node) => node.name,
          (node) => node.files
        )
      )
      .join("\n");
  }, [props.data]);

  return <div className="whitespace-pre-line">{printText}</div>;
};

export default PrintContent;
