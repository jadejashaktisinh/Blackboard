import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "~/Contex/AuthenticationContext";
import { BACKEND_URL } from "~/utils/env";
export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setName,setIsLogedIn}:any = useContext(AuthContext)

  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:''
  })
  const navigation =  useNavigate();
   function handleSubmit(e:any){
    e.preventDefault();
    fetch(`${BACKEND_URL}/signup`,{
      method:"POST",
      headers:{
          "Content-type": "application/json"
      },
      body:JSON.stringify(formData)
    }).then((res) =>{
         res.json().then(data =>{
              if(data.success){
                setName(data.name)
                setIsLogedIn(true)
                localStorage.setItem('_id',data._id)
                navigation('/classes')
              }else{
                alert(data.message)
              }
         })
    })
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-gray-700">Firstname</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter firstname"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData,firstName:e.target.value})}
              required
            />
          </div><div>
            <label className="block text-gray-700">Lastname</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lastname"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData,lastName:e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData,email:e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData,password:e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600" onClick={()=>{navigation('/login')}}>
          Alredy have an acoount ? <span className="text-blue-500">Login</span>
        </p>
      </div>
    </div>
  );
};

