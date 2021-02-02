import React from 'react';
import ProgressWrapper from 'components/ProgressBar';
import useAsHooks from './useAsHooks';
import './App.scss';

function App() {
  const [chosenFiles, setChosenFiles] = React.useState([]);
  const uri = `https://api.cloudinary.com/v1_1/oladapo/upload`;

  const [uploading, completed, onRemoveFile, files, urls] = useAsHooks(
    uri,
    chosenFiles,
  );

  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles);
  };

  return (
    <div style={{ width: '450px' }}>
      {urls.map((u, i) => (
        <h1 key={i}>{u}</h1>
      ))}
      <h5
        style={{ marginLeft: '100px', color: completed ? '#07f' : '#d63f10' }}
      >
        {uploading && 'Files upload: ongoing...'}
        {completed && 'Files upload: completed!!'}
      </h5>
      <span className="fl-u-wrap">
        <input
          type="file"
          id="file-selector"
          style={{ display: 'none' }}
          multiple
          onChange={(e) => onSelectFile(e.target.files)}
          // eslint-disable-next-line no-return-assign
          onClick={(e) => (e.target.value = '')}
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
