from sqlalchemy import create_engine, Column, Integer, String, JSON, DateTime, Text, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

DATABASE_URL = "sqlite:///./energy_hub.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Record(Base):
    __tablename__ = "records"
    
    id = Column(Integer, primary_key=True, index=True)
    tool_id = Column(String, index=True)  # Equivalent to toolId in frontend
    name = Column(String, index=True, nullable=True)
    convention_type = Column(String, nullable=True)  # Equivalent to conventionType
    details = Column(JSON, nullable=True)  # Store JSON details
    user_description = Column(Text, nullable=True)  # Equivalent to userDescription
    date_created = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    __table_args__ = (
        UniqueConstraint('tool_id', 'name', name='_tool_name_uc'),
    )

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_database():
    """Ensure the database tables exist"""
    Base.metadata.create_all(bind=engine)
    
def get_last_updated_timestamp(db, tool_id):
    """Get the most recent last_updated timestamp for a tool"""
    from sqlalchemy import func
    timestamp = db.query(func.max(Record.last_updated)).filter(Record.tool_id == tool_id).scalar()
    return timestamp
