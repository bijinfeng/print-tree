export interface TreeNode {
  type: "folder" | "file";
  name: string;
  files?: TreeNode[];
  id?: string;
  parentNode?: TreeNode;
}

export type InsideTreeNode = Required<Pick<TreeNode, "id">> &
  Omit<TreeNode, "id" | "files"> & { files?: InsideTreeNode[] };
