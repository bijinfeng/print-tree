import { useRef } from "react";
import { Input } from "@/components/ui/input";

interface TreeInputProps {
  isEditing: boolean;
  name: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export const TreeInput = (props: TreeInputProps) => {
  const { isEditing, name, onSubmit, onCancel } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const value = inputRef.current?.value;

    value ? onSubmit(value) : onCancel();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      // 回车键被按下
      handleSubmit();
    }
  };

  if (!isEditing) return <span>{name}</span>;

  return (
    <Input
      ref={inputRef}
      defaultValue={name}
      className="h-6 rounded-sm px-1"
      autoFocus
      onKeyDown={handleKeyDown}
      onBlur={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    />
  );
};
