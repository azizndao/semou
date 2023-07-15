import { UploadForm } from "@/app/upload/upload-form"
import prisma from "@/lib/prisma"
import { STORAGE_NAME } from "@/lib/utils"
import { existsSync, mkdir, writeFile } from "fs"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"

async function uploadFileAction(formData: FormData) {
  "use server"

  if (!existsSync(STORAGE_NAME)) {
    mkdir(STORAGE_NAME, (e) => {
      if (e) {
        console.log(e)
      }
    })
  }

  for (const key of Array.from(formData.keys())) {
    const value = formData.get(key) as File

    const buffer = await value.arrayBuffer()

    const filename = `${uuidv4()}-${value.name}`

    writeFile(`${STORAGE_NAME}/${filename}`, Buffer.from(buffer), console.error)

    await prisma.image.create({
      data: {
        name: value.name,
        url: `http://localhost:3000/images/${filename}`,
      },
    })
  }
}

export default async function UploadPage() {
  const images = await prisma.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="min-h-screen ">
      <UploadForm action={uploadFileAction} />

      <ul className="mx-auto mt-12 grid max-w-7xl grid-cols-[repeat(auto-fill,_300px)] gap-6">
        {images.map((image) => (
          <li
            className="flex w-full flex-col gap-2 overflow-hidden"
            key={image.id}
          >
            <Image
              src={image.url}
              alt={image.name}
              height={512}
              width={512}
              className="aspect-square w-full  rounded-xl bg-slate-200 object-cover"
            />
            <h6 className="text-clip font-medium">{image.name}</h6>
            <small>{image.createdAt.toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
