import { TreeNode } from "@/interface";

interface ITreeFileProps {
  data: TreeNode;
}

export const TreeFile = (props: ITreeFileProps) => {
  const { data } = props;

  return (
    <div className="flex items-center">
      <span>{data.name}</span>
    </div>
  );
};
