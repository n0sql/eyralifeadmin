import Search from '@/components/DoctorsTable/Search';
import { Suspense } from 'react';
import Pagination from '@/components/Pagination';
import UsersTable from '@/components/UsersTable';
import TableSkeleton from '@/components/DoctorsTable/TableSkeleton';
import SectionTitle from '@/components/Common/SectionTitle';
import { get_user_count } from '@/lib/users';
import {DownloadXLSFile} from '@/components/DownloadXls';
import { getCurrentSession } from '../actions/auth';
import { redirect } from 'next/navigation';


async function UsersPageComponent({query, page}: {query: string; page: number}){
    const currentPage = page;
    const total_rows = await get_user_count();
    const totalPages = Math.ceil(total_rows / 6);

    return(
        <div className=''>
            <SectionTitle
      title="Users"
      paragraph="Registered users"
      mb='12px'
      />
            <div className="relative mb-6"><Search placeholder='search table'/></div>
            <div className='mb-3' >
      <DownloadXLSFile export_type='user'/>
      </div>
            <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
            <UsersTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="pt-6"><Pagination totalPages={totalPages}/></div>
        </div>
    )
};


async function UsersPage(props: {searchParams?: Promise<{query?: string; page?: string;}>;}) {
    const session = await getCurrentSession();
    if(!session?.session){
      return redirect('/signin');
    };
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    return (
      <UsersPageComponent query={query} page={currentPage}/>
    )
};

export default UsersPage;