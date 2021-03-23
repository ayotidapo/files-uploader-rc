# react-files-uploader

> A very flexible file uploader that comes with: <br/>
> UI showing progress bar of simultaneous (Single or Multiple) file(s) uploading,<br/>
> allows cancel of uploading,<br/>
> flexible to add custom UI<br/>
> drag and drop feature and returns the uploaded file(s) url links.<br/>
> It also comes with its own Hooks incase of when UI is not needed.

[![NPM](https://img.shields.io/npm/v/react-files-uploader.svg)](https://www.npmjs.com/package/react-files-uploader) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-files-uploader
```

## Usage

```jsx
import React, { Component } from 'react'

import { UploaderUI } from 'react-files-uploader'
import 'react-files-uploader/dist/index.css'

class Example extends Component {
  const uri=`this-is-your-remote-server-url-for-the-upload`
  render() {
    return <UploaderUI  getResponseUrls={getResponseUrls} uploadUri={uri} />
  }


}
```

### You can also pass your own custom component like below

```jsx
import React, { Component } from 'react'

import { UploaderUI } from 'react-files-uploader'
import 'react-files-uploader/dist/index.css'

class Example extends Component {
  const uri=`this-is-your-remote-server-url-for-the-upload`
  render() {
    return (
      <UploaderUI  getResponseUrls={getResponseUrls} uploadUri={uri}>
        <div>
        <button>Upload</button>
        </div>
      </UploaderUI>
      )
  }


}
```

## As a Hook

```jsx
import React, { Component } from 'react'

import { useRcfUploader } from 'react-files-uploader'


class Example extends Component {
  const uri=`this-is-your-remote-server-url-for-the-upload`

   const [chosenFiles, setChosenFiles] = React.useState([])

   const maxNumOfFiles='max-number-of-files-you-want-to-allow-for-upload'

  const [uploading, completed, onRemoveFile, files, responseUrls] = useRcfUploader(uri, chosenFiles,maxNumOfFiles)

   console.log(responseUrls)


   // maxNumOfFiles is 5 by default but can be changed.
   // responseUrls is an array of all the urls of the uploaded files
   // uploading indicates uploading is still ongoing this can be used to know when to enable the submit  button
   // completed is when no ongoing uploads

}
```

## DEMO

![Demo](https://res.cloudinary.com/oladapo/video/upload/v1616492886/test2-folder/yd0aqwzvngvogtpu6gxn.mov)

## License

MIT © [https://github.com/ayotidapo/rcfiles-uploader](https://github.com/https://github.com/ayotidapo/rcfiles-uploader)

# Full Docs coming...
