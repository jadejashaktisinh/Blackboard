import React from 'react'



export default function Topics({name}:{name:''}) {
  return (
    <div className='mb-5'>
         <div className='flex justify-between'>
                        <p className='mb-3 text-3xl'>{name}</p>

                    </div>
                    <hr />
    </div>
  )
}
