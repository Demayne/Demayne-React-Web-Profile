# Demayne Govender - Full Stack Developer Portfolio

A modern, responsive React portfolio website showcasing full-stack development capabilities, projects, and professional experience.

## Features

- ✨ **Modern UI/UX Design** - Clean, professional interface with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎨 **Smooth Animations** - Powered by Framer Motion for engaging user experience
- 🚀 **Fast Performance** - Built with Vite for optimal loading speeds
- 📄 **Multiple Pages** - Home, About, Projects, and Contact pages
- 🔗 **Project Showcase** - Highlighted GitHub repositories with filtering
- 📧 **Contact Form** - Functional contact form powered by EmailJS

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Icons** - Icon library
- **EmailJS** - Client-side email service for contact form

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "React Porfolio"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI** (optional, can also use web interface):
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```
   - Follow the prompts to link your project
   - Or visit [vercel.com](https://vercel.com) and drag & drop your project folder

3. **Automatic Deployments**: Connect your GitHub repository to Vercel for automatic deployments on every push.

**Benefits:**
- Free hosting
- Automatic HTTPS
- Global CDN
- Custom domain support
- Zero configuration needed

### Option 2: Netlify (Free & Easy)

1. **Install Netlify CLI** (optional):
```bash
npm install -g netlify-cli
```

2. **Build the project**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```
   - Or visit [netlify.com](https://netlify.com) and drag & drop your `dist` folder

**Benefits:**
- Free hosting
- Automatic HTTPS
- Form handling (useful for contact form)
- Custom domain support

### Option 3: GitHub Pages (Free)

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**:
```json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy**:
```bash
npm run deploy
```

4. **Enable GitHub Pages** in your repository settings (Settings > Pages)

### Option 4: AWS Amplify (Free Tier Available)

1. Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy!

### Option 5: Firebase Hosting (Free Tier)

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login**:
```bash
firebase login
```

3. **Initialize**:
```bash
firebase init hosting
```
   - Select your project
   - Public directory: `dist`
   - Configure as single-page app: Yes

4. **Build and Deploy**:
```bash
npm run build
firebase deploy
```

## Project Structure

```
React Porfolio/
├── public/
│   └── Demayne Govender Logo.png
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── Navigation.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Projects.jsx
│   │   ├── Projects.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Updating Personal Information

- **About Page**: Edit `src/pages/About.jsx` to update work experience, skills, and certificates
- **Contact Info**: Update contact details in `src/pages/Contact.jsx` and `src/pages/Home.jsx`
- **Projects**: Modify the projects array in `src/pages/Projects.jsx`

### Styling

- **Colors**: Update color values in `tailwind.config.js` (theme.extend.colors)
- **Fonts**: Change font imports in `index.html` and update font-family in `tailwind.config.js`
- **Logo**: Replace `public/Demayne Govender Logo.png` with your logo
- **Tailwind CSS**: All styling uses Tailwind utility classes. Custom styles can be added in `src/index.css` using `@layer` directives

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navigation.jsx`

## Contact Form Setup (EmailJS)

The contact form uses EmailJS for sending emails directly from the frontend. No backend required!

### Quick Setup:

1. **Sign up for EmailJS**: https://www.emailjs.com/ (Free: 200 emails/month)

2. **Get your credentials**:
   - Service ID: Go to Email Services → Copy Service ID
   - Template ID: Go to Email Templates → Copy Template ID
   - Public Key: Go to Account → General → Copy Public Key

3. **Create `.env` file** in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Restart dev server** after creating `.env`:
   ```bash
   npm run dev
   ```

5. **Test the contact form** - It should now send emails to your Gmail!

📖 **Detailed setup guide**: See `EMAILJS_SETUP.md` for step-by-step instructions.

## Performance Optimization

- Images are optimized automatically by Vite
- Code splitting is handled by React Router
- Lazy loading can be added for images if needed
- Consider adding a service worker for offline support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

**Demayne Govender**
- Email: govender.demayne@gmail.com
- LinkedIn: [demayne-govender-452890316](https://www.linkedin.com/in/demayne-govender-452890316)
- GitHub: [@Demayne](https://github.com/Demayne)

---

Built with ❤️ using React and modern web technologies.

