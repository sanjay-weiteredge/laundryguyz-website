# The Laundry Guyz Enterprise

A modern, responsive web application for The Laundry Guyz - a premium laundry and dry cleaning service provider. This application showcases services, pricing, company information, and provides an easy way for customers to schedule pickups and contact the business.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful, modern interface built with shadcn-ui components and Tailwind CSS
- **Service Showcase**: Detailed information about laundry, dry cleaning, steam ironing, and shoe cleaning services
- **Multi-page Navigation**: 
  - Home page with hero section, services overview, stats, testimonials, and CTA
  - Services page with detailed service information
  - Pricing page
  - About page
  - Contact page
- **Interactive Components**: Smooth animations, hover effects, and transitions
- **SEO Friendly**: Proper routing and page structure for search engine optimization

## 🛠️ Technologies

This project is built with:

- **Vite** - Fast build tool and development server
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **React Router DOM** - Client-side routing
- **shadcn-ui** - High-quality React components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Powerful data synchronization for React
- **Lucide React** - Beautiful icon library
- **Firebase Hosting** - Deployment configuration included

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd laundry-guyz-enterprise
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application for production
- `npm run build:dev` - Build the application in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
laundry-guyz-enterprise/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── robots.txt
├── src/
│   ├── assets/            # Images and media files
│   ├── components/
│   │   ├── layout/        # Header, Footer, Layout components
│   │   ├── sections/      # Page sections (Hero, Services, etc.)
│   │   └── ui/           # shadcn-ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── Services.tsx  # Services page
│   │   ├── Pricing.tsx   # Pricing page
│   │   ├── About.tsx     # About page
│   │   ├── Contact.tsx   # Contact page
│   │   └── NotFound.tsx  # 404 page
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── firebase.json         # Firebase hosting configuration
├── vite.config.ts        # Vite configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🎨 Services Offered

1. **Laundry Service** - Wash, dry, and fold with eco-friendly detergents
2. **Dry Cleaning** - Professional dry cleaning for delicate garments and suits
3. **Steam Ironing** - Professional steam pressing for crisp, wrinkle-free clothes
4. **Shoe Cleaning** - Deep cleaning and restoration for all types of footwear

## 🚀 Deployment

### Firebase Hosting

The project is configured for Firebase Hosting. To deploy:

1. **Install Firebase CLI** (if not already installed)
   ```sh
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```sh
   firebase login
   ```

3. **Build the project**
   ```sh
   npm run build
   ```

4. **Deploy to Firebase**
   ```sh
   firebase deploy
   ```

The built files will be in the `dist/` directory, which is configured as the public directory in `firebase.json`.

### Other Hosting Options

You can deploy the built `dist/` folder to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any other static hosting provider

## 🎯 Key Features Implementation

- **Responsive Navigation**: Mobile-friendly hamburger menu with smooth transitions
- **Service Cards**: Interactive service cards with hover effects and detailed information
- **Contact Information**: Easy access to phone, email, and location information
- **Call-to-Action**: Prominent CTAs throughout the site to encourage customer engagement
- **Modern Design**: Gradient backgrounds, smooth animations, and professional styling

## 📝 Development Notes

- The project uses path aliases (`@/`) for cleaner imports
- Components are organized by feature and type
- Styling follows Tailwind CSS utility-first approach
- TypeScript is used throughout for type safety
- React Router handles client-side routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Contact

For questions or support, please contact:
- Email: hello@thelaundryguyz.com
- Phone: +1 (234) 567-890

---

Built with ❤️ for The Laundry Guyz
