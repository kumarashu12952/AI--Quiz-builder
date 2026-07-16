# Deployment Guide

## Prerequisites
- Node.js 16+
- MongoDB Atlas Account
- OpenAI API Key
- GitHub Account
- Vercel or Heroku Account (for deployment)

## Environment Setup

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz_builder
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your-openai-api-key
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-api.com/api
```

## Deploying to Heroku (Backend)

1. **Create Heroku App**
   ```bash
   heroku login
   heroku create quiz-builder-api
   ```

2. **Add Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set OPENAI_API_KEY=your_openai_key
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## Deploying to Vercel (Frontend)

1. **Connect GitHub Repository**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   - `VITE_API_URL`: Your backend API URL

4. **Deploy**
   - Vercel will automatically deploy on push to main

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

## Monitoring & Logging

- Use MongoDB Atlas monitoring tools
- Set up error tracking with Sentry
- Monitor API performance with New Relic
- Use PM2 for process management in production
