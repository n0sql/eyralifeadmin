import {
    UserGroupIcon,
  } from '@heroicons/react/24/outline';
  import { get_message_count, get_semaglutide_order_count } from '@/lib/data';



  export default async function CardWrapper() {

    const total_rows = await get_message_count();
    
    const totalRows_onboarding = await get_semaglutide_order_count();

    return(
       <>
        <Card title="Contact Form Responses" value={total_rows} />
        <Card title="Semaglutode Orders" value={totalRows_onboarding} />
       </>
    )
  }










  export function Card({
    title,
    value,
  }: {
    title: string;
    value: number | string;
  }) {
    const Icon = UserGroupIcon;
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }