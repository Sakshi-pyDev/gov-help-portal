"use client"

import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect } from "react"

export default function QrScanner({ onScan }: any) {

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    )

    scanner.render(

      (decodedText) => {

        try {

          // QR now contains full citizen data
          const qrData = JSON.parse(decodedText)

          onScan(qrData)

          scanner.clear()

        } catch (err) {
          console.log("Invalid QR")
        }

      },

      () => {}
    )

    return () => {
      scanner.clear().catch(() => {})
    }

  }, [])

  return <div id="reader" style={{ width: "300px" }}></div>
}