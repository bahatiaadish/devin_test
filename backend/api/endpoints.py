from fastapi import APIRouter

router = APIRouter()

@router.get("/mode")
def get_mode():
    # Placeholder for dynamic online/offline mode detection
    return {"mode": "offline"}
