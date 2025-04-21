import yaml
from pathlib import Path

def load_sites_config(path: str = "backend/config/sites.yaml") -> list:
    config_path = Path(path)
    if not config_path.exists():
        raise FileNotFoundError(f"Site config not found at {path}")
    with config_path.open("r") as f:
        return yaml.safe_load(f).get("sites", [])
