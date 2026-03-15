"use client"

import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code"
import { useState, useEffect } from "react"

type DocumentsType = {
  aadhaarFront: File | null
  aadhaarBack: File | null
  panFront: File | null
  panBack: File | null
  voterId: File | null
  drivingLicense: File | null
  bankProof: File | null
  passportPhoto: File | null
}

export default function UserRegistration() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.push("/login")
  }, [])

  const [step, setStep] = useState(1)
  const totalSteps = 6

  const [sameAddress,setSameAddress] = useState(false)

  const [formData, setFormData] = useState({

    firstName:"",
    middleName:"",
    lastName:"",

    fatherName:"",
    motherName:"",
    spouseName:"",

    dob:"",
    age:"",
    gender:"",
    maritalStatus:"",
    category:"",
    disabilityStatus:"",

    occupation:"",
    annualIncome:"",

    aadhaar:"",
    panNumber:"",
    voterIdNumber:"",
    drivingLicenseNumber:"",

    phone:"",
    email:"",

    /* Permanent Address */
    permanentAddress:"",
    permanentState:"",
    permanentDistrict:"",
    permanentBlock:"",
    permanentCity:"",
    permanentPincode:"",

    /* Current Address */
    currentAddress:"",
    currentState:"",
    currentDistrict:"",
    currentCity:"",
    currentPincode:"",

    bankName:"",
    accountNumber:"",
    ifsc:"",
    accountHolderName:"",
    branchName:"",
    confirmAccountNumber:"",

    familyName:"",
    relation:"",
    familyAge:""
  })

  const [documents,setDocuments] = useState<DocumentsType>({
  aadhaarFront:null,
  aadhaarBack:null,
  panFront:null,
  panBack:null,
  voterId:null,
  drivingLicense:null,
  bankProof:null,
  passportPhoto:null
})

  const [qrData,setQrData] = useState("")

  const [warnings,setWarnings] = useState<string[]>([])

const runAIValidation = ()=>{

const issues:string[] = []

if(Number(formData.age) < 60){
 issues.push("Applicant age below pension eligibility")
}

if(!documents.aadhaarFront){
 issues.push("Aadhaar front not uploaded")
}

if(formData.accountNumber.length < 9){
 issues.push("Invalid bank account number")
}

setWarnings(issues)

}

  const handleChange = (e:any)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,files} = e.target
    if(!files) return
    setDocuments({...documents,[name]:files[0]})
  }

  const [agreed,setAgreed] = useState(false)

  useEffect(()=>{

    if(formData.dob){

      const birthDate = new Date(formData.dob)
      const today = new Date()

      let age = today.getFullYear() - birthDate.getFullYear()

      const m = today.getMonth() - birthDate.getMonth()

      if(m<0 || (m===0 && today.getDate()<birthDate.getDate())){
        age--
      }

      setFormData(prev=>({
        ...prev,
        age:age.toString()
      }))
    }

  },[formData.dob])

  const handleSameAddress = (checked:boolean)=>{

    setSameAddress(checked)

    if(checked){

      setFormData(prev=>({
        ...prev,
        currentAddress:prev.permanentAddress,
        currentState:prev.permanentState,
        currentDistrict:prev.permanentDistrict,
        currentCity:prev.permanentCity,
        currentPincode:prev.permanentPincode
      }))

    }

  }

  const handleFamilyChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {

  const { name, value } = e.target

  const updated = [...familyMembers]

  updated[index] = {
    ...updated[index],
    [name]: value
  }

  setFamilyMembers(updated)
}

