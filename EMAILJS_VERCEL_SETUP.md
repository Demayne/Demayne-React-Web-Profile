# 📧 EmailJS Setup in Vercel - Complete Guide

Since `.env` files are not committed to GitHub (for security), you need to add your EmailJS credentials as **Environment Variables** in Vercel.

---

## ✅ Step-by-Step Setup

### Step 1: Get Your EmailJS Credentials

1. Go to [emailjs.com](https://www.emailjs.com) and sign in
2. Navigate to **Email Services** → Copy your **Service ID**
3. Navigate to **Email Templates** → Copy your **Template ID**
4. Go to **Account** → **General** → Copy your **Public Key**

**Example:**
- Service ID: `service_abc123`
- Template ID: `template_xyz789`
- Public Key: `abcdefghijklmnop`

---

### Step 2: Add Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in and select your project: `demayne-govender-portfolio`

2. **Navigate to Settings:**
   - Click **"Settings"** tab (top navigation)
   - Click **"Environment Variables"** (left sidebar)

3. **Add Each Variable:**

   **Variable 1:**
   - **Key:** `VITE_EMAILJS_SERVICE_ID`
   - **Value:** `your_service_id_here` (paste your Service ID)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Key:** `VITE_EMAILJS_TEMPLATE_ID`
   - **Value:** `your_template_id_here` (paste your Template ID)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 3:**
   - **Key:** `VITE_EMAILJS_PUBLIC_KEY`
   - **Value:** `your_public_key_here` (paste your Public Key)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

---

### Step 3: Redeploy Your Project

After adding environment variables, you **must redeploy** for them to take effect:

**Option A: Automatic (Recommended)**
- Make a small change to your code (or just wait)
- Push to GitHub: `git push origin main`
- Vercel will auto-deploy with new environment variables

**Option B: Manual Redeploy**
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Select **"Use existing Build Cache"** (optional)
5. Click **"Redeploy"**

---

### Step 4: Verify It Works

1. **Wait for deployment** to complete (1-2 minutes)
2. **Visit your site:** `demayne-govender-portfolio.vercel.app`
3. **Go to Contact page**
4. **Fill out the form** and submit
5. **Check your email** - you should receive the message!

---

## 🔍 Troubleshooting

### Contact Form Shows Error

**Error:** "Email service not configured"

**Solution:**
- Verify all 3 environment variables are added in Vercel
- Make sure variable names are **exactly**:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- Redeploy after adding variables

### Variables Not Working

**Check:**
1. Variable names must start with `VITE_` (required by Vite)
2. Values must not have extra spaces
3. Must redeploy after adding variables
4. Check Vercel build logs for errors

### Test Locally

Your local `.env` file still works for development:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📝 Quick Reference

### Environment Variables Needed:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID | `service_abc123` |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | `template_xyz789` |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key | `abcdefghijklmnop` |

### Where to Find in Vercel:

1. **Dashboard** → **Your Project** → **Settings** → **Environment Variables**

---

## ✅ Verification Checklist

- [ ] All 3 environment variables added in Vercel
- [ ] Variables set for all environments (Production, Preview, Development)
- [ ] Project redeployed after adding variables
- [ ] Contact form tested and working
- [ ] Email received successfully

---

## 🎉 You're Done!

Once you've added the environment variables and redeployed, your contact form will work perfectly on your live site!

**Note:** Your `.env` file stays local (not in GitHub) for security, but Vercel uses the environment variables you configure in the dashboard.

