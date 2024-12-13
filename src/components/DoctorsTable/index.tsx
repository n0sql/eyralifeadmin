
import { get_filtered_messages} from "@/lib/data";
import { DeleteTableEntryButton } from "./DeleteButton";
import ContactFormMessage from "./MessageDetails";
const DoctorsTable = async({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) => {
        const _messages = await get_filtered_messages(query, currentPage);
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
                            phone
                        </th>
                       
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            date
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            view
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Delete
                        </th>
                      
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                
                    {
                            _messages.map((_message:any)=>{
                                 return (<tr key={_message.email} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{_message.name}</td> 
                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{_message.email}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{_message.phone}</td>
                                   
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(_message.created_at).toISOString().replace('.000Z','').split('T').join(' ')}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                        <ContactFormMessage data={_message}/>
                                    </td>

                                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">

                                        <DeleteTableEntryButton email={_message.email} />
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

export default DoctorsTable