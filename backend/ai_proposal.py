import google.generativeai as genai
import os

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)
model = genai.GenerativeModel("gemini-flash-latest")

def generate_proposal(requirements):

    prompt = f"""
You are a senior software solution architect.

Analyze the client's requirements and generate:

1. Project Title
2. Project Overview
3. Key Features
4. Recommended Technology Stack
5. Estimated Development Cost (INR)
6. Estimated Development Timeline
7. Future Enhancements

Client Requirements:

{requirements}

Generate a professional software proposal.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        raise e