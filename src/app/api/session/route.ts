
import { validateSessionToken } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
    const token = req.cookies.get('session')?.value ?? null;
    console.log(token, "token from api")
    if(token === null){
        return  NextResponse.json({error: 'No session token found'}, {status: 401});
    };

    const {session, user} = await validateSessionToken(token);

    if(session === null){
        return NextResponse.json({error: 'Invalid session token'}, {status: 401});
    };

    return NextResponse.json({session, user});
   
}