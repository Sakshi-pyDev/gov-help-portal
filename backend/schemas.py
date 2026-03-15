from pydantic import BaseModel

class UserRegister(BaseModel):
    name: str
    phone: str
    password: str

class UserLogin(BaseModel):
    phone: str
    password: str

class CitizenCreate(BaseModel):

    firstName:str
    middleName:str
    lastName:str

    fatherName:str
    motherName:str
    spouseName:str

    dob:str
    age:str
    gender:str

    occupation:str
    annualIncome:str

    aadhaar:str
    phone:str
    email:str

    permanentAddress:str
    permanentState:str
    permanentDistrict:str
    permanentCity:str
    permanentPincode:str

    bankName:str
    accountNumber:str
    ifsc:str