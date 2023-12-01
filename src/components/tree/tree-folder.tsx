import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import { FILE, FOLDER } from "./state/constants";
import { useTreeContext } from "./state/tree-context";
import { PlaceholderInput } from "./tree-placeholder-input";
import styles from "./style.module.less";
import { TreeNode } from "@/interface";

interface FolderNameProps {
  isOpen: boolean;
  name: React.ReactNode;
  handleClick: () => void;
}

export const FolderName = ({ isOpen, name, handleClick }: FolderNameProps) => (
  <div
    className=" bg-white flex items-center cursor-pointer"
    onClick={handleClick}
  >
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
    &nbsp;&nbsp;{name}
  </div>
);

interface FolderProps {
  id: string;
  name: string;
  node: TreeNode;
  children: any[];
}

export const Folder = ({ id, name, children, node }: FolderProps) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState<any[]>([]);

  useEffect(() => {
    setChilds([children]);
  }, [children]);

  const commitFolderCreation = (name: string) => {
    dispatch({ type: FOLDER.CREATE, payload: { id, name } });
  };
  const commitFileCreation = (name: string) => {
    dispatch({ type: FILE.CREATE, payload: { id, name } });
  };
  const commitDeleteFolder = () => {
    dispatch({ type: FOLDER.DELETE, payload: { id } });
  };
  const commitFolderEdit = (name: string) => {
    dispatch({ type: FOLDER.EDIT, payload: { id, name } });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setChilds([children]);
  };

  const handleNodeClick = React.useCallback<
    React.MouseEventHandler<HTMLElement>
  >(
    (event) => {
      event.stopPropagation();
      onNodeClick(node);
    },
    [node]
  );

  const handleFileCreation: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        key="input"
        type="file"
        onSubmit={commitFileCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderCreation: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        key="input"
        type="folder"
        onSubmit={commitFolderCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderRename = () => {
    setIsOpen(true);
    setEditing(true);
  };

  return (
    <section id={id} onClick={handleNodeClick} className={styles.tree__folder}>
      <section className={styles["vertical-line"]}>
        <div className={styles["actions-wrapper"]}>
          {isEditing ? (
            <PlaceholderInput
              type="folder"
              style={{ paddingLeft: 0 }}
              defaultValue={name}
              onCancel={handleCancel}
              onSubmit={commitFolderEdit}
            />
          ) : (
            <FolderName
              name={name}
              isOpen={isOpen}
              handleClick={() => setIsOpen(!isOpen)}
            />
          )}

          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={handleFolderRename} />
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
              <AiOutlineDelete onClick={commitDeleteFolder} />
            </div>
          )}
        </div>
        <div
          className={clsx(styles.collapse, { [styles.collapse__open]: isOpen })}
        >
          {childs}
        </div>
      </section>
    </section>
  );
};
