import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import CardWrapper from '@/components/Admin/cards';
import { CardsSkeleton, LatestEntrysSkeleton } from '@/components/Admin/admin-skeletons';
import LatestEntrys from '@/components/Admin/latest-entries';
import LatestOnboarding from '@/components/Admin/latest-dashboard';
import { getCurrentSession } from '@/lib/session';


async function AdminPageComponent() {
  return( 
    <main>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
    <Suspense fallback={<CardsSkeleton />}>
      <CardWrapper />
    </Suspense>
  </div>
  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
    <Suspense fallback={<LatestEntrysSkeleton />}>
      <LatestEntrys />
    </Suspense>
    <Suspense fallback={<LatestEntrysSkeleton />}>
      <LatestOnboarding />
    </Suspense>
  </div>
    </main>
  );
};

async function AdminPage() {
  const session = await getCurrentSession();
  if(session?.session){
    return AdminPageComponent();
  }
  return redirect('/signin');
};

export default AdminPage;