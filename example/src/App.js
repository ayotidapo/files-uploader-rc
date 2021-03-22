import React from 'react'

import {
  ExampleComponent,
  useRcfUploader,
  UploaderComponent
} from 'react-files-uploader'
import 'react-files-uploader/dist/index.css'

const App = () => {
  const uri = `https://api.cloudinary.com/v1_1/oladapo/upload`

  const [chosenFiles, setChosenFiles] = React.useState([])

  const [files, urls] = useRcfUploader(uri, chosenFiles)

  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles)
  }
  console.log(files, urls)
  return (
    <>
      {/* <input
        type='file'
        id='file-selector'
        multiple
        onChange={(e) => onSelectFile(e.target.files)}
        // eslint-disable-next-line no-return-assign
        onClick={(e) => {
          // eslint-disable-next-line no-param-reassign
          e.target.value = null
        }}
      /> */}

      <UploaderComponent />
    </>
  )
}

export default App
