from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True)
    password = Column(String)

class Citizen(Base):
    __tablename__ = "citizens"

    id = Column(Integer, primary_key=True, index=True)

    citizenId = Column(String, unique=True)

    firstName = Column(String)
    middleName = Column(String)
    lastName = Column(String)

    fatherName = Column(String)
    motherName = Column(String)
    spouseName = Column(String)

    dob = Column(String)
    age = Column(String)
    gender = Column(String)

    occupation = Column(String)
    annualIncome = Column(String)

    aadhaar = Column(String)
    phone = Column(String)
    email = Column(String)

    permanentAddress = Column(String)
    permanentState = Column(String)
    permanentDistrict = Column(String)
    permanentCity = Column(String)
    permanentPincode = Column(String)

    bankName = Column(String)
    accountNumber = Column(String)
    ifsc = Column(String)