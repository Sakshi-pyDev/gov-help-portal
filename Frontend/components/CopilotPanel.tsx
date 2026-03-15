"use client"

import { useState, useEffect } from "react"

export default function CopilotPanel() {

  const [warnings, setWarnings] = useState<string[]>([])

  const checkCopilot = async (formData:any) => {

    try {

      const res = await fetch("http://localhost:8000/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      const combined = [
        ...(data.rule_errors || []),
        ...(data.ai_feedback ? [data.ai_feedback] : [])
      ]

      setWarnings(combined)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {

    const handler = (e:any) => {
      checkCopilot(e.detail)
    }

    window.addEventListener("copilot-update", handler)

    return () => {
      window.removeEventListener("copilot-update", handler)
    }

  }, [])

  return (

    <div className="w-80 bg-yellow-50 border-l p-4">

      <h2 className="font-bold mb-3">
        🤖 AI Copilot
      </h2>

      {warnings.length === 0 ? (
        <p className="text-sm text-gray-500">
          Copilot suggestions will appear here
        </p>
      ) : (
        <ul className="text-sm space-y-2">
          {warnings.map((w, i) => (
            <li key={i}>⚠ {w}</li>
          ))}
        </ul>
      )}

    </div>
  )
}