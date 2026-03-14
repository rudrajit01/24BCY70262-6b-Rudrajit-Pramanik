# Vercel Fix TODO - FINAL

## Completed ✅:
- [x] server.js: Serverless export (no crash on cold start)
- [x] package.json: Express ^4.21.2 stable (latest 4.x)
- [x] config/db.js: Safe caching, detailed logs, no exit()
- [x] .gitignore: Node.js standard

## 🚀 DEPLOY & TEST:

**1. Environment Variables** (Vercel Dashboard → Settings → Environment Variables → Add for Production):
| Key                  | Value/Example                                      |
|----------------------|----------------------------------------------------|
| `MONGO_URI`          | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/banking` |
| `JWT_SECRET`         | Run: `openssl rand -base64 32`                     |
| `JWT_REFRESH_SECRET` | Run: `openssl rand -base64 32` (different)         |
| `JWT_EXPIRE`         | `15m`                                              |
| `JWT_REFRESH_EXPIRE` | `7d`                                               |

**⚠️ MongoDB Atlas Setup (if needed):**
- Sign up free: mongodb.com/atlas
- Create cluster → Connect → Drivers → Copy connection string
- Replace `<user:pass>` , add `/banking` DB name
- Network Access: Add 0.0.0.0/0 (testing only)

**2. Commit & Push** (run each line separately):
```
cd banking-api
git add .
git commit -m "Fix: Vercel stable deps + serverless DB"
git push
```

**3. Verify Deployment:**
- Wait ~1min for Vercel rebuild
- Visit: https://banking-api-one.vercel.app/ → ✅ Welcome page loads
- Check Vercel logs for DB connect (or graceful error if no MONGO_URI)

**Post-deploy tests (Postman/Thunder Client):**
```
POST /api/auth/register { "email": "test@example.com", "password": "123456" }
POST /api/auth/login → get tokens
GET /api/bank/balance (Authorization: Bearer <accessToken>)
```

**Success criteria:** Root page loads without 500 crash! 🎉
