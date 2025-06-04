import React, { useEffect, useState } from 'react'
import ClassSideMenu from './ClassSideMenu'
import { Outlet, useNavigate, useOutletContext } from 'react-router'
import { showLoader } from '../../utils/loader'






interface ClassContainerProps {
  flag: boolean;
  setFlag: (flag: boolean) => void;
}


export default function ClassContainer() {


  const navigate = useNavigate();
  const { flag, setFlag } = useOutletContext<ClassContainerProps>();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClasses = async () => {
    const UID = localStorage.getItem('_id');
    if (!UID) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      setIsLoading(true);
      const URI = `http://localhost:3000/getclasses/${UID}`;
      const response = await fetch(URI, {
        method: "GET",
      });
      const data = await response.json();
      setClassData(data);
    } catch (error) {
      console.error('Error fetching class data:', error);
    } finally {
      
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [navigate, flag]);


  return (
    <div>
      <div className='flex'>
        <ClassSideMenu classData={classData} />
        {classData && <Outlet context={{ classData}} />}
      </div>
    </div>
  );
}
