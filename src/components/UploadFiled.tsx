"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import Dropzone, { FileRejection } from "react-dropzone"
import { useToast } from "./ui/use-toast"
import { Download, DownloadIcon, Image as ImageIcon } from "lucide-react"

type Props = {
  className?: string
  error?: string
  images2: any
  setImages2: (images2: any[]) => void
  handleDelete2: (index: number) => void
}

export const UploadField = ({ className, handleDelete2, images2, setImages2, error }: Props) => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState(false)
  const isPending = false

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, JPEG or video/MP4 instead.",
      variant: "destructive",
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    setImages2(acceptedFiles)
    setIsDragOver(false)
    toast({
      title: "Success",
      description: `Uploaded ${acceptedFiles.length} file${acceptedFiles.length > 1 ? "s" : ""}`,
    })
  }

  return (
    <div
      className={cn(
        "relative mt-16 flex min-h-52 w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-xl px-2 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-200/25",
        isDragOver && "bg-blue-100 ring-blue-500 hover:bg-blue-100",
        className
      )}
    >
      <Dropzone
        onDropRejected={onDropRejected}
        onDropAccepted={onDropAccepted}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
        }}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragOver ? (
              <Download className="mb-2 h-7 w-7 text-text-sub" />
            ) : isPending ? (
              <DownloadIcon className="mb-2 h-6 w-6 animate-spin text-text-sub" />
            ) : (
              <ImageIcon className="mb-2 h-6 w-6 text-text-sub" />
            )}
            <div className="mb-2 flex flex-col justify-center">
              {isPending ? (
                <div className="flex flex-col items-center">
                  <p>Please wait...</p>
                </div>
              ) : isDragOver ? (
                <p>
                  <span className="font-semibold">Drop file</span> to upload
                </p>
              ) : (
                <p>
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
              )}
            </div>

            {!isPending && <p>PNG, JPG, JPEG or video/MP4</p>}
          </div>
        )}
      </Dropzone>
    </div>
  )
}
