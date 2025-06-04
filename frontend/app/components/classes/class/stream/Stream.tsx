import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router';
import StreamList from './StreamList';
import { BACKEND_URL } from '~/utils/env';

interface ClassContextType {
  selectedClass: any;
}
export default function Stream() {
  const { selectedClass } = useOutletContext<ClassContextType>()

  const [StreamAssignments, setStreamAssignments] = useState<[]>([])
  const {id} = useParams()
  useEffect(() => {

    fetch(`${BACKEND_URL}/getstreamassignmnets/${id}`, {
      method: "GET"
    }).then(res => {
      res.json().then(data => {
        console.log(data)
        setStreamAssignments(data.StreamAssignments)

        })
      })
    }, [])

    return (
      <div className='w-full flex flex-col items-center mt-10'>
        <div className='w-[85%]  h-65 bg-amber-950 p-5 rounded-lg' >
          <p className="text-white text-3xl mb-1">{selectedClass[0].class_id.C_Name}</p>
          <p className='text-xl text-white'>{selectedClass[0].class_id.C_Subject}</p>
        </div>

        <div className='w-[85%] mt-10'>

          {
            StreamAssignments && StreamAssignments.map((item:any) => (
                  <StreamList name={item.title} date={item.postedAt} type={item.assignmentType} files={item.attachments.files}/>
            ))
          }


        

        
        </div>
      </div>

    )
}
