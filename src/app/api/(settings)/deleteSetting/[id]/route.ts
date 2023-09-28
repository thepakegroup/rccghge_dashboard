import { baseUrl} from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const cookie = req.cookies.get('token')

    const res = await fetch(`${baseUrl}setting/${params.id}`,{
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      }
    })

    const data = await res.json()

    return NextResponse.json(data)

  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}