import React from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import ProgressWrapper from 'components/ProgressBar';
import { getUnikArrObj } from 'helpers/functions';
import fileReducer from './useReducer/fileReducer';

import './App.scss';

function App() {
  const [files, fileDispatcher] = React.useReducer(fileReducer, []);
  const [uploading, setUploading] = React.useState(false);
  const [uploadCount, setUploadCount] = React.useState(0);
  const [urls, setUrls] = React.useState([]);

  React.useEffect(() => {
    if (uploadCount === files.length) {
      setUploading(false);
      const fileUrls = files.map((file) => file.responseUrl);

      getFileUrls(fileUrls);
      // props.submitFunc(fileUrls);
    } else if (files.length < 1) setUploading(false);
  }, [uploadCount]);

  React.useEffect(() => {
    if (files.length === 0 && uploading) setUploading(false);
  }, [files.length]);

  const getFileUrls = (f_urls) => {
    // u can use tghis function to set the responseUrl so u can use tem the way u like in other apps
    setUrls(f_urls);
  };

  const uploadFilez = async (file) => {
    try {
      setUploading(true);
      const formdata = new FormData();
      formdata.append('file', file.content);
      formdata.append('upload_preset', 'iikmkha3');

      const fileID = file.id;
      const { CancelToken } = axios;
      const source = CancelToken.source();

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/oladapo/upload`,
        formdata,
        {
          cancelToken: source.token,
          onUploadProgress: (ProgressEvent) => {
            const progress = (ProgressEvent.loaded / ProgressEvent.total) * 100;
            fileDispatcher({
              type: 'UPDATE_PROGRESS_VALUE',
              fileID,
              progress,
              cancelFunc: source.cancel,
            });
          },
        },
      );
      const { secure_url: responseUrl } = response.data;
      fileDispatcher({ type: 'ADD_RESPONSE_URL', fileID, responseUrl });
      setUploadCount((prevState) => prevState + 1);
    } catch (e) {
      fileDispatcher({ type: 'REMOVE_FILE', fileID: file.id }); // Todo: myt show that it fails with red bar and implement retry nt just getting the file and calling upload func
      // setUploadCount(uploadCount - 1); this will be needed for RETRY and I will have to set uploadCount to minus 1 to indicating retry is going on
      console.log(e, e?.response?.data?.message, e?.message);
    }
  };

  const onSelectFile = (fileVal) => {
    const filesArr = [...fileVal];
    const newFilez = filesArr.map((file) => ({
      id: v4(),
      name: file.name,
      size: `${file.size / 1000} KB`,
      content: file,
      progress: 0,
      cancelFunc: null,
      responseUrl: '',
      loading: false,
      success: false,
    }));

    const filez = getUnikArrObj([...newFilez, ...files], 'name');

    fileDispatcher({ type: 'UPDATE_FILES', filez });

    newFilez.forEach((file) => {
      uploadFilez(file);
    });
  };

  const onRemoveFile = (file, e) => {
    e.preventDefault();
    if (file.cancelFunc) {
      file.cancelFunc();
      if (uploadCount > 0) setUploadCount((prevState) => prevState - 1);
      fileDispatcher({ type: 'REMOVE_FILE', fileID: file.id });
    }
  };

  return (
    <div style={{ width: '450px' }}>
      {urls.map((u, i) => (
        <h1 key={i}>{u}</h1>
      ))}
      {uploading && 'ongoing...'}
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
  );
}

export default App;
