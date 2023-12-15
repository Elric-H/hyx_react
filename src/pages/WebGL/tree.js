import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import CanvasTree from '@/components/CanvasTree';

const mockData = {
  title: 'Node 1',
  value: 538.9,
  unit: 'Yuan',
  border: 'blue',
  children: [
    {
      title: 'Child Node 1-1',
      value: 338.0,
      unit: 'Yuan',
      border: 'red',
      children: [
        {
          title: 'Child Node 1-1-1',
          value: 138.0,
          unit: 'Yuan',
          border: 'green',
          children: [
            {
              title: 'Child Node 1-1-3',
              value: 138.0,
              unit: 'Yuan',
              border: 'green',
            },
          ],
        },
        {
          title: 'Child Node 1-1-2',
          value: 138.0,
          unit: 'Yuan',
          border: 'green',
        },
        {
          title: 'Child Node 1-1-3',
          value: 138.0,
          unit: 'Yuan',
          border: 'green',
        },
      ],
    },
    {
      title: 'Child Node 1-2',
      value: 100.0,
      unit: 'Yuan',
      border: 'green',
      children: [
        {
          title: 'qqqqChild Node 1-1-1dasdsdadadada',
          value: 138.0,
          unit: 'Yuan',
          border: 'green',
        },
        {
          title: 'Child Node 1-1-2',
          value: 138.0,
          unit: 'Yuan',
          border: 'green',
        },
        {
          title: 'Child Node 1-1-3',
          value: 138.0,
          unit: 'Yuan',
          border: 'green',
        },
      ],
    },
  ],
};

const Test = () => {
  const [loading, setLoading] = useState(false);
  const handleNodeClick = data => {
    console.log('Clicked node:', data);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      return new Promise(resolve => {
        setTimeout(() => resolve(), 300);
      }).finally(() => setLoading(false));
      // setLoading(false);
    };
    init();
  }, []);

  return (
    <Spin spinning={loading}>
      <div style={{ background: '#fff' }}>
        <CanvasTree nodeData={mockData} onNodeClick={handleNodeClick} width={1200} height={800} />
      </div>
    </Spin>
  );
};

export default Test;
