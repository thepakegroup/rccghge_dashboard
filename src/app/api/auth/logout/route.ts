import { adminBaseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) { 
  const cookie = req.cookies.get('token')
  try {
    const res = await fetch(`${adminBaseUrl}logout`,{
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      }
    })

    const data = await res.json()

    const response = new NextResponse(data)
    response.cookies.delete('token')
    response.cookies.delete('email')
    response.cookies.delete('access')
    
    return response
  } catch (error) {
    
  }
}