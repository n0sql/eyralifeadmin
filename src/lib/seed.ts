import {pool} from './db';
import { add_semaglutide_odt_order_sql } from './sql_queries';
import { SemaglutideOrder } from "../types/optimalscript";
const old_semaglutide_data = `SELECT * FROM semaglutide_orders`;
import { insert_semaglutide_odt_data } from './data';

//export const add_semaglutide_order_sql = `INSERT INTO semaglutide_orders (internal_id, agent_id, submission, status) VALUES (?, ?, ?, ?)`;
// export const add_semaglutide_odt_order_sql = `INSERT INTO semaglutide_odt_orders (internal_id, agent_id, transaction_details, payment_info, profile_info, status) VALUES (?, ?, ?, ?, ?, ?)`;


// this is how they look, i need to fetch the data from the old table transform it to semaglutide_odt_order and insert it into the semaglutide_odt_order table which is already created
//  and insert it into the new table maintaining the timestamp


export async function seed_semaglutide_odt_orders(){
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.execute<SemaglutideOrder[]>({sql: old_semaglutide_data, rowsAsArray: true});
         rows.map(async (row: any, index:number) => {
            let result_a = {
                internal_id: row[0],
                agent_id: row[1],
                transaction_details: row[2].transaction_details,
                payment_info: row[2].payment_info,
                profile_info: {signature: row[2].signature, ...row[2].profile_info},
                status: row[3],
                created_at: row[4]
            };
            await insert_semaglutide_odt_data(result_a);
        });
    }   
    catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.toString() : 'An error occurred');
    } finally {
        pool.releaseConnection(conn);
    }
}