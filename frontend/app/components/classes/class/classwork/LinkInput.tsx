import { useState } from 'react';
export default function (props:any) {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        props.get([...props.links, inputValue]);
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
