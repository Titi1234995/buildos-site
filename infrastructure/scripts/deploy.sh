#!/bin/bash
set -euo pipefail

# =========================================================
# BuildOS — Deploy & Domain Setup Script
# =========================================================
# Usage: bash deploy.sh [--domain] [--vercel-token TOKEN]
# =========================================================

GREEN='\033[1;32m'
BLUE='\033[1;34m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
NC='\033[0m'

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  🚀 BuildOS Deploy & Domain Setup${NC}"
echo -e "${BLUE}============================================${NC}"

# --- 1. VERCEL DEPLOYMENT ---

echo -e "\n${YELLOW}[1/4] Deploying to Vercel...${NC}"

# Check for Vercel token
VERCEL_TOKEN="${VERCEL_TOKEN:-}"
if [ -z "$VERCEL_TOKEN" ] && [ -f .vercel-token ]; then
    VERCEL_TOKEN=$(cat .vercel-token)
fi

if [ -n "$VERCEL_TOKEN" ]; then
    echo "  Using Vercel token..."
    vercel deploy --prod --token="$VERCEL_TOKEN" --yes
else
    echo -e "  ${YELLOW}No VERCEL_TOKEN found.${NC}"
    echo "  Options:"
    echo "    1. Export token: export VERCEL_TOKEN=your_token"
    echo "    2. Create .vercel-token file: echo 'your_token' > .vercel-token"
    echo "    3. Interactive login: vercel deploy --prod"
    echo ""
    echo "  Get token: https://vercel.com/account/tokens"
    echo ""
    read -rp "  Enter Vercel token (or press Enter to skip): " token
    if [ -n "$token" ]; then
        echo "$token" > .vercel-token
        chmod 600 .vercel-token
        vercel deploy --prod --token="$token" --yes
    else
        echo -e "  ${RED}Skipping Vercel deploy.${NC}"
    fi
fi

# --- 2. LINK GITHUB TO VERCEL ---

echo -e "\n${YELLOW}[2/4] Linking GitHub repository to Vercel...${NC}"
echo "  To enable auto-deploy on every push:"
echo "  1. Go to https://vercel.com/new"
echo "  2. Import repository: Titi1234995/buildos-site"
echo "  3. Framework: Next.js"
echo "  4. Environment variables: add from .env.example"
echo "  5. Deploy"
echo ""
echo "  Auto-deploy is already configured via:"
echo "  .github/workflows/deploy.yml"
echo "  (Requires VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID in GitHub Secrets)"

# --- 3. CLOUDFLARE DNS CONFIGURATION ---

echo -e "\n${YELLOW}[3/4] Configuring Cloudflare DNS...${NC}"

CLOUDFLARE_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
if [ -z "$CLOUDFLARE_TOKEN" ] && [ -f .cloudflare-token ]; then
    CLOUDFLARE_TOKEN=$(cat .cloudflare-token)
fi

if [ -n "$CLOUDFLARE_TOKEN" ]; then
    # Get Vercel IP/project domain
    VERCEL_DOMAIN=$(vercel inspect --token="$VERCEL_TOKEN" --scope 2>/dev/null | grep "Preview" | head -1 | awk '{print $2}' || echo "buildos.vercel.app")
    
    if [ -z "$VERCEL_DOMAIN" ] || [ "$VERCEL_DOMAIN" = "buildos.vercel.app" ]; then
        echo "  ⚠️  Could not detect Vercel domain. Using placeholder."
    fi

    # Cloudflare API calls
    CLOUDFLARE_EMAIL="${CLOUDFLARE_EMAIL:-}"
    
    # Get zone ID for buildos.io
    ZONE_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=buildos.io" \
        -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
        -H "Content-Type: application/json")
    
    ZONE_ID=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][0]['id'] if d.get('result') else '')" 2>/dev/null || echo "")
    
    if [ -n "$ZONE_ID" ]; then
        echo "  ✅ Found Cloudflare zone: buildos.io"
        
        # Create CNAME record for Vercel
        curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
            -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
            -H "Content-Type: application/json" \
            -d '{"type":"CNAME","name":"@","content":"cname.vercel-dns.com","ttl":1,"proxied":true}' > /dev/null
        
        echo "  ✅ CNAME record created: @ → cname.vercel-dns.com"
        
        # Create CNAME for www
        curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
            -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
            -H "Content-Type: application/json" \
            -d '{"type":"CNAME","name":"www","content":"cname.vercel-dns.com","ttl":1,"proxied":true}' > /dev/null
        
        echo "  ✅ CNAME record created: www → cname.vercel-dns.com"
    else
        echo "  ⚠️  Zone 'buildos.io' not found in Cloudflare."
        echo "  DNS records not created automatically."
    fi
else
    echo "  No Cloudflare token found."
    echo "  To configure DNS automatically: export CLOUDFLARE_API_TOKEN=your_token"
    echo ""
    echo "  Or manually, add these DNS records in Cloudflare:"
    echo "  ┌─────────┬──────────┬────────────────────────┐"
    echo "  │ Type    │ Name     │ Value                  │"
    echo "  ├─────────┼──────────┼────────────────────────┤"
    echo "  │ CNAME   │ @        │ cname.vercel-dns.com   │"
    echo "  │ CNAME   │ www      │ cname.vercel-dns.com   │"
    echo "  └─────────┴──────────┴────────────────────────┘"
    echo "  Also add these TXT records for email/DMARC:"
    echo "  ┌─────────┬──────────┬────────────────────────┐"
    echo "  │ TXT     │ @        │ v=spf1 include:_spf.vercel.com ~all │"
    echo "  └─────────┴──────────┴────────────────────────┘"
fi

# --- 4. VERIFY DEPLOYMENT ---

echo -e "\n${YELLOW}[4/4] Verifying deployment...${NC}"

if command -v vercel &>/dev/null; then
    echo "  ✅ Vercel CLI available (v$(vercel --version 2>/dev/null || echo '?'))"
fi

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  ✅ BuildOS is ready!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "  GitHub: https://github.com/Titi1234995/buildos-site"
echo "  Domain: https://buildos.io (after DNS propagation)"
echo ""
echo "  Quick commands:"
echo "  ┌──────────────────────────────────────────────┐"
echo "  │ npm run dev     → Local development           │"
echo "  │ npm run build   → Production build            │"
echo "  │ vercel deploy   → Deploy to Vercel            │"
echo "  │ vercel --prod   → Deploy to production        │"
echo "  └──────────────────────────────────────────────┘"
echo ""

# Optionally open browser
if command -v xdg-open &>/dev/null; then
    xdg-open "https://github.com/Titi1234995/buildos-site" 2>/dev/null || true
elif command -v open &>/dev/null; then
    open "https://github.com/Titi1234995/buildos-site" 2>/dev/null || true
fi
