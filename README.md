# BuildOS — Construction AI Platform

> **The OS for the world's largest industry.**

## Quick Start

```bash
git clone https://github.com/buildos/site
cd buildos-site
npm install
npm run dev
```

## Project Structure

```
buildos-site/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Root layout (Header + Footer)
│   └── api/                # API routes
├── components/             # React components
│   ├── home/               # Landing page sections
│   ├── layout/             # Header, Footer
│   ├── product/            # Product pages
│   └── ui/                 # Design system (Button, Card, Badge)
├── lib/                    # Utilities
├── infrastructure/         # Deployment (Docker, Terraform)
├── ml/                     # AI/ML pipeline
│   ├── finetune/           # Llama 4 fine-tuning
│   ├── deploy/             # vLLM model serving
│   └── data/               # Training datasets
└── public/                 # Static assets
```

## Deployment

```bash
# Vercel (recommended)
vercel --prod

# Docker
docker build -t buildos-web .
docker run -p 3000:3000 buildos-web
```

## ML Pipeline

```bash
# Generate training data
python ml/finetune/dataset.py

# Fine-tune Llama 4
cd ml/finetune && python train.py --config config.yml

# Serve model
python ml/deploy/serve.py --model ./outputs/final
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Framer Motion
- **Infrastructure**: Vercel, AWS S3/CloudFront, Docker
- **AI**: Claude API, Llama 4 (fine-tuned), YOLOv11, SAM 2
- **Data**: Qdrant (vectors), PostgreSQL, Snowflake
