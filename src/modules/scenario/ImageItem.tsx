import { Icon, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'
import * as React from 'react'
import { useState } from 'react'

import { uploadImage } from '../../services/http'

interface ImageItemProps {
  input: any
  onChangeCompleted?: (id: string, props: any) => void
}

export const ImageItem = (props: ImageItemProps) => {
  const { input, onChangeCompleted } = props
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const beforeUpload = (file: RcFile) => {
    return true
    console.info(file)
  }
  const getBase64 = (img: File, callback: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      const { response = {} } = info.file
      const { url = '' } = response
      getBase64(info.file.originFileObj, (localUrl: string) => {
        setImageUrl(localUrl)
        setLoading(false)
        if (url && onChangeCompleted) {
          onChangeCompleted(input.id, {
            url,
          })
        }
      })
    }
  }

  const readFile = (file: File) => {
    const fileReader = new FileReader()
    return new Promise((resolve) => {
      fileReader.onload = (e: any) => {
        resolve(e.target.result)
      }
      fileReader.readAsDataURL(file)
    })
  }

  const upload = async (option: any) => {
    const { file, onProgress, onSuccess } = option
    const dataUrl = await readFile(file)

    const data = { name: file.name, mimetype: file.type, dataUrl }
    const result = await uploadImage(data, {
      headers: {
        'Content-Type': 'application/json',
      },
      onUploadProgress: (e: ProgressEvent) => {
        if (e.total > 0) {
          const percent = (e.loaded / e.total) * 100
          onProgress && onProgress({ ...e, percent }, file)
        }
      },
    }).then((response: any) => response.data.data)
    onSuccess && onSuccess({ ...result })
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/publicapi/v1/image/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={upload}
      style={{ width: 200 }}
    >
      {imageUrl ? <img style={{ width: '100%' }} src={imageUrl} alt="avatar" /> : uploadButton}
    </Upload>
  )
}
