import { baseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get('token')

    const res = await fetch(`${baseUrl}writeups`,{
      method: 'GET',
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