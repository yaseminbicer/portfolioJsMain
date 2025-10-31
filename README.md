# 🚀 Portfolio Website

A modern and responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- 🎨 Modern and elegant design
- 📱 Fully responsive (mobile-friendly)
- ⚡ Fast performance (powered by Vite)
- 🎭 Smooth animations (Framer Motion)
- 🌙 Shadcn/ui components
- 📧 Contact form (EmailJS integration)
- 🔗 GitHub integration
- 🎯 Type safety with TypeScript

## 🛠️ Technologies

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui + Radix UI
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yaseminbicer/portfolioJsMain.git
cd portfolioJsMain
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your API keys:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_GITHUB_TOKEN=your_github_token
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Usage

### Development
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
portfolioJsMain/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Shadcn/ui components
│   │   ├── Hero.tsx    # Hero section
│   │   ├── About.tsx   # About section
│   │   ├── Projects.tsx # Projects section
│   │   └── Contact.tsx # Contact form
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   └── main.tsx        # Entry point
├── .env                # Environment variables (not tracked by git)
├── package.json
└── vite.config.ts
```

## 🎨 Customization

### Colors
You can customize the color palette in `tailwind.config.ts`.

### Content
- `src/components/Hero.tsx` - Main hero section and introduction
- `src/components/About.tsx` - About information
- `src/components/Projects.tsx` - Project cards
- `src/components/Contact.tsx` - Contact form

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Add an email service
3. Create an email template
4. Add your API keys to the `.env` file

## 🔒 Security

- `.env` file is not tracked by git
- API keys are stored securely
- Sensitive information is not exposed on the client-side

## 📝 License

This project is licensed under the MIT License.

## 👤 Contact

**Yasemin Bicer**

- GitHub: [@yaseminbicer](https://github.com/yaseminbicer)

---

⭐ If you like this project, don't forget to give it a star!
