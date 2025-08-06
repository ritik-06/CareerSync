# # import os
# # import google.generativeai as genai
# # from app.config import GEMINI_API_KEY

# # genai.configure(api_key=GEMINI_API_KEY)
# # model = genai.GenerativeModel("gemini-pro")

# # def analyze_resume(resume_text, job_description):
# #     prompt = f"""
# #     Compare the following resume with the job description.
# #     Resume: {resume_text}
# #     Job Description: {job_description}

# #     Identify:
# #     1. Matched skills
# #     2. Missing skills
# #     3. Learning roadmap for missing skills
# #     Provide results in JSON format.
# #     """

# #     response = model.generate_content(prompt)
# #     return response.text


# import google.generativeai as genai
# from app.config import GEMINI_API_KEY

# genai.configure(api_key=GEMINI_API_KEY)

# model = genai.GenerativeModel(model_name="gemini-1.5-flash")  # ✅ Correct model

# def analyze_resume(resume_text, job_description):
#     prompt = f"""You are an AI resume evaluator.
# Compare the following resume text to the job description below.
# Provide skill match, missing skills, and learning plan.

# Resume:
# {resume_text}

# Job Description:
# {job_description}
# """

#     response = model.generate_content(prompt)
#     return response.text


import google.generativeai as genai
from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# async def analyze_resume(resume_text, job_description):
#     prompt = f"""
# You are an AI resume evaluator.

# Compare the given resume with the job description. 
# Identify and return:
# 1. A list of matched skills.
# 2. A list of missing skills.
# 3. A learning plan to acquire the missing skills.

# ### Return only a valid JSON object in the following format:
# {{
#   "matched_skills": ["skill1", "skill2", ...],
#   "missing_skills": ["skill3", "skill4", ...],
#   "learning_plan": [
#     {{
#       "skill": "missing_skill_name",
#       "resources": [
#         {{
#           "type": "video/article/course",
#           "title": "resource title",
#           "link": "https://..."
#         }}
#       ]
#     }}
#   ]
# }}

# ### Resume:
# {resume_text}

# ### Job Description:
# {job_description}
# """

#     response = model.generate_content(prompt)
#     return response.text



# async def analyze_resume(resume_text, job_description):
#     prompt = f"""
# You are an expert AI career coach and resume evaluator.

# Compare the candidate's resume with the job details (title, description, skills required, and technologies). Then perform the following tasks:

# 1. Identify and return a list of **matched skills**.
# 2. Identify and return a list of **missing or weak skills**.
# 3. Suggest a personalized **learning plan** for the missing skills with helpful resources (YouTube videos, articles, or courses).
# 4. Create a **step-by-step learning roadmap** in simple bullet-point format. Each step should clearly guide the user on what to learn and how to learn it.
# 5. Suggest a possible **career path** from the current profile to the job role, including future roles they can aim for.

# ### Return a valid JSON object like this:
# {{
#   "matched_skills": ["Python", "Django", "Git"],
#   "missing_skills": ["FastAPI", "CI/CD"],
#   "learning_plan": [
#     {{
#       "skill": "FastAPI",
#       "resources": [
#         {{
#           "type": "video",
#           "title": "FastAPI Crash Course",
#           "link": "https://youtube.com/example"
#         }},
#         {{
#           "type": "article",
#           "title": "FastAPI Official Docs",
#           "link": "https://fastapi.tiangolo.com"
#         }}
#       ]
#     }}
#   ],
#   "learning_roadmap": [
#     "Step 1: Master the basics of FastAPI using video tutorials.",
#     "Step 2: Build a small FastAPI project (e.g., To-Do API).",
#     "Step 3: Learn how to use FastAPI with authentication and async calls.",
#     "Step 4: Integrate CI/CD with your FastAPI project using GitHub Actions.",
#     "Step 5: Deploy your FastAPI app to cloud platforms like Render or Vercel."
#   ],
#   "career_path": [
#     "Current Role: Junior Python Developer",
#     "Target Role: Backend Developer (FastAPI)",
#     "Next Role: Full Stack Developer (React + FastAPI)",
#     "Future Path: Senior Software Engineer → Tech Lead → Engineering Manager"
#   ]
# }}

# ### Resume Text:
# {resume_text}

# ### Job Description:
# {job_description}
# """

#     response = model.generate_content(prompt)
#     return response.text



