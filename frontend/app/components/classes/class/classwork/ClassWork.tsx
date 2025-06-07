import React, { useEffect, useState } from 'react'
import PopupForm from './PopUPForm';
import LinkInput from './LinkInput';
import Topics from './Topics';
import Assignment from './Assignment';
import { useOutletContext, useParams } from 'react-router';
import CreateTopic from './CreateTopic';
import { showLoader, hideLoader } from '~/utils/loader';
import { BACKEND_URL } from '~/utils/env';
interface ClassContextType {
    selectedClass: any;
  }
export default function ClassWork() {

    const [isDropdownOPen, setIsDropdownOPen] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
   

    const [allAssignment,setAllAssignment] = useState<[] | null>(null)
    const [topicAssignment,setTopicAssignment] = useState<[] | null>(null)

    const { selectedClass } =  useOutletContext<ClassContextType>()

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
    const [type,setType] = useState('')
    const {id} = useParams()

    const refreshAssignments = () => {
        showLoader();
        fetch(`${BACKEND_URL}/getassignmnets/${id}`,{
            method:"GET"
        }).then(res =>{
            res.json().then(data =>{
                console.log(data)
                setAllAssignment(data.allAssignments)
                setTopicAssignment(data.topicsWithAssignments)
            })
        }).catch(error => {
            console.error(error)
        }).finally(() => {
            hideLoader();
        });
    }

    useEffect(()=>{
        refreshAssignments()
    },[id])

    return (
        <>

            <div className='flex items-center justify-center'>


                <div className='w-[80%]'>
                   {selectedClass[0].role === 'teacher' && <button className='mt-4 bg-sky-500 text-2xl text-white p-3 rounded-2xl' onClick={() => { setIsDropdownOPen(!isDropdownOPen) }}>+ Create</button>}

                    {isDropdownOPen && <div className='dropdown  bg-amber-50 w-50 mt-1 shadow-[0px_0px_6px_10px_rgba(0,_0,_0,_0.1)] absolute  pt-4'>

                        <div className=' pl-5 pr-5 text-sm flex pt-1 pb-1 rounded-sm mb-5 items-center' onClick={() => {setShowPopup(true),setType("assignment")}}  style={{ cursor: "pointer" }}>
                            {/* <img src="" alt="" className='size-8 rounded-full border-4' /> */}
                            <i className="fas fa-clipboard-list text-2xl"></i>
                            <div className='ml-5'>
                                <p >Assignments</p>
                            </div>
                        </div>
                        <div className=' pl-5 pr-5  flex pt-1 pb-1 rounded-sm mb-5 items-center' onClick={() => {setShowPopup(true),setType("quiz")}} style={{ cursor: "pointer" }}>
                            {/* <img src="" alt="" className='size-8 rounded-full border-4' /> */}
                            <i className="fas fa-question text-2xl" ></i>
                            <div className='ml-5'>
                                <p>Quiz</p>
                            </div>
                        </div>
                        <div className=' pl-5 pr-5  flex pt-1 pb-1 rounded-sm mb-5 items-center' onClick={() => {setShowPopup(true),setType("material")}} style={{ cursor: "pointer" }}>
                            {/* <img src="" alt="" className='size-8 rounded-full border-4' /> */}
                            <i className="fas fa-book text-2xl"></i>
                            <div className='ml-5'>
                                <p>Material</p>
                            </div>
                        </div>
                        <div className=' pl-5 pr-5  flex pt-1 pb-1 rounded-sm mb-5 items-center' onClick={openPopup} style={{ cursor: "pointer" }}>
                            {/* <img src="" alt="" className='size-8 rounded-full border-4' /> */}
                            <i className="fas fa-list text-2xl"></i>
                            <div className='ml-5'>
                                <p>Topic</p>
                            </div>
                        </div>

                        {isOpen && <CreateTopic closePopup={closePopup} caption={"Enter topic name:"} />}

                    </div>}


                    {showPopup && <PopupForm onClose={() => {
                        setShowPopup(false)
                        refreshAssignments()
                    }} type={type} topics={topicAssignment} />}

                    <div className='w-[85%] mt-10'>

                       {((allAssignment && allAssignment.length === 0) && (topicAssignment && topicAssignment.length === 0)) ? (<p>nothing to see here</p>) : ('')}
                       {
                        allAssignment && [...allAssignment].reverse().map((assignment:any,i:any) => (
                                <Assignment name={assignment.title} date={assignment.postedAt} type = {assignment.assignmentType} files={assignment.attachments.files}/>
                        
                          
                        ))
                     }

                        
                        {
                        topicAssignment && topicAssignment.map((topic:any,i:any) => (
                            <>
                            <Topics name={topic.topicName}/>
                            
                           {
                             [...topic.assignments].reverse().map((assignment:any,i:any) => (
                                <Assignment name={assignment.title} date={assignment.postedAt} type = {assignment.assignmentType} files={assignment.attachments.files}/>
                              
                            ))
                           }
                            </>
                          
                        ))
                     }


                        
                    </div>
                </div>
            </div>

        </>
    )
}
