import React, { useState } from 'react';

type TreeProps = {
  data: TreeList[];
};

const Tree: React.FC<TreeProps> = ({ data = [] }) => {
  const [expandedNodeKey, setExpandedNodeKey] = useState<string>('');

  const expandNodeHandler = (key: string) => {
    setExpandedNodeKey((prevState) => (key === prevState ? '' : key));
  };

  return (
    <ul>
      {data.map((tree: TreeList) => (
        <TreeNode node={tree} key={tree.key} isExpanded={tree.key === expandedNodeKey} expandCb={expandNodeHandler} />
      ))}
    </ul>
  );
};

type TreeNodeProps = {
  node: TreeList;
  isExpanded: boolean;
  expandCb: (key: string) => void;
};

const TreeNode: React.FC<TreeNodeProps> = React.memo(({ node, isExpanded, expandCb }) => {
  const [expandAllNodes, setExpandAllNodes] = useState(true);

  const hasChild = !!node.children?.length;
  const radioType = node.type === 'radio';

  return hasChild ? (
    <li>
      <div
        onClick={() => (radioType ? expandCb(node.key) : setExpandAllNodes((prevState) => !prevState))}
        aria-hidden="true">
        {radioType ? (
          <img src={isExpanded ? './collapse.svg' : './expand.svg'} alt="expand" />
        ) : (
          <input
            type="checkbox"
            checked={expandAllNodes}
            onChange={() => setExpandAllNodes((prevState) => !prevState)}
            onClick={() => setExpandAllNodes((prevState) => !prevState)}
          />
        )}
        <span>{node.name}</span>
      </div>
      {!radioType
        ? expandAllNodes && (
            <ul>
              <Tree data={node.children} />
            </ul>
          )
        : isExpanded && (
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
});

/* const comparisonFn = function (prevProps: TreeProps, nextProps: TreeProps) {
  return prevProps.data !== nextProps.data;
}; */
export default Tree;
