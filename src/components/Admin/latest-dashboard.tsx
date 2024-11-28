import { ArrowPathIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import {  get_latest_semaglutide_order} from '@/lib/data';

export default async function LatestOnboarding() {
  const latestEntries = await get_latest_semaglutide_order();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={` mb-4 text-xl md:text-2xl md:text-left text-center`}>
        Latest Semaglutide Orders
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestEntries.map((order, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                    <UserCircleIcon className="h-5 w-5 text-gray-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                    {order.agent_id}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {new Date(order.created_at).toISOString().replace('.000Z','')}
                    </p>
                  </div>
                </div>
                <p
                  className={` truncate text-sm font-medium md:text-base`}
                >
                  {order.status}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}