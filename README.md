# Demayne Govender - Full Stack Developer Portfolio

A modern, responsive React portfolio website showcasing full-stack development capabilities, projects, and professional experience.

## ✨ Features

- **Modern UI/UX Design** - Clean, professional dark theme interface with smooth animations
- **Fully Responsive** - Optimized for all devices and screen sizes
- **Smooth Animations** - Powered by Framer Motion for engaging user experience
- **Fast Performance** - Built with Vite for optimal loading speeds
- **Multiple Pages** - Home, About, Projects, and Contact pages
- **Project Showcase** - Highlighted GitHub repositories with filtering
- **Contact Form** - Functional contact form powered by EmailJS
- **Downloadable Resume** - PDF resume available for download
- **Certificate Display** - View and download professional certificates

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

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` (Vite default port)

### Build for Production

```bash
npm run build
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

**Option 1: Via GitHub (Recommended)**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy" - Done! 🎉

**Option 2: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Benefits:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Zero configuration needed

## 📁 Project Structure

```
React Portfolio/
├── public/
│   ├── Demayne Govender Logo.png
│   ├── Demayne_Govender_Resume.pdf
│   ├── AA_RPA_Certificate.pdf
│   └── Full_Stack_Certificate.pdf
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── CursorTrail.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
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

## 📧 Contact Form Setup (EmailJS)

The contact form uses EmailJS for sending emails directly from the frontend. No backend required!

### Setup Steps:

1. **Sign up**: https://www.emailjs.com/ (Free: 200 emails/month)

2. **Get credentials**:
   - Service ID: Email Services → Copy Service ID
   - Template ID: Email Templates → Copy Template ID
   - Public Key: Account → General → Copy Public Key

3. **Create `.env` file**:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Add to Vercel**: After deployment, add these as environment variables in Vercel project settings

5. **Test** - Contact form should now send emails!

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

