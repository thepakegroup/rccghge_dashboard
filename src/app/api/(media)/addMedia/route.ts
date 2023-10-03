import { baseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) { 
  const formData = await req.formData()
  const cookie = req.cookies.get('token')

  // console.log(formData)

  try {
    const res = await fetch(`${baseUrl}upload-media`,{
      method: 'POST',
      headers: {
        'content-Type': `multipart/form-data`,
        'Authorization': `Bearer ${cookie?.value}`
      },
      body:formData
    })

    const data = await res.json()

    console.log(data)

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
  }
}