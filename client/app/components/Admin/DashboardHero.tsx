/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidget from './Widgets/DashboardWidget'

type Props = {
  isDashboard?:boolean
}

const DashboardHero = ({isDashboard}: Props) => {
  const [open,setOpen] = useState(false)
  return (
    <div>
        <DashboardHeader open={open} setOpen={setOpen} />
        {isDashboard && (
          <DashboardWidget open={open}/>
        )}
    </div>
  )
}

export default DashboardHero