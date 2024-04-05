import React from 'react'
import SidebarC from '../components/SidebarC'
import NavbarC from '../components/NavbarC'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import PieChart from '../components/PieChart'

const AnalyticDashboard = () => {
  return (
    <>
     <NavbarC/>
    <div className='flex'>
    <SidebarC/>
     <div className='grid justify-between grid-cols-2 ml-40 pl-20 '>
       <BarChart />
       <LineChart/>
       <PieChart/>
     </div>
    </div>
    </>
  )
}

export default AnalyticDashboard