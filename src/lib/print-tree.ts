type PrintNode<T> = (node: T, branch: string) => string;
type GetChildren<T> = (node: T) => Array<T> | undefined;

export function printTree<T>(
  initialTree: T,
  printNode: PrintNode<T>,
  getChildren: GetChildren<T>
) {
  const printText: string[] = [];

  function printBranch(tree: T, branch: string) {
    const isGraphHead = branch.length === 0;
    const children = getChildren(tree) || [];

    let branchHead = "";

    if (!isGraphHead) {
      branchHead = children && children.length !== 0 ? "┬ " : "─ ";
    }

    const toPrint = printNode(tree, `${branch}${branchHead}`);

    if (typeof toPrint === "string") {
      printText.push(`${branch}${branchHead}${toPrint}`);
    }

    let baseBranch = branch;

    if (!isGraphHead) {
      const isChildOfLastBranch = branch.slice(-2) === "└─";
      baseBranch = branch.slice(0, -2) + (isChildOfLastBranch ? "  " : "│ ");
    }

    const nextBranch = baseBranch + "├─";
    const lastBranch = baseBranch + "└─";

    children.forEach((child, index) => {
      printBranch(
        child,
        children.length - 1 === index ? lastBranch : nextBranch
      );
    });
  }

  printBranch(initialTree, "");

  return printText.join("\n");
}
