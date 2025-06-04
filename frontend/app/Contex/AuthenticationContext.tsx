import React, { createContext, useEffect, useState } from 'react'
import { BACKEND_URL } from '~/utils/env';

const AuthContext = createContext({
  
})
export default AuthContext


 export function AuthenticationContext({children}:any) {


  const [name,setName] = useState('')
  const [isLogedIn,setIsLogedIn] = useState(false)
  const [classData,setClassData] = useState({})


  useEffect(()=>{


    if(localStorage.getItem('_id')){
      setIsLogedIn(true)
      fetch(`${BACKEND_URL}/getuser/${localStorage.getItem('_id')}`,{
        method:"GET"
      }).then(res =>{
        res.json().then(data =>{

          setName(data.name)
        })
      })
    }

  },[])
  return (
    <AuthContext.Provider value={{name,setName,isLogedIn,setIsLogedIn,classData,setClassData}}>
        {children}
    </AuthContext.Provider>
  )
}