const addFamilyMember = () => {
  setFamilyMembers([
    ...familyMembers,
    {
      name: "",
      relation: "",
      age: "",
      gender: "",
      occupation: "",
      aadhaar: ""
    }
  ])
}

  const nextStep = ()=>{

    if(step===2 && formData.aadhaar.length!==12){
      alert("Aadhaar must be 12 digits")
      return
    }

    setStep(step+1)

  }

  const prevStep = ()=> setStep(step-1)

  const handleSubmit = async () => {

const maskedAadhaar = "XXXX-XXXX-" + formData.aadhaar.slice(-4)

const payload = {
  ...formData,
  aadhaar: maskedAadhaar,
  documents:{
    aadhaarFront:documents.aadhaarFront?.name,
    aadhaarBack:documents.aadhaarBack?.name,
    panFront:documents.panFront?.name,
    panBack:documents.panBack?.name,
    voterId:documents.voterId?.name,
    drivingLicense:documents.drivingLicense?.name,
    bankProof:documents.bankProof?.name,
    passportPhoto:documents.passportPhoto?.name
  },
  familyMembers
}

try {

const response = await fetch("http://127.0.0.1:8000/citizen-register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})

const data = await response.json()

if(response.ok){
  setQrData(JSON.stringify(payload))
  alert("Citizen registered successfully")
}else{
  alert(data.detail)
}

} catch(err){
alert("Backend connection error")
}

}

  const [familyMembers, setFamilyMembers] = useState([
  {
    name: "",
    relation: "",
    age: "",
    gender: "",
    occupation: "",
    aadhaar: ""
  }
])



  return(
    <div className="min-h-screen bg-gray-100">

      <Navbar/>

      <div className="text-center mt-10">

        <h2 className="text-3xl font-bold">
          Citizen Registration
        </h2>

        <p className="text-gray-600 mt-2">
          Step {step} of {totalSteps}
        </p>

        <div className="w-1/2 mx-auto bg-gray-300 h-2 rounded mt-4">

          <div
            className="bg-blue-900 h-2 rounded"
            style={{width:`${(step/totalSteps)*100}%`}}
          />

        </div>

      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">

{/* STEP 1 PERSONAL */}

{step===1 &&(
<>
<h3 className="text-xl font-semibold mb-6">
Personal Information
</h3>

<div className="grid md:grid-cols-2 gap-6">

<input name="firstName" value={formData.firstName} onChange={handleChange} className="border p-3 rounded-lg" placeholder="First Name"/>
<input name="middleName" value={formData.middleName} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Middle Name"/>
<input name="lastName" value={formData.lastName} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Last Name"/>

<input name="fatherName" value={formData.fatherName} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Father Name"/>
<input name="motherName" value={formData.motherName} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Mother Name"/>
<input name="spouseName" value={formData.spouseName} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Spouse Name"/>

<input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-3 rounded-lg"/>
<input name="age" value={formData.age} readOnly className="border p-3 rounded-lg bg-gray-100"/>

<select name="gender" value={formData.gender} onChange={handleChange} className="border p-3 rounded-lg">
<option>Select Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="border p-3 rounded-lg">
<option>Marital Status</option>
<option>Single</option>
<option>Married</option>
<option>Widowed</option>
<option>Divorced</option>
</select>

<select name="category" value={formData.category} onChange={handleChange} className="border p-3 rounded-lg">
<option>Category</option>
<option>General</option>
<option>OBC</option>
<option>SC</option>
<option>ST</option>
</select>

<input name="occupation" value={formData.occupation} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Occupation"/>
<input name="annualIncome" value={formData.annualIncome} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Annual Income"/>

</div>
</>
)}

{/* STEP 2 IDENTITY */}

{step===2 &&(
<>
<h3 className="text-xl font-semibold mb-6">
Identity Details
</h3>

<div className="grid md:grid-cols-2 gap-6">

<input
name="aadhaar"
value={formData.aadhaar}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Aadhaar Number"
/>

<div>
<label className="block mb-2 font-medium">
Upload Aadhaar Front
</label>
<input
type="file"
name="aadhaarFront"
accept="image/*"
onChange={handleFile}
/>
</div>

<div>
<label className="block mb-2 font-medium">
Upload Aadhaar Back
</label>
<input
type="file"
name="aadhaarBack"
accept="image/*"
onChange={handleFile}
/>
</div>

<input
name="panNumber"
value={formData.panNumber}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="PAN Number"
/>

<div>
<label className="block mb-2 font-medium">
Upload PAN Front
</label>
<input
type="file"
name="panFront"
accept="image/*"
onChange={handleFile}
/>
</div>

<div>
<label className="block mb-2 font-medium">
Upload PAN Back
</label>
<input
type="file"
name="panBack"
accept="image/*"
onChange={handleFile}
/>
</div>

<input
name="voterIdNumber"
value={formData.voterIdNumber}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Voter ID"
/>

<input
name="drivingLicenseNumber"
value={formData.drivingLicenseNumber}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Driving License"
/>

<div>
<label className="block mb-2 font-medium">
Upload Passport Size Photo
</label>
<input
type="file"
name="passportPhoto"
accept="image/*"
onChange={handleFile}
/>
</div>

</div>
</>
)}

{/* STEP 3 ADDRESS */}

{step===3 &&(
<>
<h3 className="text-xl font-semibold mb-6">
Address Details
</h3>

<h4 className="font-semibold mb-3">
Permanent Address
</h4>

<div className="grid md:grid-cols-2 gap-6">

<input name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Address Line"/>
<input name="permanentState" value={formData.permanentState} onChange={handleChange} className="border p-3 rounded-lg" placeholder="State"/>
<input name="permanentDistrict" value={formData.permanentDistrict} onChange={handleChange} className="border p-3 rounded-lg" placeholder="District"/>
<input name="permanentBlock" value={formData.permanentBlock} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Block / Tehsil"/>
<input name="permanentCity" value={formData.permanentCity} onChange={handleChange} className="border p-3 rounded-lg" placeholder="City / Village"/>
<input name="permanentPincode" value={formData.permanentPincode} onChange={handleChange} className="border p-3 rounded-lg" placeholder="PIN Code"/>

</div>

<h4 className="font-semibold mt-6 mb-3">
Current Address
</h4>

<label className="flex items-center gap-2 mb-4">
<input type="checkbox" checked={sameAddress} onChange={(e)=>handleSameAddress(e.target.checked)}/>
Same as Permanent
</label>

<div className="grid md:grid-cols-2 gap-6">

<input name="currentAddress" value={formData.currentAddress} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Address Line"/>
<input name="currentState" value={formData.currentState} onChange={handleChange} className="border p-3 rounded-lg" placeholder="State"/>
<input name="currentDistrict" value={formData.currentDistrict} onChange={handleChange} className="border p-3 rounded-lg" placeholder="District"/>
<input name="currentCity" value={formData.currentCity} onChange={handleChange} className="border p-3 rounded-lg" placeholder="City"/>
<input name="currentPincode" value={formData.currentPincode} onChange={handleChange} className="border p-3 rounded-lg" placeholder="PIN Code"/>

</div>
</>
)}

{/* STEP 4 BANK DETAILS */}

{step===4 &&(

<>

<h3 className="text-xl font-semibold mb-6">
Bank Account Details
</h3>

<div className="grid md:grid-cols-2 gap-6">

<input
name="accountHolderName"
value={formData.accountHolderName}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Account Holder Name"
/>

<input
name="bankName"
value={formData.bankName}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Bank Name"
/>

<input
name="branchName"
value={formData.branchName}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Branch Name"
/>

<input
name="accountNumber"
value={formData.accountNumber}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Account Number"
/>

<input
name="confirmAccountNumber"
value={formData.confirmAccountNumber}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="Confirm Account Number"
/>

<input
name="ifsc"
value={formData.ifsc}
onChange={handleChange}
className="border p-3 rounded-lg"
placeholder="IFSC Code"
/>

<div>

<label className="block mb-2 font-medium">
Upload Passbook / Cancelled Cheque
</label>

<input
type="file"
name="bankProof"
onChange={handleFile}
/>

</div>

</div>

</>

)}

{/* STEP 5 FAMILY DETAILS */}

{step === 5 && (

<>
<h3 className="text-xl font-semibold mb-6">
Family Details
</h3>

<p className="text-gray-600 mb-6">
Add all family members for scheme eligibility.
</p>

{familyMembers.map((member, index) => (

<div key={index} className="grid md:grid-cols-2 gap-6 mb-8 border p-6 rounded-lg">

<input
name="name"
value={member.name}
onChange={(e)=>handleFamilyChange(index,e)}
className="border p-3 rounded-lg"
placeholder="Member Name"
/>

<input
name="relation"
value={member.relation}
onChange={(e)=>handleFamilyChange(index,e)}
className="border p-3 rounded-lg"
placeholder="Relation"
/>

<input
name="age"
value={member.age}
onChange={(e)=>handleFamilyChange(index,e)}
className="border p-3 rounded-lg"
placeholder="Age"
/>

<select
name="gender"
value={member.gender}
onChange={(e)=>handleFamilyChange(index,e)}
className="border p-3 rounded-lg"
>
<option>Select Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<input
name="occupation"
value={member.occupation}
onChange={(e)=>handleFamilyChange(index,e)}
className="border p-3 rounded-lg"
placeholder="Occupation"
/>

<input
name="aadhaar"
value={member.aadhaar}
onChange={(e)=>handleFamilyChange(index,e)}
className="border p-3 rounded-lg"
placeholder="Aadhaar (optional)"
/>

</div>

))}

<button
onClick={addFamilyMember}
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
+ Add Family Member
</button>

</>

)}

{/* STEP 9: AI VALIDATION */}
{step === 9 && (
<>
<h3 className="text-xl font-semibold mb-6">
AI Validation
</h3>

<button
onClick={runAIValidation}
className="bg-purple-600 text-white px-6 py-3 rounded-lg"
>
Run AI Validation
</button>

<ul className="mt-6 text-red-600">
{warnings.map((w,i)=>(
<li key={i}>{w}</li>
))}
</ul>

</>
)}

{/* STEP 10: DECLARATION */}
{step === 10 && (

<>
<h3 className="text-xl font-semibold mb-6">
Declaration
</h3>

<div className="flex items-start gap-3">

<input
type="checkbox"
checked={agreed}
onChange={(e)=>setAgreed(e.target.checked)}
/>

<p>
I declare that the information provided is true and correct.
</p>

</div>

</>

)}

{/* STEP 6: REVIEW DETAILS */}
{step === 6 && (

<>
<h3 className="text-xl font-semibold mb-6">
Review All Details
</h3>

<div className="grid md:grid-cols-2 gap-4 text-gray-800">

<p><b>Name:</b> {formData.firstName} {formData.middleName} {formData.lastName}</p>
<p><b>Father Name:</b> {formData.fatherName}</p>
<p><b>Mother Name:</b> {formData.motherName}</p>
<p><b>Spouse:</b> {formData.spouseName}</p>

<p><b>Date of Birth:</b> {formData.dob}</p>
<p><b>Age:</b> {formData.age}</p>
<p><b>Gender:</b> {formData.gender}</p>
<p><b>Marital Status:</b> {formData.maritalStatus}</p>

<p><b>Category:</b> {formData.category}</p>
<p><b>Disability:</b> {formData.disabilityStatus}</p>

<p><b>Occupation:</b> {formData.occupation}</p>
<p><b>Annual Income:</b> {formData.annualIncome}</p>

<hr className="col-span-2 my-4"/>

<p><b>Aadhaar:</b> {formData.aadhaar}</p>
<p><b>PAN:</b> {formData.panNumber}</p>
<p><b>Voter ID:</b> {formData.voterIdNumber}</p>
<p><b>Driving License:</b> {formData.drivingLicenseNumber}</p>

<hr className="col-span-2 my-4"/>

<p><b>Permanent Address:</b> {formData.permanentAddress}</p>
<p><b>State:</b> {formData.permanentState}</p>
<p><b>District:</b> {formData.permanentDistrict}</p>
<p><b>City:</b> {formData.permanentCity}</p>
<p><b>Pincode:</b> {formData.permanentPincode}</p>

<hr className="col-span-2 my-4"/>

<p><b>Current Address:</b> {formData.currentAddress}</p>
<p><b>State:</b> {formData.currentState}</p>
<p><b>District:</b> {formData.currentDistrict}</p>
<p><b>City:</b> {formData.currentCity}</p>
<p><b>Pincode:</b> {formData.currentPincode}</p>

<hr className="col-span-2 my-4"/>

<p><b>Account Holder:</b> {formData.accountHolderName}</p>
<p><b>Bank:</b> {formData.bankName}</p>
<p><b>Branch:</b> {formData.branchName}</p>
<p><b>Account Number:</b> {formData.accountNumber}</p>
<p><b>IFSC:</b> {formData.ifsc}</p>

{/* FAMILY DETAILS */}

<div className="col-span-2 mt-6">

<h4 className="text-lg font-semibold mb-3">
Family Members
</h4>

{familyMembers.length === 0 ? (
<p>No family members added</p>
) : (

familyMembers.map((member,index)=>(

<div
key={index}
className="grid md:grid-cols-2 gap-4 border p-4 rounded-lg mb-4"
>

<p><b>Name:</b> {member.name}</p>
<p><b>Relation:</b> {member.relation}</p>
<p><b>Age:</b> {member.age}</p>
<p><b>Gender:</b> {member.gender}</p>
<p><b>Occupation:</b> {member.occupation}</p>
<p><b>Aadhaar:</b> {member.aadhaar}</p>

</div>

))

)}

</div>

</div>

</>

)}

<div className="flex gap-4 mt-10 justify-between">

{step > 1 && (
<button
onClick={prevStep}
className="bg-gray-500 text-white px-6 py-3 rounded-lg"
>
Back
</button>
)}

{step < totalSteps && (
<button
onClick={nextStep}
className="bg-blue-900 text-white px-6 py-3 rounded-lg"
>
Next
</button>
)}

{step === totalSteps && (
<button
onClick={handleSubmit}
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
Submit
</button>
)}

</div>

{qrData && (

<div className="mt-10 text-center">

<h3 className="text-lg font-semibold mb-4">
Citizen QR Code
</h3>

<div className="bg-white p-6 inline-block">
<QRCode value={qrData} size={220}/>
</div>

</div>

)}

</div>
</div>
)
}