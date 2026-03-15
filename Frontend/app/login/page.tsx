"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {

  const router = useRouter()

  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (e:any) => {
  e.preventDefault()

  const res = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone: phone,
      password: password
    })
  })

  const data = await res.json()

  if(res.ok){
    router.push("/User")
  }else{
    alert(data.detail || "Login failed")
  }
}

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[380px]">

        <p className="text-sm text-gray-500 mb-2">
          Welcome back !!!
        </p>

        <h1 className="text-3xl font-bold mb-6">
          Log In
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-blue-100 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600">
              <label>Password</label>
            
            </div>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-blue-100 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-full mt-4"
          >
            LOGIN →
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account yet?
          <span
            onClick={()=>router.push("/register")}
            className="text-pink-500 cursor-pointer ml-1"
          >
            Sign up for free
          </span>
        </p>

      </div>

    </div>
  )
}