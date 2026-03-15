"use client"

import { Navbar } from "@/components/navbar"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function OperatorDashboard() {

  const [citizenData, setCitizenData] = useState<any>(null)
  const [risk, setRisk] = useState("LOW")
  const [riskReason, setRiskReason] = useState("")
  const [listening, setListening] = useState(false)
  const [voiceText, setVoiceText] = useState("")
  const [priority, setPriority] = useState("NORMAL")
  const [aiResponse, setAiResponse] = useState("")

  {/*AI risk analysis*/}
  const analyzeApplication = (data:any) => {

  let riskLevel = "LOW"
  let reason = ""
  let priorityLevel = "NORMAL"

  const age =
    new Date().getFullYear() - new Date(data.dob).getFullYear()

  if (!data.phone || data.phone.length !== 10) {
    riskLevel = "HIGH"
    reason = "Invalid phone number"
    priorityLevel = "REVIEW REQUIRED"
  }

  if (!data.aadhaar) {
    riskLevel = "HIGH"
    reason = "Missing Aadhaar"
    priorityLevel = "REVIEW REQUIRED"
  }

  if (age < 18) {
    riskLevel = "MEDIUM"
    reason = "Applicant under 18"
    priorityLevel = "VERIFY DOCUMENTS"
  }

  setRisk(riskLevel)
  setRiskReason(reason)
  setPriority(priorityLevel)
}

  {/*Voice assistant*/}

const startListening = () => {

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition

  const recognition = new SpeechRecognition()

  recognition.lang = "en-IN"

  setListening(true)   // 👈 show listening state

  recognition.start()

  recognition.onresult = (event:any) => {

    const transcript = event.results[0][0].transcript

    setVoiceText(transcript)

    processVoiceCommand(transcript)

    setListening(false)   // 👈 stop listening
  }

  recognition.onerror = () => {
    setListening(false)
  }

}

    {/*Process Command*/}
  
  const processVoiceCommand = (text:string) => {

  let response = ""

  const query = text.toLowerCase()

  if (query.includes("pension")) {
    response =
      "The pension application form can be started from the pension button in the Start New Application section."
  }

  else if (query.includes("birth certificate")) {
    response =
      "Birth certificate requires hospital record or affidavit from parents."
  }

  else if (query.includes("aadhaar update")) {
    response =
      "Aadhaar update requires biometric verification and identity proof."
  }

  else {
    response = "Sorry, I could not understand the request."
  }

  setAiResponse(response)   // 👈 this makes the answer appear on screen

  speak(response)
}

    {/*Speak Response*/}

  const speak = (message:string) => {

  const speech = new SpeechSynthesisUtterance(message)

  speech.lang = "en-IN"

  window.speechSynthesis.speak(speech)

}
   
    {/* QR Scanner */}

  <div className="bg-white p-6 rounded-xl shadow mb-8">

    <h2 className="text-xl font-semibold mb-4">
      📷 Scan Citizen QR
    </h2>

      <div id="reader"></div>

  </div>

  useEffect(() => {

  const timer = setTimeout(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    )

    scanner.render(
      (decodedText) => {

        try {
          const data = JSON.parse(decodedText)

          setCitizenData(data)

          analyzeApplication(data)

          scanner.clear()

        } catch {
          console.log("Invalid QR")
        }

      },
      (error) => {
        console.log(error)
      }
    )

  }, 300)

  return () => clearTimeout(timer)

}, [])

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          📊 Operator Dashboard
        </h1>

        {/* Stats Cards */}

        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-blue-500 text-white p-6 rounded-xl">
            <p>Today's Applications</p>
            <h2 className="text-3xl font-bold">5</h2>
          </div>

          <div className="bg-orange-500 text-white p-6 rounded-xl">
            <p>Pending</p>
            <h2 className="text-3xl font-bold">1</h2>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl">
            <p>Rejected</p>
            <h2 className="text-3xl font-bold">0</h2>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl">
            <p>AI Risk Alerts</p>
            <h2 className="text-3xl font-bold">0</h2>
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

  <h2 className="text-xl font-semibold mb-4">
    📝 Start New Application
  </h2>

  <div className="grid grid-cols-3 gap-4">

    <Link href="/Operator/Forms/pension">
    <button className="bg-blue-600 text-white p-4 rounded-lg">
      Pension Application
    </button>
    </Link>

    <Link href="/Operator/Forms/birth-certificate">
    <button className="bg-green-600 text-white p-4 rounded-lg">
      Birth Certificate
    </button>
    </Link>

    

    

    

    

  </div>

</div>



        {/* AI Voice Assistant */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-xl font-semibold mb-4">
         🤖 Voice Assistant
        </h2>

        <button
          onClick={startListening}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
            🎤 Ask AI
        </button>

        {listening && (
          <p className="mt-3 text-blue-600 font-medium">
            🎤 Listening...
          </p>
        )}

          {voiceText && (
            <p className="mt-3 text-gray-800">
              You asked: {voiceText}
            </p>
          )}

          {aiResponse && (
            <p className="mt-2 text-green-700 font-medium">
              AI Response: {aiResponse}
            </p>
          )}

        </div>

        {/* Citizen Data */}

        {citizenData && (
  <div className="bg-white p-6 rounded-xl shadow max-w-xl">

    <h2 className="text-xl font-semibold mb-4 text-blue-900">
      Citizen Application Card
    </h2>

    <div className="space-y-2 text-gray-800">

      <p><b>Application ID:</b> {citizenData.applicationId}</p>

      <p>
        <b>Name:</b>{" "}
        {citizenData.firstName} {citizenData.middleName} {citizenData.lastName}
      </p>

      <p><b>Date of Birth:</b> {citizenData.dob}</p>

      <p><b>Gender:</b> {citizenData.gender}</p>

      <p><b>Aadhaar:</b> {citizenData.aadhaar}</p>

      <p><b>Phone:</b> {citizenData.phone}</p>

      <p><b>Email:</b> {citizenData.email}</p>

      <p>
        <b>Address:</b>{" "}
        {citizenData.address}, {citizenData.city}, {citizenData.district},{" "}
        {citizenData.state} - {citizenData.pincode}
      </p>

    </div>

    <div className="mt-6 flex gap-4">

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Approve Application
      </button>

      <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
        Reject
      </button>

    </div>
    <div className="mt-4">

  <p className="font-semibold">
    AI Risk Check:
  </p>

  <p
    className={`font-bold ${
      risk === "LOW"
        ? "text-green-600"
        : risk === "MEDIUM"
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {risk}
  </p>

  {riskReason && (
    <p className="text-sm text-gray-600">
      Reason: {riskReason}
    </p>
  )}

</div>

<div className="mt-4">

  <p className="font-semibold">
    Application Priority:
  </p>

  <p
    className={`font-bold ${
      priority === "NORMAL"
        ? "text-green-600"
        : priority === "VERIFY DOCUMENTS"
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {priority}
  </p>

</div>
  </div>
  
)}

      </div>

    </div>
  )
}