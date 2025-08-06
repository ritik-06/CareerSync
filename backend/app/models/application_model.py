from pydantic import BaseModel
from typing import List, Optional
from typing import Optional

class ApplicationCreate(BaseModel):
    user_id: str
    job_id: str
    resume_text: Optional[str] = None
    matched_skills: Optional[list] = []
    missing_skills: Optional[list] = []
    learning_plan: Optional[list] = []
    learning_roadmap: Optional[list] = []
    youtube_links: Optional[List[str]] = []
    serpapi_links: Optional[List[str]] = []
    career_path: Optional[list] = []
    aptitude_questions: Optional[list] = []
    interview_questions: Optional[list] = []
    ats_score: Optional[int] = 0
    ats_summary: Optional[str] = None