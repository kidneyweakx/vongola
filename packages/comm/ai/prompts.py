import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

MODEL_API_KEY = os.getenv('MODEL_API_KEY')
genai.configure(api_key=MODEL_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

class PersonalityRatingPrompt:
         
    def get_prompt():
        return """
You are given an array [x1, x2, x3, x4, x5], where each element represents a score from 0 to 100 for a specific personality dimension:

x1: Energy (0-50 indicates Introverted, 51-100 indicates Extraverted)
x2: Mind (0-50 indicates Observant, 51-100 indicates Intuitive)
x3: Nature (0-50 indicates Feeling, 51-100 indicates Thinking)
x4: Tactics (0-50 indicates Prospecting, 51-100 indicates Judging)
x5: Identity (0-50 indicates Turbulent, 51-100 indicates Assertive)
Your task is to analyze the scores and classify the personality into a final rating from 1 to 10, where 1 indicates a more balanced and moderate personality across traits, and 10 indicates a strong alignment towards specific traits. The final score should reflect the overall balance or imbalance across the personality dimensions.

Example Input: Array: [65, 45, 30, 80, 90]

Output: Final Personality Rating: 7
Just give the final rating as the output. 
"""
    def gen_ai(prompts):
        response = model.generate_content(prompts)
        print(response.text)
        return response.text