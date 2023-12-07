import { useMemo, useState } from "react";
import { get, last } from "lodash-es";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import FILE_ICONS from "./file-icons";
import { TreeInput } from "./tree-input";
import { useTreeContext } from "./context";
import { InsideTreeNode } from "@/interface";

interface ITreeFileProps {
  data: InsideTreeNode;
}

export const TreeFile = (props: ITreeFileProps) => {
  const { data } = props;
  const { onNameEdit } = useTreeContext();
  const [isEditing, setIsEditing] = useState(false);

  const exit = useMemo(() => last(data.name.split(".")) || "", [data.name]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (name: string) => {
    setIsEditing(false);
    onNameEdit(data, name);
  };

  return (
    <div className="flex items-center gap-1 relative group">
      {get(FILE_ICONS, exit) ?? <AiOutlineFile />}
      <TreeInput
        isEditing={isEditing}
        name={data.name}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleSubmit}
      />

      {!isEditing && (
        <div
          className="absolute right-0 flex items-center gap-1 invisible group-hover:visible"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineEdit className="cursor-pointer" onClick={handleEdit} />
          <AiOutlineDelete className="cursor-pointer" />
        </div>
      )}
    </div>
  );
};
