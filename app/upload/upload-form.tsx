"use client"

import { Button } from "@/components/button"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"

export function UploadForm({
  action,
}: {
  action: (formdata: FormData) => Promise<void>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const resetRef = useRef<HTMLButtonElement>(null)

  const [images, setImages] = useState<File[]>([])

  const upload = useCallback(async () => {
    try {
      const formData = new FormData()

      for (const image of images) {
        formData.append(image.name, image)
      }

      const response = await action(formData)
    } catch (e) {
      console.error(e)
    }
  }, [action, images])

  const router = useRouter()

  return (
    <form className="mx-auto mt-12 flex max-w-3xl flex-col gap-6 rounded-3xl border bg-white px-6 py-12 shadow-2xl">
      <h1 className="text-2xl font-bold">Upload</h1>

      <ul>
        {images.map((image) => (
          <li key={image.name}>
            {image.name} ({image.size} bytes)
          </li>
        ))}
      </ul>

      <input
        required
        hidden
        placeholder="You can upload multiple files"
        name="files"
        ref={inputRef}
        type="file"
        onChange={(e) => setImages((images) => [...images, ...e.target.files])}
        accept="image/*"
      />
      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        ref={resetRef}
      >
        Ajouter
      </Button>
      <section className="flex gap-4">
        <Button type="reset" className="grow bg-red-600">
          Reset
        </Button>
        <Button
          className="grow self-center bg-indigo-600"
          onClick={() => {
            upload().then(() => {
              router.refresh()
            })
          }}
        >
          Upload
        </Button>
      </section>
    </form>
  )
}
