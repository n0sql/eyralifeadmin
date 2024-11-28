import { ArrowPathIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { get_latest_messages } from '@/lib/data';

export default async function LatestEntries() {
  const latestEntries = await get_latest_messages();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={` mb-4 text-xl md:text-2xl md:text-left text-center`}>
        Latest Contact Form Responses
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestEntries.map((doctor, i) => {
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
                      {doctor.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {doctor.email}
                    </p>
                  </div>
                </div>
                <p
                  className={` truncate text-sm font-medium md:text-base`}
                >
                  {doctor.phone}
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