import React, { useState } from 'react'
import { useParams } from 'react-router';
import { showLoader, hideLoader } from '~/utils/loader';        
import { BACKEND_URL } from '~/utils/env';
export default function CreateTopic(props:any) {
    const [inputValue, setInputValue] = useState('');

    const {id} = useParams()

    const handleSubmit = () => {
        showLoader();
            fetch(`${BACKEND_URL}/createtopic`,{
            method:"POST",
            headers:{
              "Content-type": "application/json"
          },
          body:JSON.stringify({T_name:inputValue,classId:id})
          }).then(res =>{
             res.json().then(data =>{
             
              console.log(data);
              
             })
          }).catch(error => {
            console.error(error)
        }).finally(() => {
            hideLoader();
        });
        setInputValue('');
        props.closePopup();
    };
    return (

        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
            <div className="bg-gray-200 p-6 rounded-xl shadow-xl w-80">
                <h3 className="text-lg font-semibold mb-4">{props.caption}</h3>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                        onClick={props.closePopup}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )

}
