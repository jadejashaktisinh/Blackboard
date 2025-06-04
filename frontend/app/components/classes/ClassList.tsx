import React, { useContext } from 'react'
import { Link } from 'react-router'
import { showLoader, hideLoader } from '../../utils/loader'
import { BACKEND_URL } from '~/utils/env';
import AuthContext from '~/Contex/AuthenticationContext';
interface ClassListProps {
  item: any
}

export default function ClassList({ item }: ClassListProps) {

  const {setClassData}:any = useContext(AuthContext)

  console.log(item)
  function allowInvite(e: React.MouseEvent){
    e.preventDefault(); // Prevent the Link component from navigating
    
    showLoader();
    fetch(`${BACKEND_URL}/allow-invite`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        classId: item.class_id._id,
        userId: localStorage.getItem('_id')
      })
    }).then(res => {
      res.json().then(data => {
        if(data.success) {
          // Reload the page to reflect the changes
          window.location.reload();
        } else {
          alert(data.message);
        }
      });
    }).catch(error => {
      console.error(error);
      alert("Something went wrong");
    }).finally(() => {
      hideLoader();
    });
  }

  function declineInvite(e: React.MouseEvent){
    e.preventDefault(); // Prevent the Link component from navigating
    
    showLoader();
    fetch(`${BACKEND_URL}/decline-invite`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        classId: item.class_id._id,
        userId: localStorage.getItem('_id')
      })
    }).then(res => {
      res.json().then(data => {
        if(data.success) {
          // Reload the page to reflect the changes
          window.location.reload();
        } else {
          alert(data.message);
        }
      });
    }).catch(error => {
      console.error(error);
      alert("Something went wrong");
    }).finally(() => {
      hideLoader();
    });
  }

  return (
    <Link to={`${item.request === "pending" || item.request === "declined"? "/classes" : `/classes/${item.class_id._id}` }`} onClick={() => setClassData(item)}>
      <div className='h-fit w-full '>
        
        <div className='bg-green-800  flex justify-between items-center text-white rounded-t-lg p-2'>
          <div>
            <p className='text-4xl'>{item.class_id.C_Name}</p>
            <p className='text-lg'>{item.class_id.C_Subject}</p>
          </div>

          {item.request === "pending" && <div className='flex'>
            <button 
              type="button" 
              className='bg-gray-400 p-1 border-0 text-xl rounded-md hover:bg-gray-500' 
              onClick={allowInvite}
            >
              accept
            </button>
            <button 
              type="button" 
              className='bg-red-600 p-1 border-0 ml-3 text-xl rounded-md hover:bg-red-700' 
              onClick={declineInvite}
            >
              decline
            </button>
          </div>}
        </div>

        <div className='border-l border-b border-r h-30 hidden sm:block'>
        </div>
        <div className='p-2 flex justify-end border-l border-b border-r rounded-b-lg text-2xl'>
          <button 
            onClick={() => window.location.href = `/classes/${item.class_id._id}/classwork`}
            className="cursor-pointer"
          >
            <i className="fas fa-folder"></i>
          </button>
        </div>
      </div>
    </Link>
  )
}

