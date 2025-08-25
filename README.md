# Hello everyone 👋  
This is my first test task for internship. I was very nervous while working on it, and I really hope you will like it.  

---

# 🦸 Hero App

Full-stack застосунок для керування супергероями.  
**Frontend:** Vite + React + TypeScript + React Router DOM + MUI  
**Backend:** Node.js + Express + Prisma (SQLite) + Multer  

---

## 📂 Структура проєкту
```
HERO-APP/
  client/   # Frontend (Vite + React + TS + MUI)
  server/   # Backend (Express + Prisma + SQLite)
```

---

## 🚀 Швидкий старт

### 🔧 Backend
```bash
cd server
npm install
echo DATABASE_URL="file:./prisma/dev.db" > .env
npx prisma migrate dev --name init    # створює БД
npm run dev                           # запуск сервера
```

- Сервер працює на `http://localhost:4000`  
- Статичні файли доступні за `/uploads`  
- Контролер повертає абсолютні URL (наприклад: `http://localhost:4000/uploads/xxx.jpg`)  

### 💻 Frontend
```bash
cd client
npm install
npm i @mui/material @emotion/react @emotion/styled react-router-dom
echo VITE_API_URL=http://localhost:4000 > .env
npm run dev                           # запуск фронтенду
```

Фронт доступний на `http://localhost:5173`.

---

## 🔌 API

Базовий URL: `http://localhost:4000/api`

- `GET /heroes?page=1&limit=5` – список героїв (з пагінацією)  
- `GET /heroes/:id` – деталі героя  
- `POST /heroes` – створення героя  
- `PUT /heroes/:id` – оновлення героя  
- `DELETE /heroes/:id` – видалення героя  
- `POST /heroes/:id/images` – завантаження зображень (`multipart/form-data`, поле `images`, до 10 файлів)  
- `DELETE /heroes/:id/images/:imageId` – видалення зображення  

> Статичні файли: `GET /uploads/<filename>`

---

## 🧱 Використані технології

### Backend
- **Express** – REST API  
- **Prisma (SQLite)** – ORM  
- **Multer** – завантаження зображень у `server/uploads`  
- **TypeScript**, **ts-node-dev** – дев-сервер  

### Frontend
- **Vite + React + TS**  
- **React Router DOM** – маршрутизація  
- **MUI** – UI-компоненти  
- Власні стилі (`src/styles.css`)  

---

## 🧭 Маршрути фронтенду

- `/` – список героїв з пагінацією  
- `/heroes/new` – створення героя  
- `/heroes/:id` – деталі героя + менеджмент зображень  
- `/heroes/:id/edit` – редагування героя  

---

## ⚙️ Змінні середовища

### `client/.env`
```env
VITE_API_URL=http://localhost:4000
```

### `server/.env` (для Prisma)
```env
DATABASE_URL="file:./prisma/dev.db"
```

---

## 🧪 Приклади запитів

**Створити героя**
```bash
curl -X POST http://localhost:4000/api/heroes   -H "Content-Type: application/json"   -d '{"nickname":"Super","realName":"Man","originDescription":"...", "catchPhrase":"Justice!", "superpowers":["flight","laser vision"]}'
```

**Завантажити зображення**
```bash
curl -X POST http://localhost:4000/api/heroes/1/images   -F "images=@/path/to/photo1.jpg"   -F "images=@/path/to/photo2.jpg"
```

---

## 📌 Корисні скрипти

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

## 📝 Нотатки

- При зміні схеми БД:
  ```bash
  cd server
  npx prisma migrate dev --name <change>
  ```
- Якщо картинки не підтягуються – перевір правильність абсолютного URL з бекенду та використання `src={img.url}` на фронтенді.  

---

✅ Готово:  
- Backend: [http://localhost:4000](http://localhost:4000)  
- Frontend: [http://localhost:5173](http://localhost:5173)  
