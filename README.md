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
  
  const [responseObj, setResponseObj] = React.useState([])

   const getResponseObj = (responseObj) => {
    setResponseObj(responseObj)
  }

  const uri=`this-is-your-remote-server-url-for-the-upload`

  // uriConfig is OPTIONAL: In case of a protected api route
   const uriConfig = {
    headers: {
      'x-auth-token': `your-authentication-token`
    }
  }

  console.log(returnUrls) // this is an array of urls of all successfully uploaded files

  render() {
    return (
            <UploaderUI
              allowMultiple
              formDataField={formDataField} 
              getResponseObj={getResponseObj}
              uploadUri={uri}
              uriConfig={uriConfig} // OPTIONAL:   
            />
          )
       }

// allowMultiple to allow multiple file upload default is false.
// formDataField is any name given to the field of formdata while calling thr append method e.g formdata.append(formDataField)
// getResponseObj accepts a callback to update the state of 'responseObj' in  const [responseObj, setResponseObj] = React.useStat([])
// uploadUri this is your remote server url for the upload
// uriConfig is OPTIONAL: In case of a protected api route as stated in the example above.

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

  const {
    uploading,
    completed,
    onRemoveFile,
    files,
    resObj
   } = useRcfUploader(uri,formDataField,chosenFiles,maxNumOfFiles,uriConfig)

   console.log(responseUrls)


   
   // resObj is an array of response of succesfully uploaded files from the server.
   // uploading indicates uploading is still ongoing this can be used to know when to enable the submit  button
   // completed is when no ongoing uploads
   // uri this is your remote server url for the upload
   // chosenFiles is the initial state of file selected its always an empty array before any file selection.
   // same as value of chosenFiles with some extra property.
   // formDataField is any name given to the field of formdata while calling the append method e.g formdata.append(formDataField)
   // maxNumOfFiles is 5 by default but can be changed.
   // uriConfig is OPTIONAL: In case of a protected api route as stated in the example above.

}
```

### You can also pass your own custom component like below

```jsx
import React, { Component } from 'react'

import { UploaderUI } from 'files-uploader-rc'
import 'files-uploader-rc/dist/index.css'

class Example extends Component {

  const [responseObj, setResponseObj] = React.useState([])

   const getResponseObj = (responseObj) => {
    setResponseObj(responseObj)
  }

  const uri=`this-is-your-remote-server-url-for-the-upload`

  // uriConfig is OPTIONAL: In case of a protected api route
   const uriConfig = {
    headers: {
      'x-auth-token': `your-authentication-token`
    }
  }

  console.log(returnUrls) // this is an array of urls of all successfully uploaded files

  render() {
    return (
            <UploaderUI
              allowMultiple
              formDataField={formDataField} 
              getResponseObj={getResponseObj}
              uploadUri={uri}
              uriConfig={uriConfig} // OPTIONAL:    In case of a protected api route
            >
             <button>Upload files</button>
            </UploaderUI>
          )
       }


// allowMultiple to allow multiple file upload default is false.
// formDataField is any name given to the field of formdata while calling thr append method e.g formdata.append(formDataField)
// getResponseObj accepts a callback to update the state of 'responseObj' in  const [responseObj, setResponseObj] = React.useStat([])
// uploadUri this is your remote server url for the upload
// uriConfig is OPTIONAL: In case of a protected api route as stated in the example above.



}
```

## Screenshot

![](https://res.cloudinary.com/oladapo/image/upload/v1616607800/test2-folder/jmgjcy9yulh3ggnmveb8.png)

## License
