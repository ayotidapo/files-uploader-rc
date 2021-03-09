import React from 'react';
import ProgressWrapper from 'components/ProgressBar';
import useRcfUploader from './useRcfUploader';
import './App.scss';

function App() {
  const [chosenFiles, setChosenFiles] = React.useState([]);
  const uri = `https://api.cloudinary.com/v1_1/oladapo/upload`;

  const [uploading, completed, onRemoveFile, files, urls] = useRcfUploader(
    uri,
    chosenFiles,
  );

  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles);
  };
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   console.log(kiss.me);
  // }, []);

  return (
    <div style={{ display: 'flex' }}>
      {urls.length > 0 && (
        <div style={{ marginLeft: '50px', marginTop: '20px', width: '400px' }}>
          The urls of uploaded files are:
          <ul>
            {urls.map((u, i) => (
              <li
                style={{
                  maginBottom: '5px',
                  backgroud: '#eee',
                  background: 'antiquewhite',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
                key={i}
              >
                {u.replace(`/oladapo/image/upload`, '')}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ width: '450px' }}>
        <h5
          style={{ marginLeft: '100px', color: completed ? '#07f' : '#d63f10' }}
        >
          {uploading && 'Files upload: ongoing...'}
          {completed && 'Files upload: completed!!'}
        </h5>
        <span
          className="fl-u-wrap"
          onDrop={(e) => {
            e.preventDefault();
            onSelectFile(e.dataTransfer.files);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // / console.log('Files Entered: ');
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // console.log('Files Over: ');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          <input
            type="file"
            id="file-selector"
            style={{ display: 'none' }}
            multiple
            onChange={(e) => onSelectFile(e.target.files)}
            // eslint-disable-next-line no-return-assign
            onClick={(e) => {
              // eslint-disable-next-line no-param-reassign
              e.target.value = null;
            }}
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
    </div>
  );
}

export default App;
