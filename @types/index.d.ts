declare module 'files-uploader-rc' {
  // Define the props for the hook
  interface UseRcfUploaderProps {
    uri: string
    inputFieldName: string
    selectedFiles: Record<string, any>[]
    maxNumOfFiles?: number
    uriConfig?: Record<string, any>
    forTest?: boolean
  }

  // Define the result type for the hook
  interface UseRcfUploaderResult {
    uploading: boolean
    completed: boolean
    onRemoveFile: (file: any) => void
    files: Record<string, any>[]
    resObj: Record<string, any>
  }

  // Declare the useRcfUploader hook
  export function useRcfUploader(
    props: UseRcfUploaderProps
  ): UseRcfUploaderResult
}
