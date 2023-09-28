import { adminBaseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) { 
  try {
    const res = await fetch(`${adminBaseUrl}logout`)
    const data = await res.json()

    console.log(data)

    const response = new NextResponse(data)
    response.cookies.delete('token')
    
    return response
  } catch (error) {
    
  }
}