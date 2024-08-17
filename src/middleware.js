import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/signin" || path === "/signup";
    const isProtectedPath = path === "/checkout";

    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/contact", "/cart", "/checkout", "/signin", "/signup"],
};
