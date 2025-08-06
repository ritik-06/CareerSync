# from fastapi import APIRouter, HTTPException
# from app.models.user_model import AdminCreate, AdminLogin
# from app.auth.password_utils import hash_password, verify_password
# from app.auth.jwt_handler import create_access_token
# from app.config import MONGO_URI
# import motor.motor_asyncio

# router = APIRouter()
# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
# db = client["job_platform"]
# admin_collection = db["admins"]

# @router.post("/register")
# async def register_admin(admin: AdminCreate):
#     existing = await admin_collection.find_one({"username": admin.username})
#     if existing:
#         raise HTTPException(status_code=400, detail="Admin already exists")
    
#     admin_dict = admin.dict()
#     admin_dict["password"] = hash_password(admin.password)
#     await admin_collection.insert_one(admin_dict)
#     return {"message": "Admin registered successfully"}

# @router.post("/login")
# async def login_admin(admin: AdminLogin):
#     existing = await admin_collection.find_one({"username": admin.username})
#     if not existing or not verify_password(admin.password, existing["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     token = create_access_token({"sub": existing["username"], "role": "admin"})
#     return {"access_token": token, "token_type": "bearer"}






from fastapi import APIRouter, HTTPException, Depends, Request
from app.models.user_model import AdminCreate, AdminLogin
from app.auth.password_utils import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.auth.jwt_bearer import JWTBearer
from app.config import MONGO_URI
import motor.motor_asyncio
from app.models.job_model import JobCreate
from app.auth.jwt_bearer import JWTBearer
from bson import ObjectId
from app.auth.jwt_bearer import JWTBearer


router = APIRouter()
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["job_platform"]
admin_collection = db["admins"]
job_collection = db["jobs"]
application_collection = db["applications"]

@router.get("/dashboard")
async def admin_dashboard(token=Depends(JWTBearer())):
    return {"message": "You are logged in as an admin"}

@router.post("/register")
async def register_admin(admin: AdminCreate):
    existing = await admin_collection.find_one({"username": admin.username})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    admin_dict = admin.dict()
    admin_dict["password"] = hash_password(admin.password)
    await admin_collection.insert_one(admin_dict)
    return {"message": "Admin registered successfully"}

@router.post("/login")
async def login_admin(admin: AdminLogin):
    existing = await admin_collection.find_one({"username": admin.username})
    if not existing or not verify_password(admin.password, existing["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": existing["username"], "role": "admin"})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/post-job", dependencies=[Depends(JWTBearer())])
async def post_job(job: JobCreate):
    job_dict = job.dict()
    print("Job data to be inserted:", job_dict)
    result = await job_collection.insert_one(job_dict)
    return {"message": "Job posted successfully", "job_id": str(result.inserted_id)}


@router.get("/all-jobs", dependencies=[Depends(JWTBearer())])
async def get_all_jobs():
    jobs_cursor = job_collection.find()
    jobs = []
    async for job in jobs_cursor:
        job["_id"] = str(job["_id"])
        jobs.append(job)
    return jobs

@router.get("/view-applications/{job_id}", dependencies=[Depends(JWTBearer())])
async def view_applications(job_id: str):
    apps_cursor = application_collection.find({"job_id": job_id})
    apps = []
    async for app in apps_cursor:
        app["_id"] = str(app["_id"])
        apps.append(app)
    return apps

@router.get("/admin-jobs/{admin_id}", dependencies=[Depends(JWTBearer())])
async def get_jobs_by_admin(admin_id: str):
    jobs_cursor = job_collection.find({"admin_id": admin_id})
    jobs = []
    async for job in jobs_cursor:
        job["_id"] = str(job["_id"])
        jobs.append(job)
    return jobs


