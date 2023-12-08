export interface TreeNode {
  id: string;
  type: "folder" | "file";
  name: string;
  files?: TreeNode[];
  parentNode?: TreeNode;
}
