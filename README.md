# ElectroShop - Electronics Store

## Setup

### 1. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Run the app

**Option A — Double-click `start.bat`** (easiest on Windows)

**Option B — Two terminals:**
```bash
# Terminal 1 (backend)
cd backend
node server.js

# Terminal 2 (frontend)
cd frontend
npm run dev
```

### URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (supports ?search= & ?category=) |
| GET | /api/products/categories | List all categories |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| GET | /api/cart/:sessionId | Get cart |
| POST | /api/cart/:sessionId | Add item to cart |
| PUT | /api/cart/:sessionId/:itemId | Update quantity |
| DELETE | /api/cart/:sessionId/:itemId | Remove item |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
