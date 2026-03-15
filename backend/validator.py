import re
from datetime import datetime

def validate_form(data):

    errors = []

    # Name
    name = data.get("name")
    if not name:
        errors.append("Name field is missing")
    elif not re.fullmatch(r"[A-Za-z ]{2,50}", name):
        errors.append("Name should contain only letters")

    # Father name
    father = data.get("fatherName")
    if father and not re.fullmatch(r"[A-Za-z ]{2,50}", father):
        errors.append("Father/Husband name looks invalid")

    # Aadhaar
    aadhaar = data.get("aadhaar")
    if aadhaar and not re.fullmatch(r"\d{12}", str(aadhaar)):
        errors.append("Aadhaar must be 12 digits")

    # Mobile
    mobile = data.get("mobile")
    if mobile and not re.fullmatch(r"[6-9]\d{9}", str(mobile)):
        errors.append("Mobile number must be valid")

    # DOB
    dob = data.get("dob")
    if dob:
        try:
            birth = datetime.strptime(dob, "%Y-%m-%d")
            if birth > datetime.now():
                errors.append("DOB cannot be in the future")
        except:
            errors.append("DOB format invalid")

    # Nominee name
    nominee = data.get("nomineeName")
    if nominee and not re.fullmatch(r"[A-Za-z ]{2,50}", nominee):
        errors.append("Nominee name looks incorrect")

    # Nominee relation
    relation = data.get("nomineeRelation")
    if relation and not re.fullmatch(r"[A-Za-z ]{2,30}", relation):
        errors.append("Nominee relation looks incorrect")

    # Address
    address = data.get("address")
    if address and len(address) < 5:
        errors.append("Address looks incomplete")

    return errors