# MERN Sticker App

A MERN stack application for uploading and downloading WhatsApp stickers.

## Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express (Serverless ready)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary

## Setup (Local Development)

### Prerequisites
- Node.js
- MongoDB Atlas Connection String
- Cloudinary Account (Cloud Name, API Key, API Secret)

### 1. Backend Setup
1. Navigate to `/server`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your credentials.
   ```
   MONGODB_URI=...
   CLOUDINARY_CLOUD_NAME=...
   ...
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to `/client`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Deployment (Vercel)

This project is configured for Vercel Monorepo deployment.

1. Push this code to GitHub.
2. Import the project in Vercel.
3. **Important**: Configure Environment Variables in Vercel Dashboard:
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Deploy! creates `vercel.json` routing automatically.
