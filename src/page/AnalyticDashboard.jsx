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
     <SidebarC/>
     <div className='grid justify-between grid-cols-2'>
       <BarChart/>
       <LineChart/>
       <PieChart/>
     </div>
    </>
  )
}

export default AnalyticDashboard