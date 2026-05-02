# ClubBexley — AWS Deployment Guide

## Stack

| Service | What | Cost |
|---|---|---|
| **Vercel** | Frontend (React/Vite) | Free forever |
| **EC2 t3.micro** | Backend (Express/Docker) | Free (year 1), ~$8/mo after |
| **Elastic IP** | Static IP for EC2 | Free while instance is running |
| **MongoDB Atlas M0** | Database | Free |
| **Cloudinary** | Images | Free |
| **Let's Encrypt** | SSL for backend | Free |
| **Total year 1** | | **~$0/mo** |
| **Total after year 1** | | **~$9/mo** |

---

## Architecture

```
User
 ├── visits clubbexley.vercel.app  ──►  Vercel (React frontend, free)
 │
 └── API calls to EC2
         │
         ▼
   EC2 t3.micro
     └── Docker: arcevents-backend :5000
               └── connects to MongoDB Atlas (cloud)
```

---

## Part 1 — Deploy Frontend on Vercel (5 minutes)

### Step 1 — Push code to GitHub
Make sure your repo is on GitHub. Vercel deploys from GitHub.

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project** → Import your `ClubBexley` repo
3. Set **Root Directory** to `Frontend`
4. Vercel auto-detects Vite — no build config needed
5. Under **Environment Variables**, add:
   ```
   VITE_API_BASE_URL = https://<your-backend-url>
   VITE_GOOGLE_CLIENT_ID = your_frontend_google_client_id
   ```
   > You'll fill in `VITE_API_BASE_URL` after the backend is deployed. For now you can put a placeholder and update it later.
6. Click **Deploy**

Vercel gives you a free URL like `clubbexley.vercel.app`. You can also connect a custom domain for free.

### Step 3 — Update Google OAuth
1. Go to **Google Cloud Console → APIs & Services → Credentials**
2. Edit your OAuth Client ID
3. Add to **Authorized JavaScript origins:** `https://clubbexley.vercel.app`
4. Save

---

## Part 2 — Deploy Backend on EC2 t3.micro

### Step 1 — Launch EC2 Instance

1. Go to **AWS EC2 → Launch Instance**
2. Settings:
   - **Name:** `clubbexley-backend`
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
3. Note this IP — this is your permanent backend IP

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

# Add 1GB swap — prevents OOM-kill during Docker builds on t2.micro
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
openssl rand -hex 64   # copy this → JWT_SECRET
openssl rand -hex 64   # copy this → ADMIN_JWT_SECRET
```

Then create the env file:
```bash
cat > ~/Backend/.env << 'EOF'
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
ALLOWED_ORIGINS=https://clubbexley.vercel.app
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

# Verify — both status should say "Up (healthy)" after ~30 seconds
docker compose ps

# Live logs
docker compose logs -f
```

That's it. Docker Compose reads `docker-compose.yml`, builds the image, and starts the container with all settings (port, env file, memory limit, healthcheck, restart policy) already configured.

### Step 8 — Configure Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/clubbexley
```

Paste (replace `yourdomain.com` if you have a domain, otherwise leave `server_name _;`):

```nginx
server {
    listen 80;
    server_name _;

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
sudo ln -s /etc/nginx/sites-available/clubbexley /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Step 9 — (Optional) Enable HTTPS with a Domain

If you have a domain pointed to your Elastic IP:

```bash
sudo certbot --nginx -d yourdomain.com
```

Then update `ALLOWED_ORIGINS` in `.env` to `https://yourdomain.com` and restart:
```bash
cd ~/Backend
docker compose restart
```

### Step 10 — Whitelist EC2 IP in MongoDB Atlas

1. **MongoDB Atlas → Network Access → Add IP Address**
2. Add: `<YOUR-ELASTIC-IP>/32`
3. Save

### Step 11 — Update Vercel with Backend URL

1. Go to **Vercel → Your Project → Settings → Environment Variables**
2. Update `VITE_API_BASE_URL` to `http://<YOUR-ELASTIC-IP>` (or `https://yourdomain.com` if you have SSL)
3. Go to **Deployments → Redeploy** to rebuild with the new env var

### Step 12 — Verify

```bash
# On the server
curl http://localhost:5000/health

# From anywhere
curl http://<YOUR-ELASTIC-IP>/health
```

Open your Vercel URL in the browser — the site should fully work.

---

## Deploying Updates

### Frontend update
Push to GitHub — Vercel auto-deploys on every push to `main`. Done.

### Backend update

```bash
# 1. Upload new code from local machine
scp -i ~/Downloads/clubbexley-key.pem -r \
  /Users/rohandeep/Desktop/Garv/ClubBexley/Backend \
  ubuntu@<YOUR-ELASTIC-IP>:~/

# 2. On the server — rebuild and restart in one command
cd ~/Backend
docker compose up -d --build
```

Docker Compose stops the old container, rebuilds the image, and starts the new one automatically.

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
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Frontend can't reach API (CORS error) | `ALLOWED_ORIGINS` in `.env` must exactly match Vercel URL |
| Backend container keeps restarting | `docker compose logs` — bad env var or MongoDB connection error |
| MongoDB connection refused | Elastic IP not whitelisted in Atlas Network Access |
| `docker build` killed mid-way | Swap not set up — re-run Step 4 swap commands |
| Google OAuth fails on Vercel | Vercel URL not added to Google OAuth authorized origins |
| Vercel frontend uses old API URL | Redeploy after updating `VITE_API_BASE_URL` in Vercel env vars |

---

## Security Checklist

- [ ] `Backend/.env` is in `.gitignore` — never commit real secrets
- [ ] EC2 SSH restricted to your IP only
- [ ] Elastic IP whitelisted in MongoDB Atlas (not `0.0.0.0/0`)
- [ ] `ALLOW_SEED=FALSE` in production
- [ ] JWT secrets are freshly generated (`openssl rand -hex 64`)
- [ ] `ALLOWED_ORIGINS` set to your Vercel URL only
