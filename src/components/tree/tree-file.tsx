import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { get } from "lodash-es";

import { PlaceholderInput } from "./tree-placeholder-input";
import { useTreeContext } from "./state/tree-context";
import { FILE } from "./state/constants";
import FILE_ICONS from "./file-icons";
import styles from "./style.module.less";

import { TreeNode } from "@/interface";

interface FileProps {
  name: string;
  id: string;
  node: TreeNode;
}

export const File = ({ name, id, node }: FileProps) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const ext = useRef<string>("");

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];

  const toggleEditing = () => setEditing(!isEditing);
  const commitEditing = (name: string) => {
    dispatch({ type: FILE.EDIT, payload: { id, name } });
    setEditing(false);
  };
  const commitDelete = () => {
    dispatch({ type: FILE.DELETE, payload: { id } });
  };

  const handleNodeClick = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (e) => {
      e.stopPropagation();
      onNodeClick(node);
    },
    [node]
  );
  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div onClick={handleNodeClick} className="tree__file">
      {isEditing ? (
        <PlaceholderInput
          type="file"
          style={{ paddingLeft: 0 }}
          defaultValue={name}
          onSubmit={commitEditing}
          onCancel={handleCancel}
        />
      ) : (
        <div className={styles["actions-wrapper"]}>
          <div className={styles.tree__name}>
            {get(FILE_ICONS, ext.current) && <AiOutlineFile />}
            &nbsp;&nbsp;{name}
          </div>
          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={toggleEditing} />
              <AiOutlineDelete onClick={commitDelete} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
