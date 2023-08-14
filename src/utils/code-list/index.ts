import { getTranslateText } from '../../lib/translateText';
import { CodeList, TreeNode } from '../../types';

const findParent = (id: number, nodes: TreeNode[]) => {
  const parent = nodes.find(node => node.value === `${id}`);
  if (parent) {
    return parent;
  }

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].children) {
      const result = findParent(id, nodes[i].children);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

export const convertCodeListToTreeNodes = (codeList: CodeList): TreeNode[] =>
  codeList?.codes?.reduce((accumulator, currentValue) => {
    const parent = findParent(currentValue.parentID, accumulator);
    if (parent) {
      parent.children = [
        ...(parent.children ?? []),
        {
          value: `${currentValue.id}`,
          label: getTranslateText(currentValue.name)
        }
      ];
    } else {
      accumulator.push({
        value: `${currentValue.id}`,
        label: getTranslateText(currentValue.name)
      });
    }
    return accumulator;
  }, []) ?? [];
