"use server";
import { pool } from "./db";
import { revalidatePath } from "next/cache";
import { RowDataPacket } from "mysql2";
import { SemaglutideOrder,_Message } from "../types/optimalscript";
import { new_messages_table_sql } from "./sql_queries";
// const customer_data = {agent_id:agent_id, status: 'failed', submission:{signature: signature, transaction_details: null, payment_info: null, profile_info: null}};
// message = {name: name, email: email, phone: phone, message: message};




const ITEMS_PER_PAGE = 6;
const message_sql = `SELECT * FROM messages ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE}`;
const semaglutide_sql = `SELECT * FROM semaglutide_orders ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE}`;

export async function create_contact_table (){
    const conn = await pool.getConnection();
    try {
       const [rows, fields] = await conn.execute(new_messages_table_sql);
       return rows
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};
export async function get_latest_semaglutide_order(){
    const conn = await pool.getConnection();
    try {
       
        const [rows, fields] = await conn.execute<SemaglutideOrder[]>({sql: semaglutide_sql, rowsAsArray: true,});
        const result_array = rows.map((row: any, index:number) => {
            const row_data = {} as SemaglutideOrder;
            fields.forEach((field, index) => {
                row_data[field.name] = row[index]
            });
            return row_data;
        });
        return result_array;
    } catch (error) {
        console.error(error)
        throw new Error('Error fetching data from semaglutide_orders table');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function get_latest_messages(){
    await create_contact_table();
    const conn = await pool.getConnection();
    try {
      
        const [rows, fields] = await conn.execute<_Message[]>({sql: message_sql, rowsAsArray: true,});
        const result_array = rows.map((row: any, index:number) => {
            const row_data = {} as any;
            fields.forEach((field, index) => {
                row_data[field.name] = row[index]
            });
            return row_data;
        });
        return result_array;
    } catch (error) {
        console.error(error)
        throw new Error('Error fetching data from messages table');
    } finally {
        pool.releaseConnection(conn);
    }
};



export async function get_filtered_semaglutide_order(query:string,currentPage: number,){
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const conn = await pool.getConnection();
    const sql = `SELECT * FROM semaglutide_orders
            WHERE internal_id LIKE ? OR agent_id LIKE ? OR status LIKE ? OR JSON_SEARCH(@submission, 'all', ?)
            ORDER BY created_at DESC
            LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
            `;
    const data =[`${`%${query}%`}`, `${`%${query}%`}`, `${`%${query}%`}`, `${`%${query}%`}`];
    try {
        const [rows, fields] = await conn.execute<SemaglutideOrder[]>({sql, values: data, rowsAsArray: true, });
        const result_array = rows.map((row: any, index:number) => {
            const row_data = {} as SemaglutideOrder;
            fields.forEach((field:any, index:number) => {
                    row_data[field.name] = row[index]
                
            });
            return row_data;
        });
        return result_array;
    } catch (error) {
        console.error(error)
        throw new Error('Error fetching data from semaglutide_orders table',);
    } finally {
        pool.releaseConnection(conn);
    }

};
export async function get_filtered_messages(query:string,currentPage: number,){
    await create_contact_table();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const conn = await pool.getConnection();
    const sql = `SELECT * FROM messages 
             WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?
             ORDER BY created_at DESC
             LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const data = Array(4).fill(`${`%${query}%`}`);
    try {
        const [rows, fields] = await conn.execute<_Message[]>({sql, values: data, rowsAsArray: true, });
        const result_array = rows.map((row: any, index:number) => {
            const row_data = {} as _Message;
            fields.forEach((field, index) => {
                row_data[field.name] = row[index]
            });
            return row_data;
        });
        return result_array;
    } catch (error) {
        console.error(error)
        throw new Error('Error fetching data from messages table',);
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function delete_message(email: string){
    const conn = await pool.getConnection();
    try {
        await conn.execute(`DELETE FROM messages WHERE email = ?`, [email]);
        revalidatePath('/contact');
        return;
    } catch (error) {
        console.error(error)
        throw new Error('Error deleting data from messages table',);
    } finally {
        pool.releaseConnection(conn);
    }
};
export async function delete_semaglutide_order(internal_id: string){
    const conn = await pool.getConnection();
    try {
        await conn.execute(`DELETE FROM semaglutide_orders WHERE internal_id = ?`, [internal_id]);
        revalidatePath('/orders');
        return;
    } catch (error) {
        console.error(error)
        throw new Error('Error deleting data from semaglutide_orders table',);
    } finally {
        pool.releaseConnection(conn);
    }
};


export interface TableCount extends RowDataPacket{
    count: number;
}

export async function get_message_count(){
    await create_contact_table();
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.execute<TableCount[]>(`SELECT COUNT(*) as count FROM messages`);
        return rows[0].count
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};

export async function get_semaglutide_order_count(){
    await create_contact_table();
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.execute<TableCount[]>(`SELECT COUNT(*) as count FROM semaglutide_orders`);
        return rows[0].count
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
};



