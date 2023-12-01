/* eslint-disable @typescript-eslint/prefer-optional-chain */

import { cloneDeep } from "lodash-es";

import { FILE, FOLDER } from "./constants";
import { searchDFS, createFile, createFolder } from "@/lib/utils";
import { TreeNode } from "@/interface";

type Action =
  | {
      type: "SET_DATA";
      payload: TreeNode[];
    }
  | {
      type: keyof typeof FILE;
      payload: TreeNode;
    };
type State = TreeNode[];

export const reducer = (state: State, action: Action): State => {
  let newState = cloneDeep(state);
  let node = null;
  let parent = null;
  // @ts-ignore
  if (action.payload && action.payload.id) {
    // @ts-ignore
    let foundNode = searchDFS({
      data: newState,
      // @ts-ignore
      cond: (item) => item.id === action.payload.id,
    });
    node = foundNode.item;
    // @ts-ignore
    parent = node.parentNode;
  }

  switch (action.type) {
    case "SET_DATA":
      return action.payload;

    case FILE.CREATE:
      // @ts-ignore
      node.files.push(createFile({ name: action.payload.name }));
      return newState;

    case FOLDER.CREATE:
      // @ts-ignore
      node.files.push(createFolder({ name: action.payload.name }));
      return newState;

    case FOLDER.EDIT:
    case FILE.EDIT:
      // @ts-ignore
      node.name = action.payload.name;
      return newState;

    case FOLDER.DELETE:
    case FILE.DELETE:
      if (!parent || Array.isArray(parent)) {
        // @ts-ignore
        newState = newState.filter((file) => file.id !== action.payload.id);
        return newState;
      } else {
        parent.files = parent.files.filter(
          // @ts-ignore
          (file) => file.id !== action.payload.id
        );
      }
      return newState;

    default:
      return state;
  }
};
