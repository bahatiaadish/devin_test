from fastapi import FastAPI
from backend.utils.config_loader import load_sites_config
from backend.api import endpoints

app = FastAPI(title="ACI Sentinel API", version="0.1")

# Load site config on startup
sites = load_sites_config()

@app.on_event("startup")
def startup_event():
    print("✅ ACI Sentinel API starting up...")
    print(f"Loaded {len(sites)} site(s): {[site['name'] for site in sites]}")

# Mount endpoints
app.include_router(endpoints.router)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/sites")
def get_sites():
    return sites
