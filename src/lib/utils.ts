import { type ClassValue, clsx } from "clsx";
import type { SetOptional } from "type-fest";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

import { TreeNode } from "@/interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tranformTreeNode = (
  node: SetOptional<TreeNode, "id">,
  parentNode?: TreeNode
): TreeNode => {
  if (!node.id) {
    node.id = v4();
  }

  if (node.type === "folder" && node.files) {
    node.files = node.files.map((it) => tranformTreeNode(it, node as TreeNode));
  }

  return { ...(node as TreeNode), parentNode };
};
