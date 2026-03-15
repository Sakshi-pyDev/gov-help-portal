"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {

  const router = useRouter()

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const handleRegister = async (e:any) => {
  e.preventDefault()

  if(password !== confirmPassword){
    alert("Passwords do not match")
    return
  }

  if(!name || !phone || !password){
    alert("Please fill all fields")
    return
  }

  try{

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        password: password
      })
    })

    const data = await response.json()

    alert(data.message)

    if(response.ok){
      router.push("/User")
    }

  }catch(error){
    alert("Server error. Is backend running?")
  }
}

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[380px]">

        <p className="text-sm text-gray-500 mb-2">
          Create your account
        </p>

        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-blue-100 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-blue-100 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-blue-100 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-blue-100 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-full mt-4"
          >
            REGISTER →
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <span
            onClick={()=>router.push("/login")}
            className="text-pink-500 cursor-pointer ml-1"
          >
            Log in
          </span>
        </p>

      </div>

    </div>
  )
}