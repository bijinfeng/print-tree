import React, { useState } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import { TreeNode } from "@/interface";

interface ITreeFolder {
  data: TreeNode;
}

export const TreeFolder = (props: React.PropsWithChildren<ITreeFolder>) => {
  const { children, data } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleFolderRename = () => {};
  const handleFileCreation = () => {};
  const handleFolderCreation = () => {};
  const commitDeleteFolder = () => {};

  return (
    <div className=" space-y-1">
      <div
        className="flex items-center cursor-pointer gap-1 relative group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
        <span>{data.name}</span>

        <div
          className="absolute right-0 flex items-center gap-1 invisible group-hover:visible"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineEdit onClick={handleFolderRename} />
          <AiOutlineFileAdd onClick={handleFileCreation} />
          <AiOutlineFolderAdd onClick={handleFolderCreation} />
          <AiOutlineDelete onClick={commitDeleteFolder} />
        </div>
      </div>
      {isOpen && <div className=" border-l pl-5">{children}</div>}
    </div>
  );
};
