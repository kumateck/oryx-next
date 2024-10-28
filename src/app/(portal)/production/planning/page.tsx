import { ClientDatatable } from '@/app/shared/client-datatable'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full'>
        <div className='py-2'>
            <span className='text-3xl font-bold text-secondary-500'>Planning</span>
        </div>
        
        <ClientDatatable />
    </div>
  )
}

export default Page