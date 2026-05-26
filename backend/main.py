import os
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, SQLModel, Session, create_engine, select
from contextlib import asynccontextmanager

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname")
engine = create_engine(DATABASE_URL)

class Feature(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    icon: str

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    create_db_and_tables()
    yield
    # Clean up the ML models and release the resources

app = FastAPI(lifespan=lifespan)

# CORS configuration for frontend
app.add_middleware(
 CORSMiddleware,
 allow_origins=["*"], # In production, replace with frontend URL
 allow_credentials=True,
 allow_methods=["*"],
 allow_headers=["*"],
)

@app.get("/api/features", response_model=List[Feature])
def read_features(session: Session = Depends(get_session)):
    features = session.exec(select(Feature)).all()
    if not features:
        # Seed some data if empty
        seed_features = [
            Feature(title="Real-time Tracking", description="Monitor shipments globally with precision.", icon="MapPin"),
            Feature(title="AI Optimization", description="Smart routing powered by neural networks.", icon="Cpu"),
            Feature(title="Secure Storage", description="Blockchain-backed data integrity for logs.", icon="Shield"),
            Feature(title="Global Network", description="Connect with 500+ logistics hubs worldwide.", icon="Globe"),
        ]
        for f in seed_features:
            session.add(f)
        session.commit()
        features = session.exec(select(Feature)).all()
    return features

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
