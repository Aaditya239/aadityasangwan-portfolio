# 🚀 Aaditya Sangwan - Personal Portfolio

A modern, interactive personal portfolio website showcasing projects, skills, and professional experience. Built with cutting-edge web technologies for a smooth, animated user experience.

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1.4-purple?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.3-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/FramerMotion-11.0.0-FF1088?style=flat-square&logo=framer)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Showcase](#project-showcase)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

- **Smooth Animations**: Beautiful, fluid animations powered by Framer Motion
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Theme**: Modern dark theme with gradient backgrounds
- **Performance Optimized**: Built with Vite for lightning-fast development and builds
- **Interactive Components**: Engaging animations and transitions
- **Type-Safe Development**: TypeScript support for better code quality
- **SEO Friendly**: Optimized for search engines and accessibility
- **Project Showcase**: Display of innovative projects with detailed descriptions
- **Skills Section**: Comprehensive skills and technologies overview
- **Contact Form**: Easy way for visitors to get in touch

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library for building interactive components
- **Vite 5.1.4** - Next generation frontend build tool
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **Framer Motion 11.0.0** - Animation library for React

### Development Tools
- **PostCSS 8.4.35** - CSS processor with plugins
- **Autoprefixer 10.4.19** - Vendor prefix automation
- **TypeScript** - Static typing for JavaScript

### Deployment
- **Vercel** - Serverless platform for deployment

## 📁 Project Showcase

### 🌾 FarmCare
A comprehensive farmer-focused platform designed to improve access to information and support better agricultural decision-making.
- **Features**: 
  - Live mandi crop prices based on location
  - Tools tailored for farmers' daily needs
  - Simple, accessible interface for rural users
  - Future-ready support for AI-based assistance
- **Impact**: Agriculture

### 💭 Unsaid
An anonymous space where people can share thoughts and emotions freely in a safe and non-judgmental environment.
- **Features**:
  - Anonymous emotion and thought sharing
  - Focus on mental well-being and self-expression
  - Calm, distraction-free experience
  - Designed to encourage openness and connection
- **Impact**: Wellness & Community
- **Live Demo**: [Visit Unsaid](https://unsaid-client-six.vercel.app/)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aaditya-portfolio.git
   cd aaditya-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build the project for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
aaditya-portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navigation header
│   │   ├── HorizontalProjectCard.jsx  # Project card component
│   │   ├── NameTyping.jsx       # Animated name typing effect
│   │   ├── ProjectCard.jsx      # Vertical project card
│   │   └── SectionHeading.jsx   # Section heading component
│   ├── sections/
│   │   ├── About.jsx            # About section
│   │   ├── Contact.jsx          # Contact form section
│   │   ├── Hero.jsx             # Hero section with animations
│   │   ├── Projects.jsx         # Projects showcase
│   │   └── Skills.jsx           # Skills section
│   ├── assets/
│   │   ├── profile.jpg          # Profile picture
│   │   └── ...                  # Other assets
│   ├── App.jsx                  # Root component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── public/
├── index.html                   # HTML template
├── package.json                 # Project metadata and dependencies
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite configuration
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## 🌐 Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect the Vite setup
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

The `vercel.json` file contains the deployment configuration for optimal performance.

## 📝 Customization

To customize this portfolio for your own use:

1. Update personal information in sections:
   - [About.jsx](src/sections/About.jsx)
   - [Contact.jsx](src/sections/Contact.jsx)
   - [Hero.jsx](src/sections/Hero.jsx)

2. Modify projects in [Projects.jsx](src/sections/Projects.jsx)

3. Update skills in [Skills.jsx](src/sections/Skills.jsx)

4. Replace profile image in `src/assets/`

5. Update contact form endpoint in [Contact.jsx](src/sections/Contact.jsx)

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License - see the LICENSE file for details.

## 📞 Contact

**Aaditya Sangwan**

- 📧 Email: [Your Email]
- 🔗 LinkedIn: [Your LinkedIn Profile]
- 🐙 GitHub: [Your GitHub Profile]
- 🌐 Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- Inspired by modern portfolio designs and best practices

---

**Made with ❤️ by Aaditya Sangwan**
