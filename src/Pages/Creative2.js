import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function Creative2({ id, data }) {
  return (
	<>
		<Handle type="target" position={Position.Left} />
		<div className='react-flow react-flow__node-output'>
            {data.label}
		</div>
        <Handle type="source" position={Position.Right} />

	</>
  );
}
export default memo(Creative2);