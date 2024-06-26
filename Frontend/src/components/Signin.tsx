import { Link } from "react-router-dom"
import { Signin} from "@spearhead08/common";
import { useState } from "react";
import { Inputlabel } from "./Register";
import ApiClient from "../../config/Api";

const Login = () => {
    const [inputData,SetInputData] = useState<Signin>({
        email:"",
        password:""
    })

   
    const handleSubmit = async() =>{
       try {
         const res= await ApiClient.post("/api/v1/user/signin",inputData);
            console.log(res.data.jwt);
            localStorage.setItem("token",res.data.jwt);
       } catch (error) {
        
       }
    }
  return <div className="flex justify-center items-center">
    <div className="w-1/2 gap-2">
    <h1 className="text-3xl text-center">Welcome Back</h1>

    <p className="text-md text-center"> New to Platform ! <Link to={"/signup"} className="underline text-grey-200">Signup</Link></p>
        <Inputlabel label="Email" type="text" placeHolder="Email" onChange={(c)=>{ SetInputData({...inputData,email:c.target.value})}}/>
        <Inputlabel label="Password" type="password" placeHolder="password" onChange={(c)=>{  SetInputData({...inputData,password:c.target.value})} }/>
        <button className="bg-blue-500 mt-4 text-white w-full p-2 rounded-md" onClick={handleSubmit}>Login</button>
        </div>
  </div> 
}


export default Login;