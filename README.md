# files-uploader-rc

> A very flexible file uploader that comes with: <br/>
> UI showing progress bar of simultaneous (Single or Multiple) file(s) uploading,<br/>
> allows cancel of uploading,<br/>
> flexible to add custom UI<br/>
> drag and drop feature and returns the uploaded file(s) url links.<br/>
> It also comes with its own Hooks incase of when UI is not needed.

[![NPM](https://img.shields.io/npm/v/react-files-uploader.svg)](https://www.npmjs.com/package/rfiles-uploader-rc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save files-uploader-rc
```

## Usage

```jsx
import React, { Component } from 'react'

import { UploaderUI } from 'files-uploader-rc'
import 'files-uploader-rc/dist/index.css'

class Example extends Component {
 const [returnUrls, setUrls] = React.useState([])

  const getResponseUrls = (returnUrls) => {
    setUrls(returnUrls)
  }

  const uri=`this-is-your-remote-server-url-for-the-upload`

  // uriConfig is OPTIONAL: In case of a protected api route
   const uriConfig = {
    headers: {
      'x-auth-token': `eyJp1zs`
    }
  }

  console.log(returnUrls) // this is an array of urls of all successfully uploaded files

  render() {
    return (
            <UploaderUI
              allowMultiple
              formDataField={formDataField} // This is the field name in the formdata payload e.g file
              getResponseUrls={getResponseUrls}
              uploadUri={uri}
              uriConfig={uriConfig} // OPTIONAL:    In case of a protected api route
            />
          )
       }


}
```

## As a Hook

```jsx
import React, { Component } from 'react'

import { useRcfUploader } from 'files-uploader-rc'


class Example extends Component {
  const uri=`this-is-your-remote-server-url-for-the-upload`

   const [chosenFiles, setChosenFiles] = React.useState([])

   const maxNumOfFiles='max-number-of-files-you-want-to-allow-for-upload'

  const [
    uploading,
    completed,
    onRemoveFile,
    files,
    responseUrls
    ] = useRcfUploader(uri,formDataField,chosenFiles,maxNumOfFiles,uriConfig)

   console.log(responseUrls)


   // maxNumOfFiles is 5 by default but can be changed.
   // responseUrls is an array of all the urls of the uploaded files
   // uploading indicates uploading is still ongoing this can be used to know when to enable the submit  button
   // completed is when no ongoing uploads

}
```

### You can also pass your own custom component like below

```jsx
import React, { Component } from 'react'

import { UploaderUI } from 'files-uploader-rc'
import 'files-uploader-rc/dist/index.css'

class Example extends Component {
 const [returnUrls, setUrls] = React.useState([])

  const getResponseUrls = (returnUrls) => {
    setUrls(returnUrls)
  }

  const uri=`this-is-your-remote-server-url-for-the-upload`

  // uriConfig is OPTIONAL: In case of a protected api route
   const uriConfig = {
    headers: {
      'x-auth-token': `eyJp1zs`
    }
  }

  console.log(returnUrls) // this is an array of urls of all successfully uploaded files

  render() {
    return (
            <UploaderUI
              allowMultiple
              formDataField={formDataField} // This is the field name in the formdata payload e.g file
              getResponseUrls={getResponseUrls}
              uploadUri={uri}
              uriConfig={uriConfig} // OPTIONAL:    In case of a protected api route
            >
             <button>Upload files</button>
            </UploaderUI>
          )
       }


}
```

## Screenshot

![](https://res.cloudinary.com/oladapo/image/upload/v1616607800/test2-folder/jmgjcy9yulh3ggnmveb8.png)

## License
