import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRef, useEffect } from "react";
import { TreeNode } from "@/interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findNodeById = (nodes: TreeNode[], id: string) => {
  let final;

  function findNode(nodes: TreeNode[], id: string) {
    nodes.forEach((n) => {
      if (n.id === id) {
        final = n;
        return;
      }
      if (n.files) findNode(n.files, id);
    });
  }

  findNode(nodes, id);

  return final;
};

export const searchDFS = ({
  data,
  cond,
  childPathKey = "files",
}: {
  data: TreeNode[];
  cond: (item: TreeNode, index: number) => boolean;
  childPathKey: string;
}) => {
  let final = null;
  let parentPath: TreeNode[] = [];
  let parent = null;
  let next = null;
  let prev = null;

  const recursiveFind = (tree: TreeNode[]) => {
    tree.forEach((item, index) => {
      if (cond(item, index)) {
        final = item;

        if (parentPath) {
          parentPath.forEach((p) => {
            // check if parent has the `current item`
            // @ts-ignore
            if (p?.[childPathKey].includes(item)) {
              parent = p;
              // set next & previous indexes
              // @ts-ignore
              next = p[childPathKey][index + 1];
              // @ts-ignore
              prev = p[childPathKey][index - 1];
            } else {
              parent = tree;
              // if parent is null then check the root of the tree
              next = tree[index + 1];
              prev = tree[index - 1];
            }
          });
        }
        return;
      }

      // @ts-ignore
      if (item[childPathKey]) {
        // push parent stack
        parentPath.push(item);
        // @ts-ignore
        recursiveFind(item[childPathKey]);
      }
    });
  };

  recursiveFind(data);

  return {
    parent,
    item: final,
    nextSibling: next,
    previousSibling: prev,
  };
};

export const useDidMountEffect = (
  func: () => void,
  deps?: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const createFile = ({ name }: { name: string }) => ({
  name,
  type: "file",
});
export const createFolder = ({ name }: { name: string }) => ({
  name,
  type: "folder",
  files: [],
});
