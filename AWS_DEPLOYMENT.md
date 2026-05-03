# ClubBexley — AWS Deployment Guide

## Stack

| Service | What | Cost |
|---|---|---|
| **Vercel** | Frontend → `bexleytravels.com` | Free forever |
| **EC2 t3.micro** | Backend → `api.bexleytravels.com` | Free (year 1), ~$8/mo after |
| **Elastic IP** | Static IP for EC2 | Free while instance is running |
| **MongoDB Atlas M0** | Database | Free |
| **Cloudinary** | Images | Free |
| **Let's Encrypt** | SSL for both subdomains | Free |
| **Total year 1** | | **~$0/mo** |
| **Total after year 1** | | **~$9/mo** |

---

## Architecture

```
User
 ├── bexleytravels.com        ──►  Vercel (React frontend)
 ├── www.bexleytravels.com    ──►  Vercel (redirects to root)
 └── api.bexleytravels.com    ──►  EC2 t3.micro → Docker :5000 → MongoDB Atlas
```

---

## Part 1 — Deploy Frontend on Vercel

### Step 1 — Push code to GitHub
Make sure your repo is on GitHub. Vercel deploys from GitHub.

### Step 2 — Connect to Vercel
1. Go to vercel.com → Sign up with GitHub
2. Click **Add New Project** → Import your `ClubBexley` repo
3. Set **Root Directory** to `Frontend`
4. Vercel auto-detects Vite — no build config needed
5. Under **Environment Variables**, add:
   ```
   VITE_API_BASE_URL = https://api.bexleytravels.com
   VITE_GOOGLE_CLIENT_ID = your_frontend_google_client_id
   ```
6. Click **Deploy**

Vercel gives you a temporary URL like `clubbexley.vercel.app` — we'll replace it with `bexleytravels.com` next.

### Step 3 — Connect bexleytravels.com to Vercel
1. Vercel Dashboard → Your Project → **Settings → Domains**
2. Click **Add Domain** → type `bexleytravels.com` → Add
3. Add again → type `www.bexleytravels.com` → Add
4. Vercel will show you DNS records to add — keep this tab open

### Step 4 — Add DNS Records on Namecheap

1. Log in to Namecheap → **Domain List** → click **Manage** next to `bexleytravels.com`
2. Go to **Advanced DNS** tab
3. Delete any existing A records or CNAME for `@` and `www`
4. Add these records exactly:

| Type | Host | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | Automatic |
| `CNAME` | `www` | `cname.vercel-dns.com` | Automatic |
| `A` | `api` | `<YOUR-ELASTIC-IP>` | Automatic |

> The `76.76.21.21` is Vercel's IP for root domains — Vercel shows this when you add the domain.
> Replace `<YOUR-ELASTIC-IP>` with your actual EC2 Elastic IP.

5. Click the green checkmark to save each record

### Step 5 — Update Google OAuth
1. Go to **Google Cloud Console → APIs & Services → Credentials**
2. Edit your OAuth Client ID
3. Add to **Authorized JavaScript origins:**
   - `https://bexleytravels.com`
   - `https://www.bexleytravels.com`
4. Save

---

## Part 2 — Deploy Backend on EC2 t3.micro

### Step 1 — Launch EC2 Instance

