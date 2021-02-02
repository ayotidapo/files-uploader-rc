import axios from 'axios';

const uploadFilez = async (params) => {
  const { setUploading, fileDispatcher, setUploadCount, file } = params;
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

export default uploadFilez;
