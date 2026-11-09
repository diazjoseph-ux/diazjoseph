# Diaz Joseph — Personal Portfolio Website

An ultra-modern, editorial, high-performance personal portfolio website for **Diaz Joseph**, First-year B.Tech CSE (Artificial Intelligence) student at **Thejus Engineering College, Kerala, India**.

Inspired by modern dark luxury design, featuring an iridescent 3D fluid mesh, buttery smooth Lenis scrolling, masked typography reveals, interactive cursor physics, and responsive mobile-first architecture.

---

## 🚀 Live Preview & Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + Custom GLSL Iridescent Shader with Perlin Noise displacement (Graceful GPU CSS gradient fallback for low-power devices & reduced motion)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Glyphs
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📂 Quick Content Customization

All personal details, bio text, college credentials, social media links, skill categories, and project showcases can be updated in a **single file**:

👉 **[`/src/data/content.js`](./src/data/content.js)**

```javascript
// Example: src/data/content.js
export const personalData = {
  name: "Diaz Joseph",
  roleLine: "Aspiring AI Engineer & Web Developer",
  college: "Thejus Engineering College",
  department: "Computer Science & Engineering (Artificial Intelligence)",
  degree: "B.Tech CSE - AI",
  batchYear: "1st Year (2025 - 2029)",
  email: "diazjoseph@example.com", // Set your actual email
  photo: "/assets/diaz.jpg",        // Drop your photo here
  ...
};
```

### Updating Your Profile Photo
Replace the file at **`public/assets/diaz.jpg`** with your own portrait. The About section will automatically display it with 3D parallax tilt and glowing edge aura.

---

## 🛠️ Local Development Setup

1. **Clone or navigate to the repository:**
   ```bash
   cd d:/diaz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the port displayed in your terminal) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 1-Click Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push this project to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**. Your site will be live with free global CDN and SSL in under 60 seconds!

### Option 2: Deploy to Netlify
1. Push this project to GitHub.
2. Sign in to [Netlify](https://www.netlify.com/) and click **Add new site > Import an existing project**.
3. Select your repository.
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy Site**.

---

## 🌟 Key Features & Polish
- 💎 **Iridescent 3D Organic Fluid Flower/Blob**: Deforms dynamically with multi-octave 3D Perlin noise and tilts in real-time with cursor movement.
- 💫 **Interactive Circular Badge**: Continuous spinning text reading `"REACH OUT AND SAY HI"` with a central glowing 4-point star.
- 🎯 **Smooth Physics Custom Cursor**: Trailing ring with lerp interpolation that scales up on buttons and links.
- 📐 **Editorial Typography**: High-contrast serif headlines paired with clean sans-serif and mono sub-badges.
- 📱 **Mobile-First Responsive Layout**: Drawer navigation on mobile and desktop layout matching the visual reference.
- ♿ **Accessible & Reduced Motion**: Automatically disables 3D deformations and heavy transitions if the user specifies `prefers-reduced-motion`.

---

© 2026 Diaz Joseph. Built with passion & precision.
