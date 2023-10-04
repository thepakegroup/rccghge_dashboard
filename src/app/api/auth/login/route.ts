import { adminBaseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) { 
  const body = await req.json()

  try {
    const res = await fetch(`${adminBaseUrl}login`,{
      method: 'POST',
      headers: {
          'content-Type': 'application/json',
      },
      body:JSON.stringify(body)
    })

    const data = await res.json()

    const response = NextResponse.json({error:data.error,email:data.email,access:data.access});
  
    response.cookies.set({
        name: "token",
        value: data.token.token,
        maxAge: 60*60*24,
        // httpOnly: true,
        sameSite: "strict",
    })

    response.cookies.set({
        name: "email",
        value: data.email,
        maxAge: 60*60*24,
        // httpOnly: true,
        sameSite: "strict",
    })

    response.cookies.set({
        name: "access",
        value: data.access,
        maxAge: 60*60*24,
        // httpOnly: true,
        sameSite: "strict",
    })
    
    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json({message:"An error occur", status:"error"},{status:500})
  }
}