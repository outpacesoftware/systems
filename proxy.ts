import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	// Skip password protection if no password is set
	const sitePassword = process.env.SITE_PASSWORD;
	if (!sitePassword) {
		return NextResponse.next();
	}

	// Check if user is already authenticated
	const authCookie = request.cookies.get("site-auth");
	if (authCookie?.value === "authenticated") {
		return NextResponse.next();
	}

	// Allow access to the password page and API
	if (
		request.nextUrl.pathname === "/password" ||
		request.nextUrl.pathname === "/api/auth/verify"
	) {
		return NextResponse.next();
	}

	// Allow static assets and Next.js internals
	if (
		request.nextUrl.pathname.startsWith("/_next") ||
		request.nextUrl.pathname.startsWith("/fonts") ||
		request.nextUrl.pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// Redirect to password page
	return NextResponse.redirect(new URL("/password", request.url));
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
