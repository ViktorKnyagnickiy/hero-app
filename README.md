# Hello everyone 👋  
This is my first test task for internship. I was very nervous while working on it, and I really hope you will like it.  

---

# 🦸 Hero App

Full-stack application for managing superheroes.  
**Frontend:** Vite + React + TypeScript + React Router DOM + MUI  
**Backend:** Node.js + Express + Prisma (SQLite) + Multer  

---

## 📂 Project Structure
```
HERO-APP/
  client/   # Frontend (Vite + React + TS + MUI)
  server/   # Backend (Express + Prisma + SQLite)
```

---

## 🚀 Quick Start

### 🔧 Backend
```bash
cd server
npm install
echo DATABASE_URL="file:./prisma/dev.db" > .env
npx prisma migrate dev --name init    # creates DB
npm run dev                           # run the server
```

- Server runs on `http://localhost:4000`  
- Static files are served at `/uploads`  
- Controller returns absolute URLs (e.g. `http://localhost:4000/uploads/xxx.jpg`)  

### 💻 Frontend
```bash
cd client
npm install
npm i @mui/material @emotion/react @emotion/styled react-router-dom
echo VITE_API_URL=http://localhost:4000 > .env
npm run dev                           # run frontend
```

Frontend runs on `http://localhost:5173`.

---

## 🔌 API

Base URL: `http://localhost:4000/api`

- `GET /heroes?page=1&limit=5` – get heroes list (with pagination)  
- `GET /heroes/:id` – get hero details  
- `POST /heroes` – create hero  
- `PUT /heroes/:id` – update hero  
- `DELETE /heroes/:id` – delete hero  
- `POST /heroes/:id/images` – upload images (`multipart/form-data`, field `images`, up to 10 files)  
- `DELETE /heroes/:id/images/:imageId` – delete image  

> Static files: `GET /uploads/<filename>`

---

## 🧱 Tech Stack

### Backend
- **Express** – REST API  
- **Prisma (SQLite)** – ORM  
- **Multer** – image uploads to `server/uploads`  
- **TypeScript**, **ts-node-dev** – dev server  

### Frontend
- **Vite + React + TS**  
- **React Router DOM** – routing  
- **MUI** – UI components  
- Custom styles (`src/styles.css`)  

---

## 🧭 Frontend Routes

- `/` – heroes list with pagination  
- `/heroes/new` – create hero  
- `/heroes/:id` – hero details + image management  
- `/heroes/:id/edit` – edit hero  

---

## ⚙️ Environment Variables

### `client/.env`
```env
VITE_API_URL=http://localhost:4000
```

### `server/.env` (for Prisma)
```env
DATABASE_URL="file:./prisma/dev.db"
```

---

## 🧪 Request Examples

**Create hero**
```bash
curl -X POST http://localhost:4000/api/heroes   -H "Content-Type: application/json"   -d '{"nickname":"Super","realName":"Man","originDescription":"...", "catchPhrase":"Justice!", "superpowers":["flight","laser vision"]}'
```

**Upload images**
```bash
curl -X POST http://localhost:4000/api/heroes/1/images   -F "images=@/path/to/photo1.jpg"   -F "images=@/path/to/photo2.jpg"
```

---

## 📌 Useful Scripts

### server/package.json
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "generate": "prisma generate",
    "migrate": "prisma migrate dev"
  }
}
```

### client/package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📝 Notes

- When changing DB schema:
  ```bash
  cd server
  npx prisma migrate dev --name <change>
  ```
- If images are not showing – check that backend returns absolute URL and frontend uses `src={img.url}`.  

---

✅ Done:  
- Backend: [http://localhost:4000](http://localhost:4000)  
- Frontend: [http://localhost:5173](http://localhost:5173)  
