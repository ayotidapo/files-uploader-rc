import React from 'react'
import axios from 'axios'
import { v4 } from 'uuid'
import fileReducer from './useReducer/fileReducer'

// eslint-disable-next-line camelcase
const useRcfUploader = (upload_uri, filez = [], maxNumOfFiles = 10) => {
  const [files, fileDispatcher] = React.useReducer(fileReducer, filez)
  const [uploading, setUploading] = React.useState(false)
  const [firstLoad, setFirstLoad] = React.useState(true)
  const [completed, setCompleted] = React.useState(false)
  const [uploadedCount, setUploadCount] = React.useState(0)

  const [responseUrls, setUrls] = React.useState([])

  const getFileUrls = () => {
    const fileUrls = files.map((file) => file.responseUrl)
    setUrls(fileUrls)
  }

  React.useEffect(() => {
    // eslint-disable-next-line camelcase
    if (!upload_uri) {
      throw new Error("upload_uri  is required as hook's first parameter")
    }
  }, [])

  React.useEffect(() => {
    if (filez.length > 0) onSelectFile(filez)
  }, [filez])

  React.useEffect(() => {
    const fileLen = files.length

    if (uploadedCount === fileLen && !firstLoad) {
      setCompleted(true)
      setUploading(false)

      getFileUrls()

      // props.submitFunc(fileUrls);
    } else if (fileLen < 1 && uploading) setCompleted(true)
    else if (fileLen > 0 && uploading) {
      getFileUrls()
    }
    if (!firstLoad && fileLen < 1) setCompleted(false)
  }, [uploadedCount])

  React.useEffect(() => {
    if (files.length === 0 && uploading) setUploading(false)
  }, [files.length])

  const uploadFilez = async (file) => {
    try {
      setUploading(true)
      setCompleted(false)
      setFirstLoad(false)

      const formdata = new window.FormData()
      formdata.append('file', file.content)
      formdata.append('upload_preset', 'iikmkha3')

      const fileID = file.id
      const { CancelToken } = axios
      const source = CancelToken.source()

      const response = await axios.post(upload_uri, formdata, {
        cancelToken: source.token,
        onUploadProgress: (ProgressEvent) => {
          const progress = (ProgressEvent.loaded / ProgressEvent.total) * 100
          fileDispatcher({
            type: 'UPDATE_PROGRESS_VALUE',
            fileID,
            progress,
            cancelFunc: source.cancel
          })
        }
      })
      const { secure_url: responseUrl } = response.data
      fileDispatcher({ type: 'ADD_RESPONSE_URL', fileID, responseUrl })
      setUploadCount((prevState) => prevState + 1)
    } catch (e) {
      fileDispatcher({ type: 'REMOVE_FILE', fileID: file.id })

      const errMsg = e?.response?.data?.message || e?.message

      if (errMsg) throw new Error(errMsg || 'error occured')
    }
  }

  const onSelectFile = (fileVal) => {
    const filesArr = [...fileVal]

    const newFilez = filesArr.map((file) => ({
      id: v4(),
      name: file.name,
      size: `${file.size / 1000} KB`,
      content: file,
      progress: 0,
      cancelFunc: null,
      responseUrl: '',
      loading: false,
      success: false
    }))

    const filez = [...newFilez, ...files]

    if (filez.length > maxNumOfFiles)
      throw new Error(
        `The props value set for maxNumOfFiles is ${maxNumOfFiles}, you can change it`
      )

    fileDispatcher({ type: 'UPDATE_FILES', filez })

    newFilez.forEach((file) => {
      uploadFilez(file)
    })
  }
  // console.log(urls, 76)
  const onRemoveFile = (file, e) => {
    e.preventDefault()
    if (file.cancelFunc) {
      file.cancelFunc()
      if (uploadedCount > 0) setUploadCount((prevState) => prevState - 1)
      fileDispatcher({ type: 'REMOVE_FILE', fileID: file.id })
    }
  }

  return [uploading, completed, onRemoveFile, files, responseUrls]
}

export default useRcfUploader
