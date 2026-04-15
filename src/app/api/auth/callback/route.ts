import { type NextRequest, NextResponse } from "next/server";

import { makeServerClient } from "@/lib/server/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await makeServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(
        new URL("/dashboard/account", requestUrl.origin),
      );
    }
  }

  return NextResponse.redirect(new URL("/auth?error=oauth", requestUrl.origin));
}
