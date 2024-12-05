'use client';
import {  toggleApproval } from "@/lib/users";
export const ApproveUserButton  = ({ email, isApproved }:{ email:string, isApproved:Boolean}) =>{
    return (

       <button
              onClick={()=>toggleApproval(email)}
       className="text-primary hover:text-teal-900"
       >
              {
                     isApproved ? 'Revoke' : 'Approve'
              }
       </button>

)
}