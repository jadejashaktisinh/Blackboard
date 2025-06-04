import { useState,useEffect } from 'react'
import AddPeople from './AddPeople';
import { useOutletContext, useParams } from 'react-router'
import { showLoader, hideLoader } from '~/utils/loader';
import { BACKEND_URL } from '~/utils/env';






interface ClassContextType {
    selectedClass: any;
  }
export default function People() {

    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
    const [teacher,setTeacher] = useState<null | []>(null)
    const [student,setStudent] = useState<[]>([])
    const { selectedClass } =  useOutletContext<ClassContextType>()
    const [type,setType] = useState('')
    const {id} = useParams()
    useEffect(()=>{
        showLoader();
        fetch(`${BACKEND_URL}/getpeople/${id}`)
            .then(res => res.json())
            .then(data => {
              
               setTeacher(data.data.teacher)
               setStudent(data.data.student)
            })
            .catch(error => {
                console.error(error)
            }).finally(() => {
                hideLoader();
            });


    },[])
    return (
        <>

            <div className='flex items-center justify-center'>
                <div className='w-[80%] mt-5'>

                    <div className='flex justify-between'>
                        <p className='mb-3 text-3xl'>Teacher</p>
                      { selectedClass[0].role === 'teacher' && <button type="button" onClick={() =>{openPopup(), setType("teacher")}} className='text-2xl'><i className="fas fa-user-plus"></i></button>}

                    </div>
                    <hr />
                    <div className='w-[85%] mt-5'>


                        {teacher && teacher.map((item:any,i:any)=>  (
                            <div className='pl-5 pr-5  flex pt-1 pb-1 rounded-sm mb-5 items-center' key={i} >
                            <i className="fas fa-user text-2xl"></i>
                            <div className='ml-5'>
                                <p>{item.name}</p>
                            </div>
                        </div>
                        ))} 
                        

                       
                    </div>

                    <div className='flex justify-between'>
                        <p className='mb-3 text-3xl'>Student</p>
                       
                        { selectedClass[0].role === 'teacher'  && <button type="button" onClick={() =>{openPopup(), setType("student")}} className=' text-2xl'> <i className="fas fa-user-plus"></i></button>}

                    </div>
                    <hr />
                    <div className='w-[85%] mt-5'>
                    {student.length > 0 ? student.map((item:any,i:number)=>  ( 
                       
                            <div className='pl-5 pr-5  flex pt-1 pb-1 rounded-sm mb-5 items-center' key={i} >
                            <i className="fas fa-user text-2xl"></i>
                            <div className='ml-5'>
                                <p>{item.name}</p>
                                
                            </div>
                        </div> ) 
                        ) : (<h1> No students are here </h1>)} 

                        
                    </div>
                </div>

                {isOpen && <AddPeople closePopup={closePopup} type={type} />}

            </div>

        </>
    )
}
