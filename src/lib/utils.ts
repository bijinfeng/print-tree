import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

import { TreeNode, InsideTreeNode } from "@/interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tranformTreeNode = (
  node: TreeNode,
  parentNode?: TreeNode
): InsideTreeNode => {
  if (node.type === "folder" && node.files) {
    node.files = node.files.map((it) => tranformTreeNode(it, node));
  }

  if (!node.id) {
    node.id = v4();
  }

  return { ...(node as InsideTreeNode), parentNode };
};
