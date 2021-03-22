import React from 'react'

import { useRcfUploader, UploaderUI } from 'react-files-uploader'
import 'react-files-uploader/dist/index.css'

const App = () => {
  const uri = `https://api.cloudinary.com/v1_1/oladapo/upload`

  // To use Hooks
  const [chosenFiles, setChosenFiles] = React.useState([])
  const [files, urls] = useRcfUploader(uri, chosenFiles)

  console.log(files, urls)

  // onSelectFile will be passed to onChange attr of the HTML input
  // eslint-disable-next-line no-unused-vars
  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles)
  }

  /// End of To use Hooks  Explanation////

  //*************************************************** */

  // To use UI
  const [returnUrls, setUrls] = React.useState([])

  const onCompleted = (returnUrls) => {
    setUrls(returnUrls)
  }

  console.log(returnUrls)
  ///  End of To use UI ////
  return (
    <>
      <UploaderUI allowMultiple onCompleted={onCompleted} uploadUri={uri} />
    </>
  )
}

export default App
