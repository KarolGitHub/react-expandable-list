import React, { useRef } from 'react';
import useFetch from '../hooks/useFetch';
import Tree from './Tree';

const TreeContainer: React.FC = () => {
  const isMountedRef = useRef(true);
  const { data, error, loading } = useFetch('/list', isMountedRef, {});

  return (
    <div className="container tree-container">
      {loading && <h1>{loading}</h1>}
      {error && <h2>{error}</h2>}
      <div className="tree">{data.length > 0 && <Tree data={data} />}</div>
    </div>
  );
};

export default TreeContainer;
