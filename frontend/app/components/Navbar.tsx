import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router'
import { IsOpen } from '~/Contex/IsOpen';
import CreateClass from './CreateClass';
import AuthContext from '~/Contex/AuthenticationContext';

interface NavbarProps {
    flag: boolean;
    set: () => void;
    setFlag: (flag: boolean) => void;
}

export default function Navbar({ set, setFlag, flag }: NavbarProps) {
    const {name,isLogedIn,classData}:any = useContext(AuthContext)

    const location = useLocation();
    const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
    const openPopup = () => setIsCreateClassOpen(true);
    const closePopup = () => setIsCreateClassOpen(false);

    if (location.pathname == "/Login" || location.pathname == "/signup") {
        return null
    }

    let isOpen = useContext(IsOpen)
    
    return (
        <div className='h-15'>
            <div className='border-b fixed top-0 left-0 right-0 z-50 bg-white '>
                <nav className='flex justify-between m-2 items-center'>
                    <div className='flex ml-2'>
                        <button onClick={set} className='sm:text-2xl text-xl '>
                            <i className="fas fa-bars"></i>
                        </button>
                       <div className='flex items-center'>
                       <p className='sm:ml-10  ml-1 text-xl sm:text-3xl'>BLACKBOARD</p>
                        {classData && classData.class_id && (
                            <div className='flex items-center ml-2 sm:ml-10'>
                                <i className="fas fa-chevron-right text-sm sm:text-2xl"></i>
                                <p className='sm:ml-10 ml-3 text-xl sm:text-3xl'> {classData.class_id.C_Name}</p>
                            </div>
                        )}
                       </div>
                    </div>
                    {
                        isLogedIn ? (<div className='flex sm:gap-10 gap-2 justify-center items-center '>
                            <button type="button" onClick={openPopup}><i className="fas fa-plus text-md sm:text-2xl "></i></button>
                            {isCreateClassOpen && <CreateClass closePopup={closePopup} setFlag={setFlag} flag={flag} />}
                            <div className=' sm:mr-10 mr-4 rounded-full bg-green-800 text-white sm:w-10 sm:h-10 h-7 w-7 flex  justify-center items-center'>
                                {name.charAt(0)}
                            </div>
                        </div>) : (
                            <div className='flex gap-10'>
                                <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                                    Login
                                </button>
                                <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                                    signup
                                </button>
                            </div>
                        )
                    }
                </nav>
            </div>
        </div>
    )
}
