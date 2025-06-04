import React, { useContext, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import DropDownClasses from './DropDownClasses';
import { IsOpen } from '~/Contex/IsOpen';
import { Link } from 'react-router';
import AuthContext from '~/Contex/AuthenticationContext';

interface ClassSideMenuProps{     
  classData:any
}

export default function ClassSideMenu({classData}:ClassSideMenuProps) {
   
    const {setClassData}:any = useContext(AuthContext)

    let isOpen = useContext(IsOpen)
    console.log(isOpen);
    

  return (

    <div className={`${isOpen ? "w-96" : "w-0"} `}>


    <div className={` h-[100vh]  fixed w-72  z-50 overflow-auto`}>
  
      
      <div
        className={`   top-10 left-0 h-full w-full transform ${
          isOpen ? "translate-x-0 " : "-translate-x-full fixed"
        } transition-transform duration-300 ease-in-out p-5 shadow-lg  :`}
      >
       
      
        <ul className="space-y-4 text-xl">
          <li><i className="fa-solid fa-house"></i>
          <Link to={"/classes"} onClick={() => setClassData(null)}>Home</Link>
          </li>
           
               </ul>
           <div className="relative inline-block text-left">

        
      <button className="flex items-center mt-5 text-xl transition"
      >
        classes 
      </button>
      
        <div className=" mt-2 w-48">

          {classData && classData.map((item:any)=>{
            return(
              <DropDownClasses key={item._id} item={item}/>
            )
          })}
              
        </div>
  
    </div>
           

      </div>
          </div>
          </div>
   
  )
}
