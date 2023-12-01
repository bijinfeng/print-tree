import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { AiOutlineFile } from "react-icons/ai";
import { get } from "lodash-es";

import FILE_ICONS from "./file-icons";
import { FolderName } from "./tree-folder";
import styles from "./style.module.less";
import { TreeNode } from "@/interface";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface FileEditProps {
  ext: string;
  inputRef: InputProps["ref"];
  updateExt: InputProps["onChange"];
  defaultValue: InputProps["defaultValue"];
  style?: React.CSSProperties;
}

const FileEdit = ({
  ext,
  inputRef,
  updateExt,
  defaultValue,
  style,
}: FileEditProps) => {
  return (
    <div className={styles.tree__file} style={style}>
      {get(FILE_ICONS, ext) && <AiOutlineFile />}
      &nbsp;&nbsp;
      <input
        ref={inputRef}
        onChange={updateExt}
        defaultValue={defaultValue}
        className={styles.tree__input}
      />
    </div>
  );
};

interface FolderEditProps {
  name?: string;
  inputRef: InputProps["ref"];
  defaultValue: InputProps["defaultValue"];
  style?: React.CSSProperties;
}

const FolderEdit = ({ inputRef, defaultValue, style }: FolderEditProps) => {
  return (
    <section className={styles.tree__folder} id={v4()} style={style}>
      <FolderName
        isOpen={true}
        handleClick={() => {}}
        name={
          <input
            ref={inputRef}
            className="tree__input"
            defaultValue={defaultValue}
          />
        }
      />
    </section>
  );
};

interface PlaceholderInputProps {
  type: TreeNode["type"];
  name?: TreeNode["name"];
  onSubmit: (value: string) => void;
  defaultValue?: InputProps["defaultValue"];
  style?: React.CSSProperties;
  onCancel?: () => void;
}

const PlaceholderInput = ({
  type,
  name,
  onSubmit,
  onCancel,
  defaultValue,
  style,
}: PlaceholderInputProps) => {
  const [ext, setExt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const updateExt: InputProps["onChange"] = (e) => {
    let splitted = e.target.value.split(".");
    let ext = splitted && splitted[splitted.length - 1];
    setExt(ext);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.addEventListener("keyup", (e) => {
      // @ts-ignore
      if (e.key === "Enter") onSubmit(e.target.value);
      if (e.key === "Escape") {
        onCancel?.();
      }
    });
  }, [inputRef]);

  return type === "file" ? (
    <FileEdit
      ext={ext}
      style={style}
      updateExt={updateExt}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  ) : (
    <FolderEdit
      style={style}
      name={name}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  );
};

export { PlaceholderInput };
