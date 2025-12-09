# 🚀 Deployment Guide - GitHub & Vercel

Complete guide to commit your portfolio to GitHub and deploy it live on Vercel.

---

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Vercel account (free)
- Node.js installed

---

## Step 1: Initialize Git Repository

Open terminal in your project folder and run:

```bash
cd "C:\Users\goven\Desktop\Level 4 - Full Stack Tasks\Web Portfolio\React Portfolio"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React Portfolio"
```

---

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `Demayne-React-Web-Profile`
4. Description: `Professional portfolio website - Full Stack Developer`
5. Set to **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

---

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add GitHub remote (replace with your actual username if different)
git remote add origin https://github.com/Demayne/Demayne-React-Web-Profile.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You may be prompted to authenticate. Use:
- Personal Access Token (recommended), or
- GitHub Desktop app

---

## Step 4: Set Up EmailJS Environment Variables

Before deploying, make sure you have your EmailJS credentials ready:

1. Go to [emailjs.com](https://www.emailjs.com) and sign in
2. Get your:
   - **Service ID**
   - **Template ID**
   - **Public Key**

3. Create `.env` file in project root (already gitignored):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

---

## Step 5: Deploy to Vercel

### Option A: Via GitHub (Recommended - Automatic Deployments)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Sign in with GitHub
3. Click **"Add New Project"**
4. Import your repository: `Demayne/Demayne-React-Web-Profile`
5. Vercel will auto-detect:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add each variable:
     - `VITE_EMAILJS_SERVICE_ID` = your service ID
     - `VITE_EMAILJS_TEMPLATE_ID` = your template ID
     - `VITE_EMAILJS_PUBLIC_KEY` = your public key
7. Click **"Deploy"**
8. Wait 1-2 minutes for deployment
9. **Done!** Your site is live at `your-project-name.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? (press enter for default)
# - Directory? ./
# - Override settings? No
```

---

## Step 6: Configure Custom Domain (Optional)

1. In Vercel dashboard → Your Project → **Settings** → **Domains**
2. Add your domain (e.g., `demaynegovender.com`)
3. Follow DNS configuration instructions
4. Vercel provides free SSL automatically

---

## Step 7: Future Updates

Every time you push to GitHub, Vercel automatically redeploys:

```bash
# Make changes to your code
# Then commit and push:

git add .
git commit -m "Update: description of changes"
git push origin main

# Vercel will automatically deploy the update!
```

---

## ✅ Verification Checklist

- [ ] Code pushed to GitHub
- [ ] Repository is public/accessible
- [ ] Vercel project created
- [ ] Environment variables added in Vercel
- [ ] Site deployed successfully
- [ ] Contact form tested and working
- [ ] All pages load correctly
- [ ] Mobile responsive design verified

---

## 🔧 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Contact Form Not Working
- Verify EmailJS environment variables in Vercel
- Check EmailJS dashboard for errors
- Test EmailJS service and template IDs

### Images Not Loading
- Ensure images are in `public/` folder
- Use `/image-name.png` (not `./image-name.png`) in code

---

## 📝 Important Notes

- **Environment Variables**: Must be added in Vercel dashboard (not just `.env` file)
- **Build Output**: Vercel automatically builds from `dist/` folder
- **Free Tier**: Vercel free tier is perfect for portfolios (unlimited deployments)
- **Custom Domain**: Free SSL included with custom domains

---

## 🎉 You're Live!

Your portfolio is now accessible at:
- **Vercel URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: (if configured)

Share this link with recruiters, clients, and on your resume!

---

**Need Help?** Check Vercel docs: https://vercel.com/docs

