import { get, last } from "lodash-es";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSetState } from "ahooks";

import FILE_ICONS from "./file-icons";
import { TreeInput } from "./tree-input";
import { useTreeContext } from "./context";
import { TreeNode } from "@/interface";

interface ITreeFileProps {
  data: TreeNode;
}

export const getTreeFileIcon = (name: string) => {
  const exit = last(name.split(".")) || "";

  return get(FILE_ICONS, exit) ?? <AiOutlineFile />;
};

export const TreeFile = (props: ITreeFileProps) => {
  const { data } = props;
  const { onNameEdit, onDelete } = useTreeContext();
  const [state, setState] = useSetState({ isEdit: false });

  return (
    <div className="flex items-center gap-1 relative group">
      {getTreeFileIcon(data.name)}
      <TreeInput
        isEditing={state.isEdit}
        name={data.name}
        onCancel={() => setState({ isEdit: false })}
        onSubmit={(name) => onNameEdit(data, name)}
      />

      {!state.isEdit && (
        <div
          className="absolute right-0 flex items-center gap-1 invisible group-hover:visible"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineEdit
            className="cursor-pointer"
            onClick={() => setState({ isEdit: true })}
          />
          <AiOutlineDelete
            className="cursor-pointer"
            onClick={() => onDelete(data)}
          />
        </div>
      )}
    </div>
  );
};
