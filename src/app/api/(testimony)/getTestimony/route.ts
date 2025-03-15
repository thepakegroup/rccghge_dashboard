// import { baseUrl } from "@/util/constants";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const cookie = req.cookies.get("token");

//     const res = await fetch(`${baseUrl}testimonies/{sort}/{page}`, {
//       method: "GET",
//       headers: {
//         "content-Type": "application/json",
//         Authorization: `Bearer ${cookie?.value}`,
//       },
//     });

//     const data = await res.json();

//     return NextResponse.json(data);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(error);
//   }
// }

import { baseUrl } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

//
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

//
export async function GET(req: NextRequest) {
  try {
    // Extract sort and page parameters from the URL
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "";
    const page = searchParams.get("page") || "1";

    // Get auth token from cookies
    const cookie = req.cookies.get("token");
    if (!cookie?.value) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const res = await fetch(`${baseUrl}testimonies/${sort}/${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.value}`,
      },
    });

    // Handle non-OK responses
    if (!res.ok) {
      return NextResponse.json(
        { error: `API responded with status: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonies" },
      { status: 500 }
    );
  }
}
