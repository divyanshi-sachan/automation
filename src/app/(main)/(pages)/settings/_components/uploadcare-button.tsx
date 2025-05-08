'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      toast.success(file);
      console.log(file);
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef.current?.addEventListener('file-upload-success', handleUpload)
  }, [])

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="08c184ae53398f2dd613"
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />

    </div>
  )
}

export default UploadCareButton


