from pydantic import BaseModel
from typing import List, Optional

class JobCreate(BaseModel):
    admin_name: str
    title: str
    description: str
    skills_required: List[str]
    technologies: List[str]
    salary: Optional[str]
    location: Optional[str]
    deadline: Optional[str]

class JobInDB(JobCreate):
    id: Optional[str]
