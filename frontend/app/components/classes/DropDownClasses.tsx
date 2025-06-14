import React, { useContext } from 'react'
import { Link } from 'react-router'
import AuthContext from '~/Contex/AuthenticationContext'

interface DropDownClassesProps{
  item:any
}

export default function DropDownClasses({item}:DropDownClassesProps) {
  const {setClassData}:any = useContext(AuthContext)
  return (
     <Link to={`${item.request === "pending" || item.request === "declined"? "/classes" : `/classes/${item.class_id._id}` }`} onClick={() =>{ setClassData(item)}}>
    <div className='mt-4 text-2xl bg-gray-200 p-2 rounded-xl flex  items-center w-60'>
        <div className='rounded-full  bg-green-800 text-white w-10 h-10 flex  justify-center items-center'>
            {item.class_id.C_Subject.charAt(0).toUpperCase()}
        </div>
        <p className='ml-4'>{item.class_id.C_Subject}</p>
    </div>
     </Link>
  )
}
