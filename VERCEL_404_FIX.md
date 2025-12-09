# 🔧 Fixing 404 Error on Mobile - Vercel

## Problem
Getting "Code not found" error when visiting the site on mobile devices.

## ✅ Solution Steps

### Step 1: Verify vercel.json is Committed

Make sure `vercel.json` is in your repository:

```bash
git status
```

If `vercel.json` shows as untracked or modified:

```bash
git add vercel.json
git commit -m "Add vercel.json for SPA routing"
git push origin main
```

### Step 2: Check Vercel Project Settings

1. Go to your Vercel dashboard
2. Select your project: `demayne-govender-portfolio`
3. Go to **Settings** → **General**
4. Verify:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or leave empty)

### Step 3: Redeploy

**Option A: Via GitHub (Recommended)**
- Just push the updated `vercel.json`:
  ```bash
  git add vercel.json
  git commit -m "Fix: Update vercel.json for SPA routing"
  git push origin main
  ```
- Vercel will auto-deploy

**Option B: Via Vercel Dashboard**
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

### Step 4: Clear Cache and Test

1. **Clear browser cache** on mobile device
2. **Hard refresh**: 
   - iOS Safari: Hold refresh button → "Reload Without Content Blockers"
   - Android Chrome: Settings → Clear browsing data
3. Test the site again

### Step 5: Verify vercel.json is Deployed

Check if `vercel.json` is in your deployment:

1. Go to Vercel dashboard → Your project → **Deployments**
2. Click on latest deployment
3. Check **"Source"** tab - you should see `vercel.json`

---

## 🔍 Alternative: Manual Vercel Configuration

If `vercel.json` isn't working, configure in Vercel dashboard:

1. Go to **Settings** → **Build & Development Settings**
2. Under **"Redirects"**, add:
   - **Source**: `/(.*)`
   - **Destination**: `/index.html`
   - **Permanent**: No (unchecked)

---

## 📝 Current vercel.json Content

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This tells Vercel to serve `index.html` for all routes, allowing React Router to handle client-side routing.

---

## 🚨 If Still Not Working

1. **Check Vercel Build Logs**:
   - Go to deployment → **Build Logs**
   - Look for any errors

2. **Verify Build Output**:
   - Ensure `dist/index.html` exists after build
   - Check that all routes are working locally: `npm run build && npm run preview`

3. **Contact Vercel Support**:
   - The error ID suggests a Vercel internal issue
   - Share the error: `Code not found, IDcpt1::ls2bk-1765299423749-a90d517595a9`

---

## ✅ Verification Checklist

- [ ] `vercel.json` exists in repository root
- [ ] `vercel.json` is committed to git
- [ ] `vercel.json` is pushed to GitHub
- [ ] Vercel project settings are correct
- [ ] Latest deployment includes `vercel.json`
- [ ] Browser cache cleared on mobile
- [ ] Tested on different mobile browsers

---

**Most Common Issue**: `vercel.json` not committed/pushed to GitHub. Make sure it's in your repository!

