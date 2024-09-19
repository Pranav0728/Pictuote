import QuoteAll from '@/components/quotes/QuoteAll'
import Header from '@/components/Sidebar'
import React from 'react'

function page() {
  return (
    <>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className='block'>
        <Header />      
        </div>
      <div className="flex-1 p-4">
        <QuoteAll />
      </div>
    </div>
    </>
  )
}

export default page