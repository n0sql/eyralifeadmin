import Search from '@/components/DoctorsTable/Search';
import { Suspense } from 'react';
import TableSkeleton from '@/components/DoctorsTable/TableSkeleton';
import OnBoardingTable from '@/components/OnboardingTable';
import Pagination from '@/components/Pagination';
import {  get_semaglutide_order_count } from '@/lib/data';
import SectionTitle from '@/components/Common/SectionTitle';
import {DownloadXLSFile} from '@/components/DownloadXls';
import { getCurrentSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';


async function OrdersPageComponent({query, page}: {query: string; page: number}){
  const currentPage = Number(page) || 1;
  const total_rows = await get_semaglutide_order_count();
  const totalPages = Math.ceil(total_rows / 6);

    return(
        <div className=''>
            <SectionTitle
      title="OnBoarding Form"
      paragraph="Doctors who have completed the onboarding process"
      mb='12px'
      />
     
            <div className="relative mb-6"><Search placeholder='search table'/></div>
            <div className='mb-3' >
      <DownloadXLSFile export_type='onboarding_form'/>
      </div>
            <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
            <OnBoardingTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="pt-6"><Pagination totalPages={totalPages}/></div>
        </div>
    )
};

async function OrdersPage(props: {searchParams?: Promise<{query?: string; page?: string;}>;}) {
    const session = await getCurrentSession();
    if(!session?.session){
      return redirect('/signin');
      
    }
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
      <OrdersPageComponent query={query} page={currentPage}/>
    )
  };

export default OrdersPage;