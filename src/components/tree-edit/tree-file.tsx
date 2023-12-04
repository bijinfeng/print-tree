import { useMemo } from "react";
import { get, last } from "lodash-es";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import FILE_ICONS from "./file-icons";
import { TreeNode } from "@/interface";

interface ITreeFileProps {
  data: TreeNode;
}

export const TreeFile = (props: ITreeFileProps) => {
  const { data } = props;

  const exit = useMemo(() => last(data.name.split(".")) || "", [data.name]);

  return (
    <div className="flex items-center gap-1 relative group">
      {get(FILE_ICONS, exit) ?? <AiOutlineFile />}
      <span>{data.name}</span>

      <div
        className="absolute right-0 flex items-center gap-1 invisible group-hover:visible"
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineEdit className="cursor-pointer" />
        <AiOutlineDelete className="cursor-pointer" />
      </div>
    </div>
  );
};
