import React, { useEffect, useState } from 'react'
import ClassDetailsNav from './ClassDetailsNav'
import { Outlet, useOutletContext, useParams } from 'react-router'



interface ClassContextType {
  classData: [];
}

export default function ClassDetails() {

  const { classData } =  useOutletContext<ClassContextType>()
  const {id} = useParams()
  console.log(classData);

  const selectedClass = classData.filter((item:any)=>{
        return item.class_id._id == id
  })


  return (
    <div className='w-full'> 
    
      <ClassDetailsNav />
      <Outlet context={{selectedClass}}/>
    </div>
  )
}
