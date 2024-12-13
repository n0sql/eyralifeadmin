import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const exportTypeToTable = {
    'contact_form': 'messages',
    // 'semaglutide_orders': 'semaglutide_orders',
    'user': 'user',
};


export async function GET(req: Request, {params}:{ params: { export_type: string } }) {
    const { export_type } = params;
    console.log(export_type)
    const table = exportTypeToTable[export_type as keyof typeof exportTypeToTable];
    if (!table) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    const [rows]  = await pool.query<any[]>(`SELECT * FROM ${table}`);
    const headers = Object.keys(rows[0]).filter(key => key !== 'signature').join('\t');
    const xls_data = rows.map(row => Object.values(row).filter((_, i) => i !== Object.keys(row).indexOf('signature')).join('\t')).join('\n');
    const data = `${headers}\n${xls_data}`;
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    return new Response(blob);
}

