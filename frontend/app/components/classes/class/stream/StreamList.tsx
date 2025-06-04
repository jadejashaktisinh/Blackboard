import React, { useState } from 'react'


interface assignment{
    name:String
    type:String
    date:any  
    files:any
}
export default function StreamList({name,type,date,files}:assignment) {

  const [isOpen, setIsOpen] = useState(false);
    let _date = new Date(date)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className='mb-5  hover:bg-gray-200  transition '>
    <div className={`${isOpen ? "border-1 border-b-0 rounded-0" : "border-1"}  pl-5 pr-5 text-sm flex pt-1 pb-1       items-center justify-between`} onClick={() => setIsOpen(!isOpen)}>

        <div className='text-sm flex rounded-sm  items-center'>


            {
                type === "assignment" ? <i className="fas fa-clipboard-list text-3xl"></i> : type === "quiz" ? <i className="fas fa-question text-3xl" ></i> : <i className="fas fa-book text-3xl"></i>
            }


            <div className='ml-5'>
                <p >{name}</p>
                <p>{months[_date.getMonth()] + " " + _date.getDate()}</p>
            </div>
        </div>

        <svg
            className={`w-4 h-4 text-gray-600   transform transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"
                }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>


    </div>
    {isOpen && (
        <div className="border-t-0 border-1 px-3 py-2 text-sm text-gray-700 bg-white pt-7 ">

            {
                files && files.map((item: any, i: any) => (

                    <a href={item.cloudinary_url} target="_blank" rel="noopener noreferrer" className='text-blue-600'>

                        <div className='group border-1 flex mb-3'>
                            <div className='w-32 h-24 border-r-1 flex justify-center items-center' style={{backgroundImage: `url(${item.cloudinary_url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                            {
                                    item.contentType.split("/")[1] === "pdf" && (
                                        <iframe 
                                            src={`${item.cloudinary_url}#page=1&toolbar=0&navpanes=0&scrollbar=0`}  
                                            width="100%" 
                                            height="100%" 
                                            style={{
                                                pointerEvents: 'none', 
                                                scrollbarWidth: 'none',
                                                overflow: 'hidden'
                                            }}  
                                        ></iframe>
                                    )
                                }
                               
                                {
                                    item.contentType.split("/")[1] === "image" && (
                                        <img src={item.cloudinary_url} alt={item.filename} />
                                    )
                                }
                                {
                                    item.contentType.split("/")[0] === "video" && (
                                       <p>video</p>
                                    )
                                }
                            </div>

                            <div className='p-2'>
                                <p className='text-3xl   group-hover:text-blue-600'>{item.filename.slice(0, 20)} {item.filename.length > 20 ? "..." : ""}</p>
                                <p className='text-2xl'>{item.contentType.split("/")[1]}</p>
                            </div>
                        </div>
                    </a>

                ))
            }


        </div>
    )}
</div>



)
}
