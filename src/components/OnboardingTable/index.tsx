
import { get_filtered_semaglutide_order } from "@/lib/data";

const OnBoardingTable = async({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) => {
        const doctors = await get_filtered_semaglutide_order(query, currentPage);
        
    return(
   <div className="flex flex-col">
<div className="overflow-x-auto shadow-md sm:rounded-lg">
    <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                
                        {
                            doctors[0] && Object.keys(doctors[0]).map((key:any)=>{
                                return <th scope="col" key={key} className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    {key}
                                </th>
                            }
                            )
                        }
                      
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                
                    {
                            doctors.map((doctor:any, index: number)=>{
                                 return (<tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    
                                    {
                                        Object.keys(doctor).map((key:any)=>{
                                            if (key === 'submission'){
                                                delete doctor[key]
                                            }
                                            if (key === 'signature'){
                                                return <td key={key} className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                    <img src={decodeURIComponent(doctor['signature'])} alt="signature" className="h-10 w-20"/>
                                                </td>}
                                                else if(key === 'date_of_birth' || key === 'created_at'){
                                                    return <td key={key} className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                        {new Date(doctor[key as keyof typeof doctor]).toISOString().replace('.000Z','')}
                                                    </td>
                                                } else{
                                                    return <td key={key} className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{doctor[key as keyof typeof doctor]}</td>
                                                }
                                        })
                                    }
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

export default OnBoardingTable;




// agent_id: string;
//     first_name: string;
//     last_name: string;
//     clinic_name: string;
//     address: string;
//     phone: string;
//     email: string;
//     practice_business_name: string;
//     doctor_type: string;
//     client_code: string;
//     master_client?: string;
//     supervising_physician_name?: string;
//     supervising_physician_npi?: string;
//     supervising_physician_dea?: string;
//     date_of_birth: string;
//     drivers_license: string;
//     npi_no: string;
//     dea_no: string;
//     states_licensed_in: string;
//     sub_domain?: string;
//     signature: string;