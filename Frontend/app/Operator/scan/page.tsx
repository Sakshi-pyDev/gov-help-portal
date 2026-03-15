"use client"

import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"

export default function ScanPage(){

  const [citizen,setCitizen] = useState<any>(null)

  useEffect(()=>{

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps:10,
        qrbox:250
      },
      false
    )

    scanner.render(
      async (decodedText) => {

        try{

          const qrData = JSON.parse(decodedText)

          const response = await fetch(
            "http://127.0.0.1:8000/citizen/" + qrData.phone
          )

          const data = await response.json()

          setCitizen(data)

        }catch(error){
          console.error("Invalid QR data")
        }

      },
      (errorMessage)=>{
        // ignore scanning errors
      }
    )

  },[])

  return(

    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"28px",marginBottom:"20px"}}>
        Operator QR Scanner
      </h1>

      <div id="reader" style={{width:"300px"}}></div>

      {citizen && (

        <div style={{marginTop:"30px"}}>

          <h2>Citizen Record</h2>

          <p>Name: {citizen.firstName} {citizen.lastName}</p>
          <p>Phone: {citizen.phone}</p>
          <p>Email: {citizen.email}</p>
          <p>Address: {citizen.address}</p>

        </div>

      )}

    </div>

  )
}