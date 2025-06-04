import { useContext, useState } from 'react';
import AuthContext from '~/Contex/AuthenticationContext';
import { showLoader, hideLoader } from '~/utils/loader';
import { useOutletContext } from 'react-router';

interface CreateClassProps {
    flag: boolean;
    setFlag: (flag: boolean) => void;
    closePopup: () => void;
}

export default function CreateClass({ closePopup, setFlag, flag  }: CreateClassProps) {
    const {name}:any = useContext(AuthContext)
    const [inputValues, setInputValues] = useState({
        C_Name:'',
        C_Subject:'',
        C_Section:'',
    });

    const handleSubmit = () => {
        showLoader();
        fetch('http://localhost:3000/create',{
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify({
                ...inputValues,
                C_Creator:name,
                CID:localStorage.getItem('_id')
            })
        }).then(res => {
            res.json().then(async (data) => {
                if (data.success) {
                   
                    setFlag(!flag);
                    closePopup();
                }
            });
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            hideLoader();
        });
        
        setInputValues({
            C_Name:'',
            C_Subject:'',
            C_Section:'',
        });
    };
    return (

        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
            <div className="bg-gray-200 p-6 rounded-xl shadow-xl w-80">
                <h3 className="text-lg font-semibold mb-4">Create Class</h3>

                <label>Name</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type here..."
                    value={inputValues.C_Name}

                    onChange={(e) => setInputValues({C_Name: e.target.value ,C_Subject:inputValues.C_Subject,C_Section:inputValues.C_Section})}
                    autoFocus
                />
                                <label>Subject</label>
                 <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type here..."
                    value={inputValues.C_Subject}
                    onChange={(e) => setInputValues({C_Name: inputValues.C_Name ,C_Subject:e.target.value,C_Section:inputValues.C_Section})}
                    
                />
                <label>section</label>
                 <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type here..."
                    value={inputValues.C_Section}
                    onChange={(e) => setInputValues({C_Name: inputValues.C_Name ,C_Subject:inputValues.C_Subject,C_Section:e.target.value})}
                    
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                        onClick={closePopup}
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
