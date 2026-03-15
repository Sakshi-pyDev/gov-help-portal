"use client"

import { useState, useEffect } from "react"
import QrScanner from "@/components/QrScanner"
import { stateDistricts } from "@/lib/stateDistricts"

const bankData: any = {
  "State Bank of India": {
    "Raipur Main Branch": "SBIN0000001",
    "Durg Branch": "SBIN0000456",
    "Bilaspur Branch": "SBIN0000789"
  },
  "Punjab National Bank": {
    "Raipur Branch": "PUNB0001234",
    "Bilaspur Branch": "PUNB0005678"
  },
  "HDFC Bank": {
    "Raipur Branch": "HDFC0000456",
    "Bhilai Branch": "HDFC0000789"
  },
  "ICICI Bank": {
    "Raipur Branch": "ICIC0001234",
    "Durg Branch": "ICIC0005678"
  }
}

export default function PensionForm() {

  const [showScanner, setShowScanner] = useState(false)

  const [warnings, setWarnings] = useState<string[]>([])

  const bankList = Object.keys(bankData)

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    aadhaar: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    pensionType: "",
    annualIncome: "",
    bankName: "",
    branch: "",
    bankAccount: "",
    ifsc: "",
    nomineeName: "",
    nomineeRelation: "",
    disabilityPercent: "",
    husbandDeathDate: ""
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target

    if (name === "bankName") {
      setForm(prev => ({
        ...prev,
        bankName: value,
        branch: "",
        ifsc: ""
      }))
      return
    }

    if (name === "branch") {
      const ifsc = bankData[form.bankName]?.[value] || ""
      setForm(prev => ({
        ...prev,
        branch: value,
        ifsc: ifsc
      }))
      return
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "state" && { district: "" })
    }))
  }

  const handleQrData = (data: any) => {
    setForm(prev => ({
      ...prev,
      name: `${data.firstName || ""} ${data.middleName || ""} ${data.lastName || ""}`.trim(),
      dob: data.dob || "",
      gender: data.gender || "",
      aadhaar: data.aadhaar || "",
      mobile: data.phone || "",
      address: data.address || ""
    }))
    setShowScanner(false)
  }

  const checkFormWithCopilot = async (formData: any) => {

    try {

      const res = await fetch("http://localhost:8000/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      setWarnings([
        ...(data.rule_errors || []),
        ...(data.ai_feedback ? [data.ai_feedback] : [])
      ])

    } catch (error) {
      console.error("Copilot error:", error)
    }

  }

  useEffect(() => {

    const timer = setTimeout(() => {
      checkFormWithCopilot(form)
    }, 600)

    return () => clearTimeout(timer)

  }, [form])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", form)
    alert("Application Submitted")
  }

  useEffect(() => {

  window.dispatchEvent(
    new CustomEvent("copilot-update", { detail: form })
  )

}, [form])

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Pension Application Form
      </h1>

      <button
        onClick={() => setShowScanner(true)}
        className="mb-6 bg-blue-700 text-white px-6 py-2 rounded"
      >
        Scan Citizen QR
      </button>

      {showScanner && (
        <div className="mb-6">
          <QrScanner onScan={handleQrData} />
        </div>
      )}

      {/* Copilot Warning Panel */}

      {warnings.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <h2 className="font-semibold mb-2">AI Copilot Suggestions</h2>
          <ul className="list-disc ml-5">
            {warnings.map((w, i) => (
              <li key={i}>⚠ {w}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        <input
          name="name"
          placeholder="Applicant Name"
          pattern="[A-Za-z ]{2,50}"
          className="border p-3 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="fatherName"
          placeholder="Father / Husband Name"
          pattern="[A-Za-z ]{2,50}"
          className="border p-3 rounded"
          value={form.fatherName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          className="border p-3 rounded"
          value={form.dob}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-3 rounded"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="aadhaar"
          placeholder="Aadhaar Number"
          pattern="[0-9]{12}"
          maxLength={12}
          className="border p-3 rounded"
          value={form.aadhaar}
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          className="border p-3 rounded"
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-3 rounded"
          value={form.address}
          onChange={handleChange}
        />

        <select
          name="pensionType"
          className="border p-3 rounded"
          value={form.pensionType}
          onChange={handleChange}
        >
          <option value="">Select Pension Type</option>
          <option value="old_age">Old Age Pension</option>
          <option value="widow">Widow Pension</option>
          <option value="disability">Disability Pension</option>
        </select>

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select State</option>
          {Object.keys(stateDistricts).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          name="district"
          className="border p-3 rounded"
          value={form.district}
          onChange={handleChange}
          disabled={!form.state}
        >
          <option value="">Select District</option>
          {form.state &&
            stateDistricts[form.state]?.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
        </select>

        <input
          name="annualIncome"
          placeholder="Annual Income"
          pattern="[0-9]{1,7}"
          className="border p-3 rounded"
          value={form.annualIncome}
          onChange={handleChange}
        />

        <select
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select Bank</option>
          {bankList.map((bank) => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>

        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
          disabled={!form.bankName}
          className="border p-3 rounded"
        >
          <option value="">Select Branch</option>
          {form.bankName &&
            Object.keys(bankData[form.bankName]).map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
        </select>

        <input
          name="bankAccount"
          placeholder="Bank Account Number"
          pattern="[0-9]{9,18}"
          className="border p-3 rounded"
          value={form.bankAccount}
          onChange={handleChange}
        />

        <input
          name="ifsc"
          placeholder="IFSC Code"
          className="border p-3 rounded"
          value={form.ifsc}
          readOnly
        />

        <input
          name="nomineeName"
          placeholder="Nominee Name"
          pattern="[A-Za-z ]{2,50}"
          className="border p-3 rounded"
          value={form.nomineeName}
          onChange={handleChange}
        />

        <input
          name="nomineeRelation"
          placeholder="Nominee Relation"
          pattern="[A-Za-z ]{2,30}"
          className="border p-3 rounded"
          value={form.nomineeRelation}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="col-span-2 mt-4 bg-green-600 text-white px-6 py-3 rounded"
        >
          Submit Application
        </button>

      </form>

    </div>
  )
}