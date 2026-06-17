# Cloudflare + Vercel Domain Setup

## 1. Prerequisites

- Domain `buildos.io` registered (Namecheap, GoDaddy, etc.)
- Cloudflare account with the domain added
- Vercel account with project deployed

## 2. DNS Configuration

In Cloudflare dashboard → buildos.io → DNS:

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | @ | `cname.vercel-dns.com` | ✅ Proxied (orange cloud) |
| CNAME | www | `cname.vercel-dns.com` | ✅ Proxied (orange cloud) |

**Optional email records:**
| TXT | @ | `v=spf1 include:_spf.vercel.com ~all` | - |

## 3. Vercel Domain Configuration

In Vercel dashboard → Project → Settings → Domains:
1. Add domain: `buildos.io`
2. Add domain: `www.buildos.io`
3. Vercel will verify DNS automatically
4. Set `buildos.io` as primary domain
5. Enable SSL/TLS (automatic)

## 4. SSL/TLS (Cloudflare)

Cloudflare → SSL/TLS:
- **Full (strict)** — recommended (end-to-end encryption)
- Enable "Always Use HTTPS"
- Enable "Automatic HTTPS Rewrites"

## 5. Auto-Deploy via GitHub

The project already includes `.github/workflows/deploy.yml`.
To activate:

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `VERCEL_TOKEN` — from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` — from Vercel project settings
   - `VERCEL_PROJECT_ID` — from Vercel project settings
3. Every push to `main` will auto-deploy to Vercel

## 6. Verify

```bash
curl -I https://buildos.io
# Expected: HTTP/2 200

curl -I https://www.buildos.io
# Expected: HTTP/2 200 → redirect to buildos.io
```

## Troubleshooting

- **DNS not propagating**: Wait 5-30 min, check with `dig buildos.io`
- **SSL errors**: Cloudflare → SSL/TLS → "Full (strict)"
- **Vercel 404**: Check domain configuration in Vercel dashboard
- **GitHub Actions failing**: Verify secrets are set correctly
