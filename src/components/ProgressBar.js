import React from 'react';
import { Line } from 'rc-progress';
import CancelIcon from 'components/CancelIcon';

const ProgressWrapper = (props) => {
  const { file, barWidth, barColor, onRemoveFile } = props;
  const { name, size, progress } = file;

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
            strokeWidth={barWidth || 1.5}
            strokeColor={barColor || '#07f'}
            trailWidth={barWidth || 1.5}
          />
        </div>
        <span
          onClick={progress < 2 ? null : (e) => onRemoveFile(file, e)}
          className={progress < 2 ? 'dzb' : 'canc'}
        >
          <CancelIcon />
        </span>
      </div>
    </div>
  );
};
export default ProgressWrapper;
