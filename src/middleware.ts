// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest): Promise<NextResponse> {

	
	if (request.method === "GET") {
		return NextResponse.next({
			headers: request.headers,
		});
	}

	const originHeader = request.headers.get("origin");
	console.log(originHeader, "originHeader")
	// NOTE: You may need to use `X-Forwarded-Host` instead
	// console.log(request.headers.get("cookie"))
	const hostHeader = request.headers.get("x-forwarded-host");
	const hostproto = request.headers.get("x-forwarded-proto");
	 
	if (originHeader === null || hostHeader === null) {
		return new NextResponse(null, {
			status: 403
		});
	}
	let origin: URL;
	try {
		origin = new URL(originHeader);
		console.log(origin, origin?.host, "when origin is not null")
	} catch {
		return new NextResponse(null, {
			status: 403
		});
	}
	console.log("after: ", originHeader, hostHeader)
	if ( origin.host !== hostHeader) {
		console.log("origin.host !== hostHeader")
		return new NextResponse(null, {
			status: 403
		});
	}
	return NextResponse.next();
};

// export const config = {
// 	matcher: ['/api/(.*)', '/orders', '/learnmore', '/users'],
//   }