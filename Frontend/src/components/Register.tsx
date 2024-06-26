import { Link, useNavigate } from "react-router-dom"
import { Signup } from "@spearhead08/common";
import { ChangeEvent, useState } from "react";
import ApiClient from "../../config/Api";

const Register = () => {
    const [inputdata,SetInputData] = useState<Signup>({
        name:"",
        email:"",
        password:""
    })
    const navigate= useNavigate();
    const handleSubmit = async() =>{
        try {
            const res=await ApiClient.post("/api/v1/user/signup",inputdata) ;
            console.log(res.data.jwt);
            localStorage.setItem("token",res.data.jwt);
            navigate("/blogs");
        } catch (error) {
            console.log(error)
        }
    }
  return <div className="flex justify-center items-center">
    <div className="w-1/2 ">
    <h1 className="text-3xl text-center">Create an Account</h1>
    <p className="text-md text-center"> Already Registered ! <Link to={"/signin"} className="underline text-grey-200">Login</Link></p>
    <Inputlabel label="Username" type="text" placeHolder="Username" onChange={(c)=>{ SetInputData({...inputdata,name:c.target.value})}}/>
    <Inputlabel label="Email" type="email" placeHolder="Email" onChange={(c)=>{SetInputData({...inputdata,email:c.target.value}) }}/>
    <Inputlabel label="Password" type="password" placeHolder="Password" onChange={(e)=>{SetInputData({...inputdata,password:e.target.value}) }}/>
    <button className="bg-blue-500 text-white w-full p-2 mt-4 rounded-md" onClick={()=>handleSubmit()}>Register</button>
 </div>
</div> 
}

interface InputlabelProps{
    label:string,
    placeHolder:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void,
    type:string
}


export const Inputlabel=({label,placeHolder,onChange,type}:InputlabelProps)=>{
    return(
        <div className="my-2">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeHolder} onChange={onChange} required />
        </div>
    )
}


export default Register