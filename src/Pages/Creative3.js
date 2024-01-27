import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function Creative3({ id, data }) {
  return (
	<>
		<Handle type="target" position={Position.Left} />
		<div className='react-flow__node-default'>
            {data.label}
        </div>
        <Handle type="source" position={Position.Right} />

	</>
  );
}
export default memo(Creative3);