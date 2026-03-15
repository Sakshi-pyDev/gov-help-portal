"use client"
import CopilotPanel from "@/components/CopilotPanel"

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <div className="flex">

      <div className="flex-1">
        {children}
      </div>

      <CopilotPanel />

    </div>

  )
}