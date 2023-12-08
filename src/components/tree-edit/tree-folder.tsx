import React from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFile,
} from "react-icons/ai";
import { useSetState } from "ahooks";

import { useTreeContext } from "./context";
import { TreeInput } from "./tree-input";
import { TreeNode } from "@/interface";

interface ITreeFolder {
  data: TreeNode;
}

interface State {
  isAdd: boolean;
  isEditing: boolean;
  isOpen: boolean;
  addType: TreeNode["type"];
}

export const TreeFolder = (props: React.PropsWithChildren<ITreeFolder>) => {
  const { children, data } = props;
  const { onNameEdit, onAdd, onDelete } = useTreeContext();
  const [state, setState] = useSetState<State>({
    isAdd: false,
    addType: "file",
    isEditing: false,
    isOpen: false,
  });

  return (
    <div className=" space-y-1">
      <div
        className="flex items-center cursor-pointer gap-1 relative group"
        onClick={() => setState({ isOpen: !state.isOpen })}
      >
        {state.isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
        <TreeInput
          name={data.name}
          isEditing={state.isEditing}
          onCancel={() => setState({ isEditing: false })}
          onSubmit={(name) => onNameEdit(data, name)}
        />

        {!state.isEditing && (
          <div
            className="absolute right-0 flex items-center gap-1 invisible group-hover:visible"
            onClick={(e) => e.stopPropagation()}
          >
            <AiOutlineEdit onClick={() => setState({ isEditing: true })} />
            <AiOutlineFileAdd
              onClick={() =>
                setState({ isOpen: true, addType: "file", isAdd: true })
              }
            />
            <AiOutlineFolderAdd
              onClick={() =>
                setState({ isOpen: true, addType: "folder", isAdd: true })
              }
            />
            <AiOutlineDelete onClick={() => onDelete(data)} />
          </div>
        )}
      </div>
      {state.isOpen && (
        <div className=" border-l pl-5">
          {children}
          {state.isAdd && (
            <div className="flex items-center gap-1">
              {state.addType === "folder" ? (
                <AiOutlineFolder />
              ) : (
                <AiOutlineFile />
              )}
              <TreeInput
                isEditing
                onCancel={() => setState({ isAdd: false })}
                onSubmit={(name) => onAdd(data, name, state.addType)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
