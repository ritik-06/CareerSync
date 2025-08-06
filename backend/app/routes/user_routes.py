# from fastapi import APIRouter, HTTPException, Depends
# from app.models.user_model import UserCreate, UserLogin
# from app.auth.password_utils import hash_password, verify_password
# from app.auth.jwt_handler import create_access_token
# from app.config import MONGO_URI
# import motor.motor_asyncio

# router = APIRouter()
# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
# db = client["job_platform"]
# user_collection = db["users"]

# @router.post("/register")
# async def register(user: UserCreate):
#     existing = await user_collection.find_one({"email": user.email})
#     if existing:
#         raise HTTPException(status_code=400, detail="User already exists")
    
#     user_dict = user.dict()
#     user_dict["password"] = hash_password(user.password)
#     await user_collection.insert_one(user_dict)
#     return {"message": "User registered successfully"}

# @router.post("/login")
# async def login(user: UserLogin):
#     existing = await user_collection.find_one({"email": user.email})
#     if not existing or not verify_password(user.password, existing["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     token = create_access_token({"sub": existing["email"]})
#     return {"access_token": token, "token_type": "bearer"}



from fastapi import APIRouter, HTTPException, Depends
from app.models.user_model import UserCreate, UserLogin
from app.models.user_model import AdminCreate, AdminLogin
from app.auth.password_utils import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.auth.jwt_bearer import JWTBearer
from app.config import MONGO_URI
import motor.motor_asyncio
from datetime import datetime  # required for post-job
from fastapi import UploadFile, File, Form
import os
from app.services.resume_parser import extract_text_from_pdf
from app.services.gemini_analysis import analyze_resume
from app.services.youtube_fetcher import get_youtube_links, get_serpapi_links
from app.models.application_model import ApplicationCreate
from app.utils.serializers import serialize_mongo_document
from bson import ObjectId
from app.utils.serializers import serialize_mongo_document

router = APIRouter()
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["job_platform"]
admin_collection = db["admins"]
user_collection = db["users"]
application_collection = db["applications"]
job_collection = db["jobs"]


@router.get("/profile")
async def get_user_profile(token=Depends(JWTBearer())):
    return {"message": "You are logged in as a user"}


