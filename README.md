# LeadFlowClean

Clean full-stack MVP for collecting leads and managing their statuses.

## Stack

- Frontend: React 18 + Vite 5
- Backend: Node.js + Express
- Storage: JSON file
- Notifications: Telegram Bot API

## Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Telegram configuration

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
ADMIN_CHAT_ID=your_chat_id
ADMIN_PASSWORD=your_admin_password
FRONTEND_URL=http://localhost:5173
PORT=5000
```

Copy `frontend/.env.example` to `frontend/.env` for local frontend API calls:

```env
VITE_API_URL=http://localhost:5000
```

## Run

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Open:

- Landing: http://localhost:5173/
- Admin: http://localhost:5173/admin
- API: http://localhost:5000/api/leads

## Deploy Backend To Render

Create a new Render Free Web Service from the `backend` folder.

Use:

```bash
npm install
```

as the build command, and:

```bash
npm start
```

as the start command.

Add these Render environment variables:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
ADMIN_CHAT_ID=your_chat_id
ADMIN_PASSWORD=your_admin_password
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=5000
```

Render also provides its own `PORT`; keeping `PORT=5000` locally is fine.

## Deploy Frontend To Vercel Or Netlify

Deploy the `frontend` folder.

Use:

```bash
npm install
npm run build
```

Build output:

```text
dist
```

Add this frontend environment variable:

```env
VITE_API_URL=https://your-render-backend.onrender.com
```

After deployment, put the final frontend URL into the backend `FRONTEND_URL` variable on Render so CORS allows the site.
