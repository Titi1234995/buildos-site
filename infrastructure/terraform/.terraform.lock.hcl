# This file is maintained automatically by "terraform init".
TF

cat > infrastructure/scripts/setup.sh << 'SETUP'
#!/bin/bash
set -euo pipefail

echo "🚀 BuildOS Infrastructure Setup"
echo "================================"

# Prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js required"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "⚠️  Docker recommended"; }
command -v vercel >/dev/null 2>&1 || npm i -g vercel

echo "✅ Prerequisites checked"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Environment setup
if [ ! -f .env.local ]; then
  echo "🔧 Creating .env.local..."
  cat > .env.local << EOF
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
EOF
  echo "⚠️  Fill in your .env.local values!"
fi

# Database setup (if local)
if command -v docker &>/dev/null; then
  echo "🐳 Starting local services..."
  docker compose up -d qdrant 2>/dev/null || true
fi

echo ""
echo "✅ Setup complete! Run:"
echo "   npm run dev     → Start development server"
echo "   npm run build   → Production build"
echo "   vercel deploy   → Deploy to Vercel"
SETUP
chmod +x infrastructure/scripts/setup.sh

cat > infrastructure/monitoring/prometheus.yml << 'PROM'
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'buildos-web'
    static_configs:
      - targets: ['web:3000']
    metrics_path: '/api/metrics'
PROM

echo "Infrastructure created ✅"
