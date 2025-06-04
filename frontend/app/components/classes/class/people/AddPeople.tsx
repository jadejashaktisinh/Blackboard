import { useState } from 'react';
import { useParams } from 'react-router';
import { showLoader, hideLoader } from '../../../../utils/loader';

export default function AddPeople(props:any) {
    const [inputValue, setInputValue] = useState('');
    const {id} = useParams();

    const handleSubmit = () => {
        showLoader();
        fetch("http://localhost:3000/addparticipent",{
          method:"PUT",
          headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify({email:inputValue,classId:id,role:props.type})
        }).then(res =>{
           res.json().then(data =>{
            if(data.success) {
                setInputValue('');
                props.closePopup();
                window.location.reload();
            } else {
                alert(data.message);
            }
           })
        }).catch(error => {
            console.error(error);
            alert("Something went wrong");
        }).finally(() => {
            hideLoader();
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Enter Email:</h3>
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
    );
}
