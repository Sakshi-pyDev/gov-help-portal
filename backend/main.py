from fastapi import FastAPI
from validator import validate_form
from ai_service import analyze_form
from auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# keep your auth routes
app.include_router(auth_router)


@app.post("/copilot")
def copilot(data: dict):

    # rule-based validation
    rule_errors = validate_form(data)

    # Basic rule validation
    if not data.get("name"):
        rule_errors.append("Name field is missing.")

    if not data.get("phone"):
        rule_errors.append("Phone number is required.")

    if not data.get("aadhaar"):
        rule_errors.append("Aadhaar number is required.")

    if not data.get("address"):
        rule_errors.append("Address is required for pension eligibility.")

    # AI validation (safe)
    try:
        ai_feedback = analyze_form(data)
    except Exception as e:
        ai_feedback = str(e)
    return {
        "rule_errors": rule_errors,
        "ai_feedback": ai_feedback
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)