async def analyze_resume(resume_text, job_description):
    prompt = f"""
Prompt (Enhanced):

You are an expert AI career coach, resume evaluator, and technical mentor. Your goal is to help candidates identify where they stand and how they can strategically grow into their target job roles.

You will be given a candidate’s resume and job details (including job title, description, required skills, and technologies). Based on this, conduct a detailed, insightful, and supportive analysis as follows:

🔍 1. Skill Matching Analysis
Carefully compare the resume with the job description.

Identify and list all Matched Skills that are already demonstrated in the resume (include both technical and soft skills).

Identify and list all Missing or Weak Skills that are either not present or insufficiently covered in the resume.

📚 2. Personalized Learning Plan
For each missing or weak skill:

Suggest high-quality resources to learn it (YouTube tutorials, articles, courses—prefer those that are beginner-friendly, free, or widely recognized).

Include direct titles or links wherever possible.

🗺️ 3. Step-by-Step Learning Roadmap
Create a bullet-point, progressive roadmap that guides the candidate through a logical learning sequence.

Each step should be clear and actionable (e.g., “Complete XYZ course on Coursera,” “Build a mini-project using React,” “Watch this YouTube series on REST APIs”).

Ensure the roadmap helps the candidate become job-ready within a realistic time frame (e.g., 4–12 weeks).

🚀 4. Career Path Recommendations
Based on the current resume and target job, suggest a career trajectory.

Recommend possible intermediate roles (if needed), and future growth roles the candidate can aim for (e.g., "From Junior Web Developer → Full Stack Developer → Tech Lead").

Add advice for gaining relevant experience and building a strong portfolio.

Keep your tone encouraging, practical, and structured. Avoid generic advice. Focus on clarity, actionability, and growth potential.

5. **Aptitude Questions** (Total: 20)
- 5 General Reasoning Questions
- 5 Skill-Based MCQs from `matched_skills`
- 10 Skill-Based MCQs from `missing_skills`
Each question must be multiple-choice format (4 options) with a clear correct answer.

6. **Interview Questions** (Total: 11)
- 2 based on achievements or projects mentioned in the resume
- 2 technical questions from `matched_skills`
- 5 technical questions from `missing_skills`
- 2 HR questions (behavioral, situational)

📊 7. ATS Score Evaluation (Out of 100)
Simulate how an ATS software would evaluate the resume for this job. Score it from 0 to 100 based on:

- Keyword Match with job title, skills, and technologies
- Relevance of past roles and experience
- Format and structure
- Clarity and conciseness
- Use of action verbs and measurable results

8. short summary explaining why the score was given and suggestions for improving it.


### Return a valid JSON object like this:
{{
  "matched_skills": ["Python", "Django", "Git"],
  "missing_skills": ["FastAPI", "CI/CD"],
  "learning_plan": [
    {{
      "skill": "FastAPI",
      "resources": [
        {{
          "type": "video",
          "title": "FastAPI Crash Course",
          "link": "https://youtube.com/example"
        }},
        {{
          "type": "article",
          "title": "FastAPI Official Docs",
          "link": "https://fastapi.tiangolo.com"
        }}
      ]
    }}
  ],
  "learning_roadmap": [
    "Step 1: Master the basics of FastAPI using video tutorials.",
    "Step 2: Build a small FastAPI project (e.g., To-Do API).",
    "Step 3: Learn how to use FastAPI with authentication and async calls.",
    "Step 4: Integrate CI/CD with your FastAPI project using GitHub Actions.",
    "Step 5: Deploy your FastAPI app to cloud platforms like Render or Vercel.",
    "Step 6: Contribute to open-source FastAPI projects to gain real-world experience.",
    "Step 7: Prepare for technical interviews by practicing coding problems and system design.",
  ],
  "career_path": [
    "Current Role: Junior Python Developer",
    "Target Role: Backend Developer (FastAPI)",
    "Next Role: Full Stack Developer (React + FastAPI)",
    "Future Path: Senior Software Engineer → Tech Lead → Engineering Manager",
  ],
  "aptitude_questions": [
    "General reasoning question: If a train travels 60 miles in 1 hour, how far will it travel in 3 hours?",
    "General reasoning question: If a rectangle has a length of 10 and a width of 5, what is its area?",
    "General reasoning question: If a car travels at 50 mph for 2 hours,
    "General reasoning question: If a product costs $100 and is on sale for 20% off, what is the sale price?",
    "REsume-based question: What was the main technology you used in your last project?",
    "REsume-based question: What is the primary programming language you are proficient in?",
    "Resume-based question: What was the main technology you used in your last project?",
    "Matched skill question: What is the primary programming language you are proficient in?",
    "Missing skill question: What is your experience with FastAPI?",
    "Missing skill question: How would you implement authentication in a FastAPI application?",
    "Missing skill question: Can you explain how to handle asynchronous requests in FastAPI?",
    "Missing skill question: What is your approach to testing FastAPI applications?",,
    "Missing skill question: How do you optimize database queries in FastAPI applications?",
    "coading question: How do you handle errors and exceptions in FastAPI?",
    
  ],
  "interview_questions": [
    "What was the main technology you used in your last project?",
    "What is the primary programming language you are proficient in?",
    "What is your experience with FastAPI?",
    "How would you implement authentication in a FastAPI application?",
    "Can you explain how to handle asynchronous requests in FastAPI?",
    "What is your approach to testing FastAPI applications?",
    "situation question: How do you handle conflicts in a team setting?",
    "situation question: Describe a time when you had to learn a new technology quickly.",
    "How do you optimize database queries in FastAPI applications?",
    "Missing skill question: What is your approach to testing FastAPI applications?",
    "Missing skill question: How do you manage dependencies in FastAPI?",
    "Missing skill question: What is your experience with deploying FastAPI applications to production?",
    "coading question: How do you handle errors and exceptions in FastAPI?",
    "coading question: Can you explain how to use middleware in FastAPI?",
    "dsa question: How do you optimize database queries in FastAPI applications?",
    "hr_question: How do you handle conflicts in a team setting?",
    "hr_question: Describe a time when you had to learn a new technology quickly.",
    "hr_question: How do you prioritize tasks when working on multiple projects?",
    "hr_question: What motivates you to perform well in your job?",
  ],
  "ats_score": [62],  # Example score
  "ats_summary": "The ATS score is based on keyword match, relevance of past roles, format, and clarity. The resume scored 62 out of 100 due to missing keywords related to FastAPI and CI/CD. To improve the score, consider adding specific projects or experiences that highlight these skills."
}}

### Resume Text:
{resume_text}

### Job Description:
{job_description}
"""

    response = model.generate_content(prompt)
    return response.text
