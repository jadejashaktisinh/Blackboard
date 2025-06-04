import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
  
})
export default AuthContext


 export function AuthenticationContext({children}:any) {


  const [name,setName] = useState('')
  const [isLogedIn,setIsLogedIn] = useState(false)



  useEffect(()=>{


    if(localStorage.getItem('_id')){
      setIsLogedIn(true)
      fetch(`http://localhost:3000/getuser/${localStorage.getItem('_id')}`,{
        method:"GET"
      }).then(res =>{
        res.json().then(data =>{

          setName(data.name)
        })
      })
    }

  },[])
  return (
    <AuthContext.Provider value={{name,setName,isLogedIn,setIsLogedIn}}>
        {children}
    </AuthContext.Provider>
  )
}