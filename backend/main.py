from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
import json
import os

from database import get_db, Record, init_database, get_last_updated_timestamp

app = FastAPI(title="Essential Energy Automation Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecordCreate(BaseModel):
    name: Optional[str] = None
    conventionType: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    userDescription: Optional[str] = None

class RecordUpdate(BaseModel):
    name: Optional[str] = None
    conventionType: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    userDescription: Optional[str] = None

class RecordResponse(BaseModel):
    id: int
    name: Optional[str] = None
    conventionType: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    userDescription: Optional[str] = None
    dateCreated: datetime
    
    class Config:
        orm_mode = True

@app.post("/api/init/{tool_id}")
async def init_tool_database(tool_id: str, db: Session = Depends(get_db)):
    """Initialize the database for a specific tool"""
    return {"status": "success", "message": f"Database initialized for {tool_id}"}

@app.post("/api/records/{tool_id}", response_model=RecordResponse)
async def save_record(tool_id: str, record: RecordCreate, db: Session = Depends(get_db)):
    """Save a record to the database"""
    existing_record = db.query(Record).filter(
        Record.tool_id == tool_id, 
        Record.name == record.name
    ).first()
    
    if existing_record:
        if record.conventionType is not None:
            existing_record.convention_type = record.conventionType
        if record.details is not None:
            existing_record.details = record.details
        if record.userDescription is not None:
            existing_record.user_description = record.userDescription
            
        existing_record.last_updated = datetime.utcnow()
        db.commit()
        db.refresh(existing_record)
        
        return RecordResponse(
            id=existing_record.id,
            name=existing_record.name,
            conventionType=existing_record.convention_type,
            details=existing_record.details,
            userDescription=existing_record.user_description,
            dateCreated=existing_record.date_created
        )
    
    db_record = Record(
        tool_id=tool_id,
        name=record.name,
        convention_type=record.conventionType,
        details=record.details,
        user_description=record.userDescription,
        date_created=datetime.utcnow(),
        last_updated=datetime.utcnow()
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    
    return RecordResponse(
        id=db_record.id,
        name=db_record.name,
        conventionType=db_record.convention_type,
        details=db_record.details,
        userDescription=db_record.user_description,
        dateCreated=db_record.date_created
    )

@app.get("/api/records/{tool_id}", response_model=List[RecordResponse])
async def get_records(tool_id: str, db: Session = Depends(get_db)):
    """Get all records for a specific tool"""
    records = db.query(Record).filter(Record.tool_id == tool_id).all()
    
    return [
        RecordResponse(
            id=record.id,
            name=record.name,
            conventionType=record.convention_type,
            details=record.details,
            userDescription=record.user_description,
            dateCreated=record.date_created
        ) for record in records
    ]

@app.put("/api/records/{tool_id}/{record_id}", response_model=RecordResponse)
async def update_record(tool_id: str, record_id: int, updates: RecordUpdate, db: Session = Depends(get_db)):
    """Update a record in the database"""
    record = db.query(Record).filter(Record.tool_id == tool_id, Record.id == record_id).first()
    
    if not record:
        raise HTTPException(status_code=404, detail=f"Record with ID {record_id} not found")
    
    if updates.name is not None:
        record.name = updates.name
    
    if updates.conventionType is not None:
        record.convention_type = updates.conventionType
    
    if updates.details is not None:
        record.details = updates.details
    
    if updates.userDescription is not None:
        record.user_description = updates.userDescription
    
    record.last_updated = datetime.utcnow()
    
    db.commit()
    db.refresh(record)
    
    return RecordResponse(
        id=record.id,
        name=record.name,
        conventionType=record.convention_type,
        details=record.details,
        userDescription=record.user_description,
        dateCreated=record.date_created
    )

@app.delete("/api/records/{tool_id}/{record_id}")
async def delete_record(tool_id: str, record_id: int, db: Session = Depends(get_db)):
    """Delete a record from the database"""
    record = db.query(Record).filter(Record.tool_id == tool_id, Record.id == record_id).first()
    
    if not record:
        raise HTTPException(status_code=404, detail=f"Record with ID {record_id} not found")
    
    db.delete(record)
    db.commit()
    
    return {"status": "success", "message": f"Record with ID {record_id} deleted"}

@app.get("/api/database/download")
async def download_database(db: Session = Depends(get_db)):
    """Download the entire database as JSON"""
    tool_records = {}
    
    all_records = db.query(Record).all()
    
    for record in all_records:
        if record.tool_id not in tool_records:
            tool_records[record.tool_id] = {
                "version": 1,
                "records": [],
                "lastUpdated": datetime.utcnow().isoformat()
            }
        
        tool_records[record.tool_id]["records"].append({
            "id": record.id,
            "name": record.name,
            "conventionType": record.convention_type,
            "details": record.details,
            "userDescription": record.user_description,
            "dateCreated": record.date_created.isoformat()
        })
    
    return tool_records

@app.get("/api/last-updated/{tool_id}")
async def last_updated(tool_id: str, db: Session = Depends(get_db)):
    """Get the last updated timestamp for a tool"""
    timestamp = get_last_updated_timestamp(db, tool_id)
    
    if not timestamp:
        return {"lastUpdated": None}
    
    return {"lastUpdated": timestamp.isoformat()}

@app.on_event("startup")
async def startup_event():
    """Initialize the database on startup"""
    init_database()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
