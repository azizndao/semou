import { Response } from "next/dist/compiled/@edge-runtime/primitives"
import { readFileSync } from "fs"
import { STORAGE_NAME } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log(params)
  const filePath = `${STORAGE_NAME}/${params.path.join("/")}`
  const data = readFileSync(filePath)
  return new NextResponse(data, { status: 200 })
}
