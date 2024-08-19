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
  codeList?.codes?.reduce((accumulator, currentValue, _currentIndex, codes) => {
    // Use the tree node if it already exists in the accumulator
    const current = accumulator.find(
      node => node.value === `${currentValue.id}`
    );
    // Remove the node from the accumulator if it exists
    accumulator = accumulator.filter(
      node => node.value !== `${currentValue.id}`
    );

    if (
      currentValue.parentID !== null &&
      currentValue.parentID !== 'noParent'
    ) {
      let parent = findParent(currentValue.parentID, accumulator);
      if (!parent) {
        const parentCode = codes.find(
          code => code.id === currentValue.parentID
        );
        parent = parentCode
          ? ({
              value: `${parentCode.id}`,
              label: `${getTranslateText(parentCode.name)}`
            } as TreeNode)
          : null;
        if (parent) {
          accumulator.push(parent);
        }
      }

      if (parent) {
        parent.children = [
          ...(parent.children ?? []),
          current ?? {
            value: `${currentValue.id}`,
            label: `${getTranslateText(currentValue.name)}`
          }
        ];
      }
    } else {
      accumulator.push(
        current ?? {
          value: `${currentValue.id}`,
          label: `${getTranslateText(currentValue.name)}`
        }
      );
    }
    return accumulator;
  }, []) ?? [];
