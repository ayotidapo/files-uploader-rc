import React from 'react'
import Uploader from './Uploader'
import useRcfUploader from './useRcfUploader'

const UploaderComponent = ({ text }) => {
  return (
    <React.Fragment>
      <Uploader allowMultiple />
    </React.Fragment>
  )
}

export { useRcfUploader, UploaderComponent }
