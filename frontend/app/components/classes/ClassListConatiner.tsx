import React from 'react'
import ClassList from './ClassList'
import { useOutletContext } from 'react-router'

interface ClassContextType {
  classData: [];
}

export default function ClassListConatiner() {
  const { classData } =  useOutletContext<ClassContextType>()

  console.log(classData);

  return (
    <div className='flex w-full p-3 lg:p-8 '>
      <div className='inline-flex justify-start flex-wrap gap-6  p-2  max-w-max '>
      { classData && classData.map((item:any, i:any) => (
          <div key={i} className="w-96 sm:w-72 ">
            <ClassList item={item}/>
          </div>
        ))}
    </div>
    </div>
  )
}
