import React from 'react';
import { Line } from 'rc-progress';

const ProgressWrapper = (props) => {
  const { file, barWidth, barColor, onRemoveFile } = props;
  const { id, name, size, progress } = file;

  return (
    <div className="bp-wrp">
      <div className="file-info" style={{ display: 'flex' }}>
        <span>{name}</span>
        <span>{size}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="pr-wrap" style={{ width: barWidth || '90%' }}>
          <Line
            percent={progress}
            strokeWidth={barWidth || 2.5}
            strokeColor={barColor || '#07f'}
            trailWidth={barWidth || 2.5}
          />
        </div>
        <span className="canc" onClick={() => onRemoveFile(file)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="22"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
export default ProgressWrapper;
