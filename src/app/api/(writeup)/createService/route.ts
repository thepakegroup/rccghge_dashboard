import { baseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) { 
  const body = await req.json()
  const cookie = req.cookies.get('token')

  try {
    const res = await fetch(`${baseUrl}create-service-time`,{
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      },
      body:JSON.stringify(body)
    })

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
  }
}