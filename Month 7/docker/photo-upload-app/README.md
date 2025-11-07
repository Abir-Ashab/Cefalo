# Photo Upload App

A modern photo uploading and gallery application built with Next.js, MinIO, and Tailwind CSS, fully containerized with Docker.

## Features

- 📸 Drag & drop photo upload
- 🖼️ Beautiful photo gallery with hover effects
- 🗑️ Delete photos functionality
- 📱 Responsive design with Tailwind CSS
- 🐳 Fully dockerized with Docker Compose
- 💾 MinIO object storage for scalable photo storage
- ⚡ Next.js 14 with App Router and TypeScript

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Storage**: MinIO (S3-compatible object storage)
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone <your-repo-url>
cd photo-upload-app
```

2. Start the application:
```bash
docker-compose up --build
```

3. Access the application:
   - **Photo App**: http://localhost:3000
   - **MinIO Console**: http://localhost:9001 (admin/minioadmin)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start MinIO locally:
```bash
docker run -p 9000:9000 -p 9001:9001 --name minio \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  minio/minio server /data --console-address ":9001"
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MINIO_ENDPOINT | MinIO server endpoint | localhost |
| MINIO_PORT | MinIO server port | 9000 |
| MINIO_ACCESS_KEY | MinIO access key | minioadmin |
| MINIO_SECRET_KEY | MinIO secret key | minioadmin |
| MINIO_BUCKET_NAME | Storage bucket name | photos |
| MINIO_USE_SSL | Use SSL for MinIO | false |

## Project Structure

```
photo-upload-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload/
│   │   │   └── photos/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── PhotoUpload.tsx
│   │   └── PhotoGallery.tsx
│   └── lib/
│       └── minio.ts
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## API Endpoints

- `POST /api/upload` - Upload a photo
- `GET /api/photos` - Get all photos
- `DELETE /api/photos/[id]` - Delete a photo

## Deployment

### Production with Docker

1. Update environment variables in `.env.production`
2. Build and run:
```bash
docker-compose -f docker-compose.yml up --build -d
```

### Cloud Deployment

For cloud deployment, you can:
1. Use managed MinIO services (AWS S3, DigitalOcean Spaces, etc.)
2. Deploy to platforms like Vercel, Railway, or DigitalOcean App Platform
3. Use Kubernetes for orchestration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License