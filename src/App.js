import React from 'react';
import ProgressWrapper from 'components/ProgressBar';
import useAsHooks from './useAsHooks';
import './App.scss';

function App() {
  const [chosenFiles, setChosenFiles] = React.useState([]);
  console.log(chosenFiles, 100);
  const [uploading, onRemoveFile, files, urls] = useAsHooks(chosenFiles);

  const onSelectFile = (newFiles) => {
    console.log(newFiles, 200);
    setChosenFiles(newFiles);
  };

  return (
    <div style={{ width: '450px' }}>
      {urls.map((u, i) => (
        <h1 key={i}>{u}</h1>
      ))}
      {uploading && 'ongoing...'}
      <span className="fl-u-wrap">
        <input
          type="file"
          id="file-selector"
          style={{ display: 'none' }}
          multiple
          onChange={(e) => onSelectFile(e.target.files)}
        />
        <label className="pry-txt hand" htmlFor="file-selector">
          To upload, click to browse file(s) or drag file(s) here.
        </label>
        {files.map((file) => (
          <ProgressWrapper
            key={file.id}
            file={file}
            onRemoveFile={onRemoveFile}
          />
        ))}
      </span>
    </div>
  );
}

export default App;
