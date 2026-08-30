import { adminBaseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("token");
  try {
    const res = await fetch(`${adminBaseUrl}logout`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${cookie?.value ?? ""}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    const response = NextResponse.json(data, { status: res.status });
    response.cookies.delete("token");
    response.cookies.delete("email");
    response.cookies.delete("access");

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Logout service unavailable" },
      { status: 502 },
    );
  }
}
