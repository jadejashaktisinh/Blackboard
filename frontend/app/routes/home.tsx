import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function Home() {

  const navigate = useNavigate()
  useEffect(()=>{

      console.log(localStorage.getItem('_id'))
      if(localStorage.getItem('_id')){
          navigate('/classes')
      }else{
        navigate('/login')
      }
  })
}
