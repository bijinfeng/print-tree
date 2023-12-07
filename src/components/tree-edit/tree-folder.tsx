import React, { useState } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import { useTreeContext } from "./context";
import { TreeInput } from "./tree-input";
import { InsideTreeNode } from "@/interface";

interface ITreeFolder {
  data: InsideTreeNode;
}

export const TreeFolder = (props: React.PropsWithChildren<ITreeFolder>) => {
  const { children, data } = props;
  const { onNameEdit } = useTreeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleFolderRename = () => {
    setIsEditing(true);
  };
  const handleFileCreation = () => {};
  const handleFolderCreation = () => {};
  const commitDeleteFolder = () => {};

  const handleSubmit = (name: string) => {
    setIsEditing(false);
    onNameEdit(data, name);
  };

  return (
    <div className=" space-y-1">
      <div
        className="flex items-center cursor-pointer gap-1 relative group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
        <TreeInput
          name={data.name}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
        />

        {!isEditing && (
          <div
            className="absolute right-0 flex items-center gap-1 invisible group-hover:visible"
            onClick={(e) => e.stopPropagation()}
          >
            <AiOutlineEdit onClick={handleFolderRename} />
            <AiOutlineFileAdd onClick={handleFileCreation} />
            <AiOutlineFolderAdd onClick={handleFolderCreation} />
            <AiOutlineDelete onClick={commitDeleteFolder} />
          </div>
        )}
      </div>
      {isOpen && <div className=" border-l pl-5">{children}</div>}
    </div>
  );
};
