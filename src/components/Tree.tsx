import React, { Dispatch, useCallback } from 'react';
import { useExpand } from '../context/Expand';

type TreeProps = {
  data: TreeList[];
};

const Tree: React.FC<TreeProps> = ({ data = [] }) => {
  const { state: expanded, dispatch } = useExpand();

  return (
    <ul>
      {data.map((tree: TreeList) => (
        <TreeNode node={tree} key={tree.key} isExpanded={expanded.includes(tree.key)} expandCb={dispatch} />
      ))}
    </ul>
  );
};

type TreeNodeProps = {
  node: TreeList;
  isExpanded: boolean;
  expandCb: Dispatch<Action>;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, isExpanded, expandCb }) => {
  const hasChild = !!node.children?.length;
  const radioType = node.type === 'radio';

  const expandNodeHandler = useCallback(() => {
    if (radioType) {
      expandCb({ type: 'RADIO_EXPAND', key: node.key });
    } else {
      expandCb({ type: 'CHECKBOX_EXPAND', key: node.key });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hasChild ? (
    <li>
      <div onClick={expandNodeHandler} aria-hidden="true">
        {radioType ? (
          <img src={isExpanded ? './collapse.svg' : './expand.svg'} alt="expand" />
        ) : (
          <input type="checkbox" checked={isExpanded} onChange={expandNodeHandler} onClick={expandNodeHandler} />
        )}
        <span>{node.name}</span>
      </div>
      {isExpanded && (
        <ul>
          <Tree data={node.children} />
        </ul>
      )}
    </li>
  ) : (
    <li className="child" aria-hidden="true">
      <span>{node.name}</span>
    </li>
  );
};

export default Tree;
