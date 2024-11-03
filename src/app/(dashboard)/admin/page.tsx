import Announcement from '@/components/Announcement'
import AttendanceChart from '@/components/AttendanceChart'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'
import CountChart from '@/components/CountChart'
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendar from '@/components/EventCalendar'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'
import React from 'react'

const page = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* Left */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
      {/* User Card */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <UserCard type='admin'/>
        <UserCard type='student'/>
        <UserCard type='teacher'/>
        <UserCard type='parent'/>
      </div>
      {/* Middel Charts */}
      <div className='flex gap-4 flex-col lg:flex-row'>
{/* count chart */}
<div className='w-full lg:w-2/3 h-[450px]'>
<CountChartContainer/>
</div>
{/* attendance chart */}
<div className='w-full lg:w-2/3 h-[450px]'>
<AttendanceChartContainer/>
</div>
      </div>
      {/* Bottom chart*/}
      <div className='w-full h-[500px]'>
        <FinanceChart/>
      </div>
      </div>
      {/* right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <EventCalendarContainer searchParams={searchParams}/>
      <Announcement/>
      </div>
    </div>
  )
}

export default page