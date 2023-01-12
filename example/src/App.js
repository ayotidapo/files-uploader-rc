import React from 'react'

import { useRcfUploader, UploaderUI } from 'files-uploader-rc'
import 'files-uploader-rc/dist/index.css'

const App = () => {
  const uri = `https://api.cloudinary.com/v1_1/oladapo/upload`
  const formDataField = 'file'
  // const uri = `https://app.outwork.ng/mobstaff-mobile/v1/images/profileImage`
  // const formDataField = 'imageFile'

  // TO USE HOOKS ******//////
  const [chosenFiles, setChosenFiles] = React.useState([])

  // eslint-disable-next-line no-unused-vars
  const { completed, files, responseurls } = useRcfUploader(
    uri,
    formDataField,
    chosenFiles
  )

  // onSelectFile will be passed to onChange attr of the HTML input

  // eslint-disable-next-line no-unused-vars
  const onSelectFile = (newFiles) => {
    setChosenFiles(newFiles)
  }
  //
  /// End of TO USE HOOKS  Explanation////

  //*************************************************** */

  // To use UI **********/////

  // eslint-disable-next-line no-unused-vars
  const [responseObj, setResponseObj] = React.useState([])

  const getResponseObj = (responseObj) => {
    setResponseObj(responseObj)
  }

  // eslint-disable-next-line no-unused-vars
  const uriConfig = {
    headers: {
      'x-auth-token': `eyJpZCI6MTY1OSwiZXhwaXJlcyI6MTYxNzY1MjM0ODE0OCwiZW1haWwiOiJ0Y2N0ZXN0QHppcHBpZXguY29tIiwicGFzc3dvcmQiOiJhZGU2M2I2YTc3OWI2Y2NjYjZiMDlmMzYyMzNlMjkwZTllNWEyOTQ5ZDEwMGM3ZWI0YWJmZDIzZTA3Y2E1ZTljNzYwNjAzZjYwNWE4ZmUxNSIsImxhc3RMb2dpbiI6MTYxNjc4ODM0ODEyNH0.RZxnf4bCNyiZBq1C--q97_kjkPKhk917EyiGF27g1zs`
    }
  }
  console.log(files, completed, responseurls, 10)

  // validMIME

  console.log(responseObj)
  ///  End of To use UI ////
  return (
    <>
      <UploaderUI
        allowMultiple
        formDataField={formDataField}
        getResponseObj={getResponseObj}
        uploadUri={uri}
        forTest='dapo'
        // uriConfig={uriConfig} // OPTIONAL:    In case of a protected api route
      />
    </>
  )
}

export default App
