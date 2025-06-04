import React, { useState } from "react";
import LinkInput from "./LinkInput";
import { useParams } from "react-router";
import { showLoader, hideLoader } from "~/utils/loader";    
import { BACKEND_URL } from "~/utils/env";
interface PopupFormProps {
  type:string,
  topics:any
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose,type,topics }) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [links, setLinks] = useState([]);
  const [files,setFiles] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic,setSelectedTopic] = useState<string>("0")
  const {id} = useParams()
   const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);


 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!title.trim()) {
    alert("Title is required.");
    return;
  }


  const formData = new FormData();
  formData.append('title', title);
  formData.append('instructions', instructions);
  formData.append('assignmentType', type);
  formData.append('classId', id || '');
  


  formData.append('links', JSON.stringify(links));
  

  if (files) {
    formData.append('files', files);
  }
  if(selectedTopic != "0"){
      console.log(selectedTopic)
      formData.append("TopicId",selectedTopic)
  }

  showLoader();

  fetch(`${BACKEND_URL}/createassignment`, {
    method: "POST",
    body: formData
  }).then(res => {
    res.json().then(data => {
      console.log(data);
      onClose();
    });
  }).catch(error => {
    console.error(error)
  }).finally(() => {
    hideLoader();
  });

};

   

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center flex-col">
     <div className="justify-between w-full flex border-b-2 pb-1 pt-2 bg-white p-5">
        <button
          onClick={onClose}
          className="  text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <button
        onClick={handleSubmit}
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>
      </div>
      <div className="bg-white w-full h-full p-5 overflow-auto relative rounded-none">
        {/* Close Button */}



        <h2 className="text-3xl font-semibold mb-6">Create New Submission</h2>
        <form  className="space-y-6" >
          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Instructions Input */}
          <div>
            <label className="block text-lg font-medium mb-2" >Instructions (optional)</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows={4}
            />
          </div>
          
          {/* Links Input */}

          {links.length > 0 && links.map((link, index) => (
              <div className="flex justify-between items-center">
                <p>{link}</p>
                <button type="button" onClick={() => setLinks(links.filter((_, i) => i !== index))}><i className="fas fa-trash"></i></button>
              </div>
            ))}

          <div className="border rounded border-gray-300 flex justify-center items-center text-3xl ">
  

          <div className="rounded-full border-2  border-gray-300  size-13 m-5 flex justify-center items-center ">
          <button onClick={openPopup} type="button"><i className="fab fa-youtube "></i></button>
          </div>
          <div className="rounded-full border-2 border-gray-300 size-13 m-5 flex justify-center items-center">
            <input type="file" name="fileInput" id="fileInput" className="absolute top-[-1000px] left-[-1000px]" multiple onChange={(e) => {setFiles(e.target.files?.[0])}}/>
          <label htmlFor="fileInput">
          
          <i className="fas fa-file"></i>
          </label>
          </div>
          <div className="rounded-full border-2 border-gray-300 size-13 m-5 flex justify-center items-center">
          <button type="button" onClick={openPopup} ><i className="fas fa-plus "></i></button>
          </div>

          </div>
          
          <label htmlFor="topics" className="mr-3">Selcet topic</label>
          <select name="topics" id="topics" className="border-2  border-gray-300 w-50 p-1" onChange={(e)=>{setSelectedTopic(e.target.value)}}>
            <option value={0}>select topic</option>
          {
                        topics && topics.map((topic:any,i:any) => (
                              <option value={topic.topicId}>{topic.topicName}</option>
                        ))
                     }
          </select>
          
        </form>
      </div>

        { isOpen && <LinkInput closePopup={closePopup} caption={"Enter url:"} get={setLinks} links={links}/>}
    </div>
  );
};


export default PopupForm;
