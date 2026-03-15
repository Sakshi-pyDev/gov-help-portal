import json
import requests

def analyze_form(data):

    prompt = f"""
You are an AI assistant helping CSC operators validate a government pension application form.

Form data:
{json.dumps(data, indent=2)}

Check for:
- unrealistic names
- invalid address
- suspicious data
- missing required fields
- incorrect phone or Aadhaar format

Give MAX 3 short bullet point suggestions for the CSC operator.
Each point must be under 12 words.
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False
            }
        )

        result = response.json()
        return result["response"]

    except Exception as e:
        return f"AI validation error: {str(e)}"