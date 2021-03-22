import React from 'react'
import ProgressWrapper from './components/ProgressBar'
import useRcfUploader from './useRcfUploader'
import './App.scss'

const UploaderUI = (props) => {
  const [chosenFiles, setChosenFiles] = React.useState([])
  const uri = props.uploadUri
  const { maxNumOfFiles, onCompleted } = props

  const [uploading, completed, onRemoveFile, files, urls] = useRcfUploader(
    uri,
    chosenFiles,
    maxNumOfFiles
  )

  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles)
  }

  React.useEffect(() => {
    if (completed) {
      onCompleted(urls)
    }
  }, [completed])

  return (
    <div style={{ display: 'flex' }}>
      {urls.length > 0 && false && (
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
                  marginBottom: '5px'
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
          {uploading && false && 'Files upload: ongoing...'}
          {completed && false && 'Files upload: completed!!'}
        </h5>
        <span
          className='fl-u-wrap'
          onDrop={(e) => {
            e.preventDefault()
            onSelectFile(e.dataTransfer.files)
          }}
          onDragEnter={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // / console.log('Files Entered: ');
          }}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // console.log('Files Over: ');
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            e.stopPropagation()
            return false
          }}
        >
          <input
            type='file'
            id='file-selector'
            style={{ display: 'none' }}
            multiple={props.allowMultiple}
            onChange={(e) => onSelectFile(e.target.files)}
            accept={props.allowedFiles}
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