import { cache } from 'react'
import 'server-only';
import {pool} from './db';
import {add_user_session, new_user_session_table, validate_session_query } from './sql_queries';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { create_user_table, User } from './users';
import {cookies} from 'next/headers'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { RowDataPacket } from 'mysql2';

export interface Session{
    id: string;
    user_id: number;
    expires_at: Date;
};
export interface DbSession extends RowDataPacket{
    id: string;
    user_id: number;
    expires_at: string;
}
export type SessionUser = Omit<User, 'id' | 'password' | 'created_at' | 'constructor'>

export type SessionValidationResult =
	| { session: Session; user: SessionUser}
	| { session: null; user: null };

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
};

export async function create_user_session_table(){
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.execute(new_user_session_table);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
	const cookieStore = cookies();
	cookieStore.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		path: "/"
	});
};
export function deleteSessionTokenCookie(){
    const cookieStore = cookies();
	cookieStore.set("session", '', {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0,
		path: "/"
	});
}
export async function createSession(user_id:number): Promise<Session> {
    const token = generateSessionToken();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const conn = await pool.getConnection();
    try {
        const data = {
            id: sessionId,
            user_id,
            expires_at: new Date(Date.now() + 1000 * 60 * 60 * 7)
        } as Session;

        await conn.execute(add_user_session,[data.id, data.user_id, data.expires_at]);
        setSessionTokenCookie(token, data.expires_at);
        return data
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function getSession(sessionId: string): Promise<SessionValidationResult> {
    const _session = {session:null, user:null} as SessionValidationResult;
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<any[]>(validate_session_query,[sessionId]);
        if((!rows) || rows.length === 0){
            return _session;
        };
        _session.session = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            expires_at: new Date(rows[0].expires_at)
    }
    _session.user = {
        username: rows[0].username,
        email: rows[0].email,
        isApproved: rows[0].isApproved,
        role: rows[0].role,
        agent_id: rows[0]?.agent_id
    } as SessionUser;
    return _session;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function validateSessionToken(token:string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const _session = await getSession(sessionId);

    if(!_session.session){
       return {session: null, user: null}
    }
    if (Date.now() >= new Date(_session.session.expires_at).getTime()){
        try {
            await deleteSession();
        } catch (error) {
            console.error(error);
        }
        return {session: null, user: null}
    }
    return _session;
};

export async function deleteSession(token?: string | null ): Promise<void> {
    
    if (!token) {
        const cookieStore = cookies();
        token = cookieStore.get('session')?.value ?? null;
    }
    if(token === null){
        return;
    }
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const conn = await pool.getConnection();
    try {
        await conn.execute('DELETE FROM user_session WHERE id = ?', [sessionId]);
        deleteSessionTokenCookie();
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};



export const getCurrentSession = cache(async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value ?? null;
    if( token === null ){
    return {session: null, user: null}
    }
    const {session, user} = await validateSessionToken(token);
    return {session, user};
});

