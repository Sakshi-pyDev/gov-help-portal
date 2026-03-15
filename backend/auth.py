from fastapi import APIRouter, Depends, HTTPException
from security import create_access_token
from sqlalchemy.orm import Session
import bcrypt

import models, schemas
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(models.User.phone == user.phone).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())

    new_user = models.User(
        name=user.name,
        phone=user.phone,
        password=hashed_password.decode()
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.phone == user.phone).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not bcrypt.checkpw(user.password.encode(), db_user.password.encode()):
        raise HTTPException(status_code=400, detail="Invalid password")

    access_token = create_access_token(data={"sub": db_user.phone})

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/citizen-register")
def register_citizen(citizen: schemas.CitizenCreate, db: Session = Depends(get_db)):

    new_citizen = models.Citizen(
        firstName=citizen.firstName,
        middleName=citizen.middleName,
        lastName=citizen.lastName,
        dob=citizen.dob,
        gender=citizen.gender,
        aadhaar=citizen.aadhaar,
        phone=citizen.phone,
        email=citizen.email,
        address=citizen.address,
        state=citizen.state,
        district=citizen.district,
        city=citizen.city,
        pincode=citizen.pincode
    )

    db.add(new_citizen)
    db.commit()
    db.refresh(new_citizen)

    return {"message": "Citizen registered successfully"}

@router.get("/citizen/{phone}")
def get_citizen(phone: str, db: Session = Depends(get_db)):

    citizen = db.query(models.Citizen).filter(models.Citizen.phone == phone).first()

    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")

    return citizen

@router.get("/citizen/{citizenId}")
def get_citizen(citizenId: str, db: Session = Depends(get_db)):

    citizen = db.query(models.Citizen).filter(
        models.Citizen.citizenId == citizenId
    ).first()

    if not citizen:
        return {"error": "Citizen not found"}

    return citizen

