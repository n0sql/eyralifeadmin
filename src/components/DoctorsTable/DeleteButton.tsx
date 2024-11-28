
'use client';

import { delete_message } from "@/lib/data";
export const DeleteTableEntryButton  = ({ email}:{ email:string}) =>{
    return (

       <button
              onClick={()=>delete_message(email)}
       className="text-red-600 hover:text-red-900"
       >
           Delete
       </button>

)
}