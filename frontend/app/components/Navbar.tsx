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
    const {name,isLogedIn}:any = useContext(AuthContext)

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
                <nav className='flex justify-between m-2'>
                    <div className='flex ml-2'>
                        <button onClick={set} className='text-2xl'>
                            <i className="fas fa-bars"></i>
                        </button>
                        <p className='ml-10 text-3xl'>BLACKBOARD</p>
                    </div>
                    {
                        isLogedIn ? (<div className='flex gap-10 justify-center items-center '>
                            <button type="button" onClick={openPopup}><i className="fas fa-plus text-2xl "></i></button>
                            {isCreateClassOpen && <CreateClass closePopup={closePopup} setFlag={setFlag} flag={flag} />}
                            <div className=' mr-10 rounded-full bg-green-800 text-white w-10 h-10 flex  justify-center items-center'>
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