@router.post("/register")
async def register(user: UserCreate):
    existing = await user_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    await user_collection.insert_one(user_dict)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: UserLogin):
    existing = await user_collection.find_one({"email": user.email})
    if not existing or not verify_password(user.password, existing["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # token = create_access_token({"sub": existing["email"]})
    token = create_access_token({"sub": existing["email"], "role": "user"})

    return {"access_token": token, "token_type": "bearer"}

@router.post("/apply-job")
async def apply_job(user_id: str = Form(...), job_id: str = Form(...), file: UploadFile = File(...)):
    # Ensure temp directory exists
    os.makedirs("temp", exist_ok=True)

    # Save PDF
    file_location = f"temp/{file.filename}"
    with open(file_location, "wb+") as f:
        f.write(await file.read())

    # Extract text
    resume_text = extract_text_from_pdf(file_location)

    # Get job description
    job = await job_collection.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Gemini AI analysis
    # ai_response = await analyze_resume(resume_text, job[("description", "title", "skills_required", "technologies")])
    ai_response = await analyze_resume(
        resume_text,
        {
            "description": job.get("description", ""),
            "title": job.get("title", ""),
            "skills_required": job.get("skills_required", []),
            "technologies": job.get("technologies", [])
        }
    )
    #print(ai_response)
    import re

    def clean_json_response(response_str):
        cleaned = re.sub(r"^```(json)?|```$", "", response_str.strip(), flags=re.MULTILINE)
        return cleaned
    
    ai_response = clean_json_response(ai_response)
    #print(ai_response)
    import json
    try:
        parsed_result = json.loads(ai_response)
    except Exception as e:
        parsed_result = {
            "matched_skills": [],
            "missing_skills": [],
            "learning_plan": [],
            "learning_roadmap": [],
            "youtube_links": [],
            "serpapi_links": [],
            "career_path": [],
            "aptitude_questions": [],
            "interview_questions": [],
            "ats_score": 0
        }
    print(parsed_result)

    # Fetch resources
    yt_links = get_youtube_links(parsed_result["missing_skills"])
    serpapi_links = get_serpapi_links(parsed_result["missing_skills"])
    print("YouTube Links:", yt_links)
    print("SERPAPI Links:", serpapi_links)

    # Save to MongoDB
    app_data = {
        "user_id": user_id,
        "job_id": job_id,
        "resume_text": resume_text,
        "matched_skills": parsed_result["matched_skills"],
        "missing_skills": parsed_result["missing_skills"],
        "learning_plan": parsed_result["learning_plan"],
        "learning_roadmap": parsed_result.get("learning_roadmap", []),
        "career_path": parsed_result.get("career_path", []),
        "aptitude_questions": parsed_result.get("aptitude_questions", []),
        "interview_questions": parsed_result.get("interview_questions", []),
        "ats_score": parsed_result.get("ats_score", 0),
        "ats_summary": parsed_result.get("ats_summary", ""),
        "youtube_links": yt_links,
        "serpapi_links": serpapi_links
    }
    result = await application_collection.insert_one(app_data)

    # Fetch saved data
    saved = await application_collection.find_one({"_id": result.inserted_id})
    return serialize_mongo_document(saved)


@router.get("/all-jobs", dependencies=[Depends(JWTBearer())])
async def get_all_jobs():
    jobs_cursor = job_collection.find()
    jobs = []
    async for job in jobs_cursor:
        job["_id"] = str(job["_id"])
        jobs.append(job)
    return jobs



@router.get("/job/{job_id}", dependencies=[Depends(JWTBearer())])
async def get_job_by_id(job_id: str):
    job = await job_collection.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    job["_id"] = str(job["_id"])
    return job




# Add these endpoints to your existing user router (paste-2.txt)

@router.get("/user/{user_id}/applications", dependencies=[Depends(JWTBearer())])
async def get_user_applications(user_id: str):
    """Get all applications for a specific user with job details"""
    try:
        # Get all applications for the user
        applications_cursor = application_collection.find({"user_id": user_id})
        applications = []
        
        async for app in applications_cursor:
            # Get job details for each application
            job = await job_collection.find_one({"_id": ObjectId(app["job_id"])})
            
            if job:
                application_data = {
                    "_id": str(app["_id"]),
                    "job_id": str(app["job_id"]),
                    "job_title": job.get("title", "Unknown"),
                    "company_name": job.get("company_name", "Unknown Company"),
                    "status": "pending",  # You can add status field to your application model
                    "applied_date": app.get("created_at", datetime.now()).strftime("%Y-%m-%d") if isinstance(app.get("created_at"), datetime) else datetime.now().strftime("%Y-%m-%d"),
                    "matched_skills_count": len(app.get("matched_skills", [])),
                    "missing_skills_count": len(app.get("missing_skills", []))
                }
                applications.append(application_data)
        
        return {
            "total_applications": len(applications),
            "applications": applications
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching applications: {str(e)}")


@router.get("/application/{application_id}", dependencies=[Depends(JWTBearer())])
async def get_application_analysis(application_id: str):
    """Get detailed analysis for a specific application"""
    try:
        # Validate ObjectId format
        if not ObjectId.is_valid(application_id):
            raise HTTPException(status_code=400, detail="Invalid application ID format")
        
        # Get application data
        application = await application_collection.find_one({"_id": ObjectId(application_id)})
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        # Get job details
        job = await job_collection.find_one({"_id": ObjectId(application["job_id"])})
        if not job:
            raise HTTPException(status_code=404, detail="Associated job not found")
        
        # Prepare response data
        analysis_data = {
            "_id": str(application["_id"]),
            "job_details": {
                "title": job.get("title", "Unknown"),
                "company_name": job.get("company_name", "Unknown Company"),
                "description": job.get("description", ""),
                "location": job.get("location", ""),
                "salary": job.get("salary", ""),
                "job_type": job.get("job_type", "")
            },
            "analysis": {
                "matched_skills": application.get("matched_skills", []),
                "missing_skills": application.get("missing_skills", []),
                "career_path": application.get("career_path", []),
                "learning_plan": application.get("learning_plan", []),
                "learning_roadmap": application.get("learning_roadmap", []),
                "youtube_links": application.get("youtube_links", []),
                "serpapi_links": application.get("serpapi_links", []),
                "aptitude_questions": application.get("aptitude_questions", []),
                "interview_questions": application.get("interview_questions", []),
                "ats_score": application.get("ats_score", 0),
                "ats_summary": application.get("ats_summary", "")
            },
            "applied_date": application.get("created_at", datetime.now()).strftime("%Y-%m-%d %H:%M") if isinstance(application.get("created_at"), datetime) else datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        
        return analysis_data
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error fetching application analysis: {str(e)}")


# # Also update your apply-job endpoint to include created_at timestamp
# @router.post("/apply-job")
# async def apply_job(user_id: str = Form(...), job_id: str = Form(...), file: UploadFile = File(...)):
#     # ... your existing code ...
    
#     # Save to MongoDB (update this part)
#     app_data = {
#         "user_id": user_id,
#         "job_id": job_id,
#         "resume_text": resume_text,
#         "matched_skills": parsed_result["matched_skills"],
#         "missing_skills": parsed_result["missing_skills"],
#         "learning_plan": parsed_result["learning_plan"],
#         "learning_roadmap": parsed_result.get("learning_roadmap", []),
#         "career_path": parsed_result.get("career_path", []),
#         "youtube_links": yt_links,
#         "serpapi_links": serpapi_links,
#         "created_at": datetime.now(),  # Add timestamp
#         "status": "pending"  # Add status field
#     }
#     result = await application_collection.insert_one(app_data)

#     # ... rest of your existing code ...