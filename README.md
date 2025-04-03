## 🧪 Next.js Assessment Project

### 📦 About

OWLTop is an educational course catalog built with Next.js and React, showcasing a dynamic directory of learning programs sorted by categories and subcategories (e.g., Analytics, Design, Photoshop). Users can search, filter, and view detailed information about courses including price, credit options, reviews, duration, and difficulty.

The platform dynamically generates static pages at build time using getStaticPaths and getStaticProps, optimizing performance and SEO.

This is a production-ready, containerized Next.js application using React 19, TypeScript, and Framer Motion, fully tested with Jest and Testing Library. It includes form management with React Hook Form, and has CI/CD setup with GitHub Actions and Docker Compose.

### 📁 Project Structure

```bash
src/
 └── components/         # Shared UI components (Button, Card, Input, etc.)
 └── context/            # React Context for state management
 └── helpers/            # Utility functions and constants
 └── hooks/              # Custom React hooks
 └── interfaces/         # TypeScript interfaces and types
 └── layout/             # Layout components (Header, Footer, Sidebar, etc.)
 └── page-components/    # Components specific to pages
 └── pages/              # Next.js pages and routes
 └── styles/             # Global and modular styles
```

### ⚙️ Features

- 🔍 Search: Users can search courses by keywords.

- 🧭 Sidebar Navigation: Left panel displays hierarchical course categories.

- 📄 Course Details Page: Includes description, school, diploma, difficulty, and financial details.

- ⭐ Sorting & Filtering: Courses can be sorted by rating or price.

- 🧱 Modular Layout with Header, Footer, Sidebar, Menu, etc.

- ⚡ Static Generation of course pages via getStaticPaths and getStaticProps.

- 💬 Reviews: Course cards display star ratings and number of reviews.

### 🚀 Getting Started
Prerequisites
Node.js v20+

Docker & Docker Compose

#### Install & Run Locally

```bash
npm install
npm run dev
```

#### Build for Production

```bash
npm run build
npm run start
```

#### 🐳 Docker
Build Docker Image

```bash
docker build -t my-app .
```

#### ✅ Testing

```bash
npm run test
```

