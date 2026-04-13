# HealthLens
An AI-powered diagnostic tool for dermatology and mental-health screening using Computer Vision + NLP. Product of Texas Luminescence 25-26.

## Monorepo Structure

```
HealthLens/
├── Frontend/          # Expo (React Native) mobile app
├── Backend/           # Express API (Node.js + TypeScript)
├── package.json       # Workspace root — run npm install here
└── README.md
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher (workspaces support)
- **Expo CLI**: `npm install -g @expo/cli`

**For iOS/Android development:**
- **Expo Go** on your mobile device, or a simulator/emulator

## Installation

1. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd HealthLens
   ```

2. **Install all dependencies (frontend + backend):**
   ```bash
   npm install
   ```

3. **Backend — set up environment variables:**
   ```bash
   cp Backend/.env.example Backend/.env
   # Fill in your Firebase credentials
   ```

## Development

**Run frontend only:**
```bash
npm run dev:frontend
```

**Run backend only:**
```bash
npm run dev:backend
```

**Run both simultaneously:**
```bash
npm run dev
```

## Backend API

REST API sitting at `Backend/` — Express 4, TypeScript, Firebase Admin.

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| `GET` | `/health` | No | Liveness check |
| `GET` | `/api/v1/me` | Bearer token | Returns `{ uid }` |
| `POST` | `/api/v1/uploads` | Bearer | Signed URL upload (WIP) |
| `POST` | `/api/v1/classify` | Bearer | Start classification job (WIP) |
| `GET` | `/api/v1/classify/:jobId` | Bearer | Poll job status (WIP) |

Set `EXPO_PUBLIC_API_BASE_URL` in your `.env` (e.g. `http://localhost:3000`) and use `fetchWithAuth` from `AuthContext.tsx` to call the API.

## Firebase Credentials

Choose one approach:
- Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of your service account JSON
- Set `FIREBASE_SERVICE_ACCOUNT_JSON` to the raw JSON string

The Firebase project must match the one used in `Frontend/firebaseConfig.ts`.
