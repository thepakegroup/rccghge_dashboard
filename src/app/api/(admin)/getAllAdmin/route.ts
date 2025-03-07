import { baseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies
    const cookie = req.cookies.get("token");

    // Check if the token exists
    if (!cookie?.value) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Fetch data from the external API
    const res = await fetch(`${baseUrl}admins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.value}`,
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!res.ok) {
      const errorResponse = await res.text();
      // Return a consistent error response
      return NextResponse.json(
        { error: "Failed to fetch data", details: errorResponse },
        { status: res.status }
      );
    }

    // Parse the response as JSON
    const data = await res.json();

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    // Return a consistent error response
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
