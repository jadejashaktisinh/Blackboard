import React from 'react'
import { Link, useParams } from 'react-router'




export default function ClassDetailsNav() {

  const {id} = useParams()
  return (
    <div className=' p-5 border-b'>
        <ul className='flex gap-10	'>

              <Link to={`/classes/${id}`}><li>Stream</li></Link>
            <Link to={`/classes/${id}/classwork`}><li>Classwork</li></Link>
            <Link to={`/classes/${id}/people`}><li>People</li></Link>
         
        </ul>
    </div>
  )
}
