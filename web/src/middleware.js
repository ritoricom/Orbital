import { NextResponse } from "next/server";

import { isNonNullable } from "@/utils/equals";

const CITY_KEY = "city";

export const config = {
  matcher: ["/", "/obn/:path*", "/spb/:path*", "/nvz/:path*"],
};

export const middleware = (request) => {
  switch (true) {
    // handle root and redirect, if exist saved choose city
    case request.nextUrl.pathname === "/": {
      const city = request.cookies.get(CITY_KEY);

      if (isNonNullable(city)) {
        // redirect to main city page
        return NextResponse.redirect(new URL(`/${city}`, request.url));
      } else {
        return NextResponse.next();
      }
    }
    // handle choose city
    case request.nextUrl.pathname.startsWith("/obn"):
    case request.nextUrl.pathname.startsWith("/nvz"):
    case request.nextUrl.pathname.startsWith("/spb"): {
      const response = NextResponse.next();
      const isPrefetch = request.headers.get("purpose") === "prefetch";
      if (isPrefetch) {
        return response;
      }

      const city = request.nextUrl.pathname.split("/")[1];

      response.cookies.set(CITY_KEY, city);

      return response;
    }
    default:
      return NextResponse.next();
  }
};
