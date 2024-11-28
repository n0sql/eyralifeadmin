'use client';
import { delete_user } from "@/lib/users";
export const DeleteTableEntryButton  = ({ email }:{ email:string}) =>{
    return (

       <button
              onClick={()=>delete_user(email)}
       className="text-red-600 hover:text-red-900"
       >
           Delete
       </button>

)
}