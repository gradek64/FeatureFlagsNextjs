// app/api/proxy/route.ts

import { NextRequest, NextResponse } from "next/server";

//server api calls
import { fetchConfig } from "@/actions/fetchFlagsData";

export async function GET() {
  try {
    const features = await fetchConfig();
    // Next.js requires returning new Response with json
    return new Response(JSON.stringify(features), { status: 200 });
  } catch (error) {
    console.error("Error in fetchConfigProxy:", error);
    return new Response("Error fetching config", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const apiUrl = "https://api.example.com/data";
  const requestBody = await req.json();

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during proxy call:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
