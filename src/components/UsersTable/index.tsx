import {  get_filtered_users, } from "@/lib/users";
import { DeleteTableEntryButton } from "./DeleteButton";
import { ApproveUserButton } from "./ApproveUser";

const usersTable = async({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) => {
        const users = await get_filtered_users(query, currentPage);
    return(
   <div className="flex flex-col">
<div className="overflow-x-auto shadow-md sm:rounded-lg">
    <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Approval
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            role
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            agent id
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            registered date
                        </th>
                       
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Delete
                        </th>
                      
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                
                    {
                            users.map((user:any)=>{
                                 return (<tr key={user.email} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</td> 
                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.email}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">       
                                    <ApproveUserButton email={user.email} isApproved={user.isApproved} />
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.role}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user?.agent_id || "N/A"}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(user.created_at).toISOString().replace('.000Z','').replace('T',' ')}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                        <DeleteTableEntryButton email={user.email} />
                                    </td>
                                    </tr>)
                            })
                       }
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
    )
};

export default usersTable