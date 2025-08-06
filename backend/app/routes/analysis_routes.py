# app/routes/analysis_routes.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
async def test_analysis():
    return {"message": "AI Analysis route working!"}
