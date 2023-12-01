export interface TreeNode {
  type: "folder" | "file";
  name: string;
  files?: TreeNode[];
  id?: string;
  parentNode?: TreeNode;
}
