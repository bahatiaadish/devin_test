# Setup Guide – ACI Sentinel

This guide helps you get ACI Sentinel up and running locally using Python and Git.

---

## 🔧 Requirements
- Python 3.9+
- Git
- (Optional) Docker
- GitHub account (for code)

---

## 📦 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/aci-sentinel.git
cd aci-sentinel
```

---

## 🐍 2. Set Up Python Environment
```bash
python -m venv venv
venv\Scripts\activate     # On Windows
```

---

## 📥 3. Install Dependencies (once `requirements.txt` is added)
```bash
pip install -r requirements.txt
```

---

## 🚀 4. Run the Backend API (FastAPI)
```bash
uvicorn backend.main:app --reload
```

Visit `http://localhost:8000/docs` to view Swagger/OpenAPI documentation.

---

## 🧪 5. Test Modes
- Drop your ACI snapshot JSON files in:
  ```
  data/uploaded_snapshots/site-1/
  ```
- Add your site metadata in:
  ```
  backend/config/sites.yaml
  ```

---

## ✅ You're Ready!

Start testing logic modules, view drill-down insights, or upload offline JSONs directly.

For help with GitHub pushes:
```bash
git add .
git commit -m "Message"
git push
```
