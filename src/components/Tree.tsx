import React, { useState } from 'react';

type TreeProps = {
  data: TreeList[];
};

const Tree: React.FC<TreeProps> = ({ data = [] }) => {
  return (
    <ul>
      {data.map((tree: TreeList) => (
        <TreeNode node={tree} key={tree.key} />
      ))}
    </ul>
  );
};

type TreeNodeProps = {
  node: TreeList;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const [expandNode, setExpandNode] = useState(true);

  const hasChild = !!node.children?.length;

  return hasChild ? (
    <li>
      <div onClick={() => setExpandNode((prevState) => !prevState)} aria-hidden="true">
        <img src={expandNode ? './collapse.svg' : './expand.svg'} alt="expand" />
        <span>{node.name}</span>
      </div>
      {expandNode && (
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
