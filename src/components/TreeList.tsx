import React, { useRef } from 'react';
import useFetch from '../hooks/useFetch';

const TreeList: React.FC = () => {
  const isMountedRef = useRef(true);
  const { data, error, loading } = useFetch('/list', isMountedRef, {});

  console.log('🚀 ~ file: TreeList.tsx ~ line 8 ~ TreeList ~ data', data);

  return (
    <div>
      {loading && <p>{loading}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TreeList;
