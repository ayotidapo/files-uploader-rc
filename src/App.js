import React from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import ProgressWrapper from 'components/ProgressBar';
import { getUnikArrObj } from 'helpers/functions';
import fileReducer from './useReducer/fileReducer';

import './App.scss';

function App() {
  const [files, fileDispatcher] = React.useReducer(fileReducer, []);

  // const memoizeUserInterests = React.useMemo(() => userInterests, [
  //   userInterests,
  // ]);

  const uploadFilez = async (file) => {
    try {
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
    } catch (e) {
      console.log(e);
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
    }));

    const filez = getUnikArrObj([...newFilez, ...files], 'name');

    fileDispatcher({ type: 'UPDATE_FILES', filez });

    newFilez.forEach((file) => {
      uploadFilez(file);
    });
  };

  const onRemoveFile = (file) => {
    file.cancelFunc();

    fileDispatcher({ type: 'REMOVE_FILE', fileID: file.id });
  };
  console.log(files);
  return (
    <div style={{ width: '400px' }}>
      <div className="fl-u-wrap">
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
        <label className="pry-btn hand" htmlFor="file-selector">
          Select file(s) to upload
        </label>
        {files.map((file) => (
          <ProgressWrapper
            key={file.id}
            file={file}
            onRemoveFile={onRemoveFile}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
