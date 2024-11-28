import { Suspense } from 'react';
import Search from '@/components/DoctorsTable/Search';
import TableSkeleton from '@/components/DoctorsTable/TableSkeleton';
import DoctorsTable from '@/components/DoctorsTable';
import Pagination from '@/components/Pagination';
import { get_message_count } from '@/lib/data';
import AdminPageComponent from '@/components/Admin';
import {DownloadXLSFile} from '@/components/DownloadXls';
import { getCurrentSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

async function ContactResponseComponent({query, page}: {query: string; page: number}) {
  const currentPage = Number(page) || 1;
  const total_rows = await get_message_count();
  const totalPages = Math.ceil(total_rows / 6);

  return( <div className=''>
  <AdminPageComponent/>
  <div className="relative mb-6">
    <Search placeholder='search table'/>
    </div>
    <div className='mb-3' >
      <DownloadXLSFile export_type='learn_more_form'/>
      </div>
    <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
    
    <DoctorsTable query={query} currentPage={currentPage}/>
    </Suspense>
   <div className="pt-6"> <Pagination totalPages={totalPages}/></div>
  </div>);
};

async function ContactPage(props: {searchParams?: Promise<{query?: string; page?: string;}>;}) {
  const session = await getCurrentSession();
  if(!session?.session){
    return redirect('/signin');
  }
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
   return (
    <ContactResponseComponent query={query} page={currentPage}/>
   );
}

export default ContactPage;