'use client';
import {  approveUser } from "@/lib/users";
export const ApproveUserButton  = ({ email, isApproved }:{ email:string, isApproved:Boolean}) =>{
    return (

       <button
              onClick={()=>approveUser(email)}
       className="text-primary hover:text-teal-900"
       >
              {
                     isApproved ? 'Revoke' : 'Approve'
              }
       </button>

)
}