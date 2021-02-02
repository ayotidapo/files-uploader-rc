import React from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import { getUnikArrObj } from 'helpers/functions';
import fileReducer from './useReducer/fileReducer';

const useAsHooks = (upload_uri, filez = []) => {
  const [files, fileDispatcher] = React.useReducer(fileReducer, filez);
  const [uploading, setUploading] = React.useState(false);
  const [uploadCount, setUploadCount] = React.useState(0);
  const [urls, setUrls] = React.useState([]);

  const memoizeFilez = React.useMemo(() => filez, [filez]);

  const getFileUrls = (f_urls) => {
    // u can use tghis function to set the responseUrl so u can use tem the way u like in other apps
    setUrls(f_urls);
  };

  React.useEffect(() => {
    if (!upload_uri) {
      throw new Error("upload_uri  is required as hook's first parameter");
    }
  }, []);

  React.useEffect(() => {
    onSelectFile(filez);
  }, [memoizeFilez]);

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

  const uploadFilez = async (file) => {
    try {
      setUploading(true);
      const formdata = new FormData();
      formdata.append('file', file.content);
      formdata.append('upload_preset', 'iikmkha3');

      const fileID = file.id;
      const { CancelToken } = axios;
      const source = CancelToken.source();

      const response = await axios.post(upload_uri, formdata, {
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
      });
      const { secure_url: responseUrl } = response.data;
      fileDispatcher({ type: 'ADD_RESPONSE_URL', fileID, responseUrl });
      setUploadCount((prevState) => prevState + 1);
    } catch (e) {
      fileDispatcher({ type: 'REMOVE_FILE', fileID: file.id }); // Todo: myt show that it fails with red bar and implement retry nt just getting the file and calling upload func
      // setUploadCount(uploadCount - 1); this will be needed for RETRY and I will have to set uploadCount to minus 1 to indicating retry is going on

      const errMsg = e?.response?.data?.message || e?.message;

      if (errMsg) throw new Error(errMsg || 'error occured');
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

  return [uploading, onRemoveFile, files, urls];
};

export default useAsHooks;
