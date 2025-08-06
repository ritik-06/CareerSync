from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, admin_routes, analysis_routes

app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Or use ["*"] for dev
#     allow_credentials=True,
#     allow_methods=["*"],  # This is REQUIRED to avoid 405 on OPTIONS
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # or specific: ["GET", "POST"]
    allow_headers=["*"],
)

app.include_router(user_routes.router, prefix="/user", tags=["User"])
app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])
app.include_router(analysis_routes.router, prefix="/analysis", tags=["AI Analysis"])