1. Go to **AWS EC2 → Launch Instance**
2. Settings:
   - **Name:** `bexleytravels-backend`
   - **AMI:** Ubuntu 24.04 LTS — confirm it says **Free tier eligible**
   - **Instance type:** `t3.micro` — confirm it says **Free tier eligible**
   - **Key pair:** Create new → name it `clubbexley-key` → download `clubbexley-key.pem` → keep it safe, you cannot re-download it
   - **Firewall (Security Group):**
     - SSH port 22 — **My IP only**
     - HTTP port 80 — Anywhere
     - HTTPS port 443 — Anywhere
   - **Storage:** 8 GB gp2 (well within free tier's 30GB)
3. Click **Launch Instance**

### Step 2 — Assign a Static IP
1. Go to **EC2 → Elastic IPs → Allocate Elastic IP Address** → Allocate
2. Select the new IP → **Actions → Associate** → select your instance
3. Note this IP — use it as `<YOUR-ELASTIC-IP>` throughout this guide and in the Namecheap `api` A record above

### Step 3 — SSH Into the Server

```bash
# On your local machine
chmod 400 ~/Downloads/clubbexley-key.pem
ssh -i ~/Downloads/clubbexley-key.pem ubuntu@<YOUR-ELASTIC-IP>
```

### Step 4 — Set Up the Server

Run all of this on the EC2 instance:

```bash
# Update
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sudo bash
sudo usermod -aG docker ubuntu
newgrp docker

# Install Nginx, Certbot, Git
sudo apt install -y nginx certbot python3-certbot-nginx git

# Add 1GB swap — prevents OOM-kill during Docker builds on t3.micro
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
docker --version
free -h   # should show ~1GB swap
```

### Step 5 — Upload Backend Code

Run this on **your local machine**:

```bash
scp -i ~/Downloads/clubbexley-key.pem -r \
  /Users/rohandeep/Desktop/Garv/ClubBexley/Backend \
  ubuntu@<YOUR-ELASTIC-IP>:~/
```

### Step 6 — Create Production `.env` on the Server

On the **EC2 instance**, generate secrets first:
```bash
openssl rand -hex 64   # copy output → use as JWT_SECRET
openssl rand -hex 64   # copy output → use as ADMIN_JWT_SECRET
```

Then create the env file:
```bash
cat > ~/Backend/.env << 'EOF'
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
ALLOWED_ORIGINS=https://bexleytravels.com,https://www.bexleytravels.com
TRUST_PROXY=true
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=<paste generated secret>
ADMIN_JWT_SECRET=<paste generated secret>
GOOGLE_CLIENT_ID=your_backend_google_client_id
SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password
ALLOW_SEED=FALSE
EOF
```

### Step 7 — Build and Start with Docker Compose

```bash
cd ~/Backend

# Build and start in one command
docker compose up -d --build

# Verify — should say "Up (healthy)" after ~30 seconds
docker compose ps

# Live logs
docker compose logs -f
```

### Step 8 — Configure Nginx for api.bexleytravels.com

```bash
sudo nano /etc/nginx/sites-available/bexleytravels-api
```

Paste this exactly:

```nginx
server {
    listen 80;
    server_name api.bexleytravels.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 50M;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/bexleytravels-api /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t                    # must say "syntax is ok"
sudo systemctl restart nginx
```

### Step 9 — Enable HTTPS on api.bexleytravels.com

> Wait until DNS has propagated first. Check with:
> `nslookup api.bexleytravels.com` — it should return your Elastic IP before running certbot.

```bash
sudo certbot --nginx -d api.bexleytravels.com
# When prompted: choose option 2 (redirect HTTP → HTTPS)
```

Certbot auto-renews every 90 days. Test renewal with:
```bash
sudo certbot renew --dry-run
```

### Step 10 — Whitelist EC2 IP in MongoDB Atlas

1. **MongoDB Atlas → Network Access → Add IP Address**
2. Add: `<YOUR-ELASTIC-IP>/32`
3. Save

### Step 11 — Verify Everything

```bash
# On the server — backend health check
curl http://localhost:5000/health

# From anywhere — should return JSON with status ok
curl https://api.bexleytravels.com/health
```

Then open `https://bexleytravels.com` in a browser — the full site should load and API calls should work.

---

## Deploying Updates

### Frontend update
Push to GitHub — Vercel auto-deploys on every push to `main`. Done.

### Backend update

```bash
# 1. Upload new code from your local machine
scp -i ~/Downloads/clubbexley-key.pem -r \
  /Users/rohandeep/Desktop/Garv/ClubBexley/Backend \
  ubuntu@<YOUR-ELASTIC-IP>:~/

# 2. On the server — rebuild and restart in one command
cd ~/Backend
docker compose up -d --build
```

---

## Useful Commands

```bash
# Run all from ~/Backend on the server
docker compose ps                  # check container status + health
docker compose logs -f             # live logs
docker compose restart             # restart backend
docker compose down                # stop and remove container
docker compose up -d --build       # rebuild and restart

free -h                            # check memory usage
sudo systemctl status nginx        # check nginx
sudo nginx -t                      # test nginx config
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `bexleytravels.com` not loading | DNS not propagated yet — wait up to 48h, check with `nslookup bexleytravels.com` |
| `api.bexleytravels.com` not reachable | Check `api` A record on Namecheap points to your Elastic IP |
| Frontend CORS error | `ALLOWED_ORIGINS` in `.env` must be `https://bexleytravels.com,https://www.bexleytravels.com` |
| Backend container keeps restarting | `docker compose logs` — bad env var or MongoDB connection error |
| MongoDB connection refused | Elastic IP not whitelisted in Atlas Network Access |
| `docker build` killed mid-way | Swap not set up — re-run Step 4 swap commands |
| Google OAuth fails | `bexleytravels.com` not added to Google OAuth authorized origins |
| Certbot fails | DNS not pointed to EC2 yet — `nslookup api.bexleytravels.com` must show Elastic IP first |

---

## Security Checklist

- [ ] `Backend/.env` is in `.gitignore` — never commit real secrets
- [ ] EC2 SSH restricted to your IP only in Security Group
- [ ] Elastic IP whitelisted in MongoDB Atlas (not `0.0.0.0/0`)
- [ ] `ALLOW_SEED=FALSE` in production `.env`
- [ ] JWT secrets are freshly generated (`openssl rand -hex 64`)
- [ ] `ALLOWED_ORIGINS` set to `bexleytravels.com` only (not localhost)
