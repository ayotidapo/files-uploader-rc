import React from 'react'
import ProgressWrapper from './components/ProgressBar'
import useRcfUploader from './useRcfUploader'
import './App.scss'

const UploaderUI = (props) => {
  const [chosenFiles, setChosenFiles] = React.useState([])
  const uri = props.uploadUri

  const {
    removeBorder,
    maxNumOfFiles,
    getResponseObj,
    formDataField,
    uriConfig,
    forTest
  } = props

  const { uploading, completed, onRemoveFile, files, resObj } = useRcfUploader(
    uri,
    formDataField,
    chosenFiles,
    maxNumOfFiles,
    uriConfig,
    forTest
  )

  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles)
  }

  React.useEffect(() => {
    getResponseObj(resObj)
  }, [resObj])

  return (
    <div style={{ display: 'flex' }}>
      {resObj.length > 0 && forTest && (
        <div style={{ marginLeft: '50px', marginTop: '20px', width: '400px' }}>
          The urls of uploaded files are:
          <ul>
            {resObj.map((obj, i) => (
              <li
                style={{
                  maginBottom: '5px',
                  backgroud: '#eee',
                  background: 'antiquewhite',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '5px'
                }}
                key={i}
              >
                {obj?.url?.replace(`/oladapo/image/upload`, '')}
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
          className='fl-u-wrap'
          style={{ border: removeBorder && 'none' }}
          onDrop={(e) => {
            e.preventDefault()

            onSelectFile(e.dataTransfer.files)
          }}
          onDragEnter={(e) => {
            e.preventDefault()

            // / console.log('Files Entered: ');
          }}
          onDragOver={(e) => {
            e.preventDefault()

            // console.log('Files Over: ');
          }}
          onDragLeave={(e) => {
            e.preventDefault()

            return false
          }}
        >
          <input
            type='file'
            id='file-selector'
            style={{ display: 'none' }}
            multiple={props.allowMultiple}
            onChange={(e) => onSelectFile(e.target.files)}
            accept={props.validMIME}
            // eslint-disable-next-line no-return-assign
            onClick={(e) => {
              // eslint-disable-next-line no-param-reassign
              e.target.value = null
            }}
          />

          <label className='pry-txt hand' htmlFor='file-selector'>
            {props.children ||
              `To upload, click to browse file(s) or drag file(s) here.`}
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
  )
}

export default UploaderUI
