import Announcement from '@/components/Announcement'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import EventCalendar from '@/components/EventCalendar'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

  const page = async({
    searchParams,
  }: {
    searchParams: { [keys: string]: string | undefined };
  }) => {
  const{userId}=await auth()
  return (
    <div  className='p-4 flex gap-4 flex-col xl:flex-row'>
      <div className='w-full xl:w-2/3'>
      <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
        </div>
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <EventCalendarContainer searchParams={searchParams}/>
      <Announcement/>
      </div>
    </div>
  )
}

export default page