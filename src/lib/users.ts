"use server";
import {pool} from './db';
import { new_user_session_table,
    new_user_table_sql,
    add_user,
 } from './sql_queries';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';
import { create_contact_table, TableCount } from './data';
import { create_user_session_table } from './session';

export interface User extends RowDataPacket{
    id: number;
    username: string;
    email: string;
    password: string;
    isApproved: boolean;
    role: string;
    agent_id?: number;
    created_at: string;
}


export async function create_user_table(){
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.execute(new_user_table_sql);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};


export async function create_user(user: Omit<User, 'id' | 'created_at' | 'constructor'>){
    const conn = await pool.getConnection();
    try {
        const data =[user.email, user.username, user.password, user.isApproved, user.role, user?.agent_id || null];
        const [rows, fields] = await conn.execute<User[]>(add_user, data);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};


export async function change_password(email: string, password: string){
    const conn = await pool.getConnection();
    try {
        await conn.execute('UPDATE user SET password = ? WHERE email = ?', [password, email]);
        revalidatePath('/users');
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};
export async function get_user_by_id(id:number){
    const conn = await pool.getConnection();
    try {
        const [users] = await conn.query<User[]>(`SELECT * FROM user WHERE id = ?`, [id]);
        const user = users.find(user => user.id === id);
        return user;

    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function get_user_by_username(username: string){
    const conn = await pool.getConnection();
    try {
        const [users] = await conn.query<User[]>(`SELECT * FROM user WHERE username = ?`, [username]);
        const user = users.find(user => user.username === username);
        return user;

    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function get_user_by_email(email:string){
    await create_user_table();
    await create_user_session_table();
    await create_contact_table();
    const conn = await pool.getConnection();
    try {
        const [users] = await conn.query<User[]>(`SELECT * FROM user WHERE email = ?`, [email]);
        const user = users.find(user => user.email === email);
        return user;

    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

const ITEMS_PER_PAGE = 6;
export async function get_filtered_users(query: string, currentPage: number){
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const conn = await pool.getConnection();
    const usersQuery = `SELECT username, email, isApproved, role, agent_id, created_at
                    FROM user 
                    WHERE username LIKE ? OR email LIKE ? OR role LIKE ? 
                    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const usersQueryData = [`%${query}%`, `%${query}%`, `%${query}%`];
    try {
        const [users] = await conn.query<User[]>(usersQuery, usersQueryData);
        return users;

    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function delete_user(email: string){
    const conn = await pool.getConnection();
    try {
        // we need to delete the session
        await conn.execute('DELETE FROM user WHERE email = ?', [email]);
        revalidatePath('/users');
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};


export async function get_user_count(){
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.execute<TableCount[]>('SELECT COUNT(*) as count FROM user');
        return rows[0].count;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
  
};

export async function toggleApproval(email:string): Promise<void>{
    const conn = await pool.getConnection();
    try {
        // we need to set the opposite of what is currently 
        const [user] = await conn.query<User[]>('SELECT * FROM user WHERE email = ?',[email])
        if(!user || user.length === 0)
        {
            return;
        }
        const approved = user[0].isApproved ? 0 : 1;
        await conn.execute('UPDATE user SET isApproved = ? WHERE email = ?', [approved, email]);
        revalidatePath('/users');
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
}

