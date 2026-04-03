<div align="center">

# 🏭 Smart-IMS — Frontend

**Intelligent Inventory Management System for MultiKitchen Co (Pvt) Ltd**

A premium, responsive web application built with **Next.js 16**, **React 19**, and **Tailwind CSS 4** — powering both the client-facing _Atelier_ storefront and the internal industrial inventory management dashboard.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Design System](#-design-system)
- [API Integration](#-api-integration)
- [Authentication](#-authentication)
- [Contributing](#-contributing)

---

## 🌟 Overview

Smart-IMS Frontend is the unified web interface for **MultiKitchen Co (Pvt) Ltd**, a premium modular kitchen and pantry solutions company based in Nugegoda, Sri Lanka. The application serves two distinct audiences through a single codebase:

| Surface | Audience | Purpose |
|---------|----------|---------|
| **Atelier** (Public) | Customers & Visitors | Brand showcase, services, gallery, booking, and live chat |
| **Admin Dashboard** | Staff & Management | Inventory tracking, stock management, analytics, user management, and reporting |

---

## ✨ Features

### 🎨 Public — _The Atelier_
- **Hero Landing Page** — Animated hero section with elegant serif typography
- **Services Showcase** — Curated display of kitchen & pantry solutions
- **Gallery** — Visual portfolio with interactive card layouts
- **About Page** — Company story, values, and team information
- **Contact Page** — Business details and inquiry form
- **Booking System** — Built-in design consultation booking form
- **Live Chat Widget** — Real-time customer communication
- **Testimonials** — Customer review carousel

### 🏗️ Admin — _Industrial Dashboard_
- **Dashboard Overview** — KPI cards, charts, and system status at a glance
- **Inventory Management** — Full CRUD operations for inventory items with modal dialogs
- **Stock Management** — Stock-in/stock-out tracking with real-time quantity updates
- **Stock Summary** — Detailed summary views for stock movements
- **Analytics & Reports** — Interactive charts (Chart.js) and exportable reports
- **User Management** — Role-based user administration (Admin / Owner)
- **Low Stock Alerts** — Automatic badge notifications for items below threshold
- **Profile Management** — User profile editing and password updates
- **QR Code Scanning** — Built-in HTML5 QR code reader for stock items

### 🔐 Security & UX
- **JWT Authentication** — Access + refresh token flow with automatic renewal
- **Role-Based Access Control** — Owner vs Admin navigation filtering
- **Protected Routes** — Automatic redirect for unauthenticated users
- **Responsive Design** — Fully adaptive from 320px mobile to 1440px+ desktop
- **Animated Transitions** — Framer Motion page and component transitions
- **Toast Notifications** — Non-intrusive feedback via Sonner

---

## 🛠️ Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | `16.2.1` | React framework with App Router |
| [React](https://react.dev/) | `19.2.4` | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | `5.x` | Static type checking |
| [Tailwind CSS](https://tailwindcss.com/) | `4.x` | Utility-first CSS framework |

### UI & Animation

| Library | Purpose |
|---------|---------|
| [Framer Motion](https://www.framer.com/motion/) | Page transitions, micro-animations, gesture handling |
| [Lucide React](https://lucide.dev/) | Modern, consistent icon set |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional & conflict-free class merging |

### Data & Communication

| Library | Purpose |
|---------|---------|
| [TanStack React Query](https://tanstack.com/query) | Server state management & caching |
| [Axios](https://axios-http.com/) | HTTP client with interceptors for auth |
| [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | Interactive data visualization |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notification system |
| [html5-qrcode](https://github.com/nicholasgcoles/html5-qrcode) | QR code scanning for inventory |

### Fonts

| Font | Usage |
|------|-------|
| [Geist](https://vercel.com/font) | Admin dashboard — sans-serif body |
| [Geist Mono](https://vercel.com/font) | Admin dashboard — monospace accents |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | Atelier — elegant serif headings |
| [Inter](https://fonts.google.com/specimen/Inter) | Atelier — clean sans-serif body |

---

## 📐 Architecture

```
┌────────────────────────────────────────────────┐
│                   Browser                       │
│  ┌──────────────────┐  ┌─────────────────────┐ │
│  │  Atelier (Public) │  │  Admin Dashboard    │ │
│  │  /(public) routes │  │  /admin/* routes    │ │
│  └────────┬─────────┘  └────────┬────────────┘ │
│           │                     │               │
│  ┌────────┴─────────────────────┴────────────┐ │
│  │              Shared Layer                  │ │
│  │  • UI Components  • Hooks  • Services     │ │
│  │  • API Client      • Types • Providers    │ │
│  └────────────────────┬──────────────────────┘ │
└───────────────────────┼────────────────────────┘
                        │ Axios (JWT Bearer)
                        ▼
              ┌─────────────────┐
              │  Backend API    │
              │  localhost:5000 │
              │  (Node/Prisma)  │
              └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | `>=18.x` |
| **pnpm** | `>=8.x` (recommended) |
| **Backend API** | Running on `http://localhost:5000` ([see backend README](../backend/README.md)) |

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sachintha-Prabashana/multikitchen-frontend.git
   cd multikitchen-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open in your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
frontend/
├── public/                      # Static assets (SVGs, favicon)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (public)/            # Public route group (Atelier)
│   │   │   ├── layout.tsx       # Public layout (navbar + footer + chat)
│   │   │   ├── page.tsx         # Home / landing page
│   │   │   ├── about/           # About page
│   │   │   ├── booking/         # Consultation booking
│   │   │   ├── contact/         # Contact page
│   │   │   ├── gallery/         # Portfolio gallery
│   │   │   ├── products/        # Products listing
│   │   │   └── services/        # Services showcase
│   │   ├── admin/               # Protected admin route group
│   │   │   ├── layout.tsx       # Admin layout (sidebar + header)
│   │   │   ├── page.tsx         # Admin root redirect
│   │   │   ├── dashboard/       # KPI overview
│   │   │   ├── items/           # Inventory CRUD
│   │   │   ├── stock/           # Stock in/out + summary
│   │   │   ├── reports/         # Analytics & reports
│   │   │   ├── users/           # User management
│   │   │   ├── profile/         # User profile
│   │   │   └── backup/          # Database backup
│   │   ├── login/               # Authentication page
│   │   ├── layout.tsx           # Root layout (fonts + toaster)
│   │   └── globals.css          # Global styles & design tokens
│   ├── components/
│   │   ├── admin/               # Admin-specific components
│   │   │   ├── ItemModal.tsx    # Inventory item create/edit modal
│   │   │   └── UserModal.tsx    # User create/edit modal
│   │   ├── public/              # Public-facing components
│   │   │   ├── BookingForm.tsx  # Design consultation form
│   │   │   ├── ChatWidget.tsx   # Live chat floating widget
│   │   │   ├── GalleryCard.tsx  # Gallery image card
│   │   │   ├── Hero.tsx         # Animated hero section
│   │   │   ├── ServicesCard.tsx  # Service showcase card
│   │   │   └── Testimonials.tsx # Customer testimonials carousel
│   │   ├── providers/
│   │   │   └── ToasterProvider.tsx  # Sonner toast provider
│   │   └── ui/
│   │       └── components.tsx   # Shared UI primitives (Button, Input, Card, Modal)
│   ├── hooks/
│   │   └── useAuth.ts           # Authentication hook (login, logout, user state)
│   ├── lib/
│   │   └── api.ts               # Axios instance with JWT interceptors
│   ├── services/                # API service layer
│   │   ├── authService.ts       # Login, register, profile update
│   │   ├── brandService.ts      # Brand/company operations
│   │   ├── chatService.ts       # Live chat messaging
│   │   ├── itemService.ts       # Inventory item CRUD
│   │   ├── stockService.ts      # Stock movements & low-stock alerts
│   │   ├── reportService.ts     # Report generation & export
│   │   ├── userService.ts       # User management
│   │   └── backupService.ts     # Database backup operations
│   └── types/                   # TypeScript type definitions
├── .env.local                   # Environment configuration
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS (Tailwind) configuration
├── eslint.config.mjs            # ESLint flat configuration
├── package.json                 # Dependencies & scripts
└── pnpm-lock.yaml               # Lockfile
```

---

## 🔧 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | `http://localhost:5000/api` | Backend API base URL |

> **Note:** The `NEXT_PUBLIC_` prefix makes the variable available in the browser. All API requests are routed through the Axios client in `src/lib/api.ts`.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on `http://localhost:3000` with hot reload |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Start production server from the build output |
| `pnpm lint` | Run ESLint across the codebase |

---

## 🎨 Design System

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-primary` | `#C15B32` | Primary accent — copper/terracotta |
| `--brand-charcoal` | `#1A1A1A` | Text and dark surfaces |
| `--brand-cream` | `#F9F7F2` | Background — warm off-white |

### Typography

- **Atelier (Public):** Cormorant Garamond (serif) + Inter (sans-serif)
- **Admin Dashboard:** Geist (sans-serif) + Geist Mono (monospace)
- **Industrial Aesthetic:** `10px` uppercase tracking-widest labels, bold numerical KPIs

### UI Primitives (`src/components/ui/components.tsx`)

| Component | Variants | Description |
|-----------|----------|-------------|
| `Button` | `default`, `outline`, `ghost`, `danger`, `success` | Multi-variant button with size options |
| `Input` | `default`, `sm` | Styled form input with focus ring |
| `Card` | — | Content container with border & shadow |
| `Modal` | — | Centered overlay dialog with backdrop blur |
| `cn()` | — | Utility for merging Tailwind classes |

---

## 🔌 API Integration

### HTTP Client

The Axios instance (`src/lib/api.ts`) is preconfigured with:

- **Base URL** from `NEXT_PUBLIC_API_URL`
- **Request interceptor** — Automatically attaches `Bearer` token from `localStorage`
- **Response interceptor** — Handles `401` errors with automatic token refresh:
  1. Attempts to refresh using the stored `refreshToken`
  2. Retries the original request with the new access token
  3. Redirects to `/login` on refresh failure

### Service Layer

All API calls are abstracted into domain-specific service modules:

```
src/services/
├── authService.ts      →  POST /auth/login, /auth/register, PUT /auth/profile
├── itemService.ts      →  CRUD /items
├── stockService.ts     →  GET /stock/low, POST /stock/in, /stock/out
├── reportService.ts    →  GET /reports/*
├── userService.ts      →  CRUD /users
├── chatService.ts      →  Chat messaging endpoints
├── brandService.ts     →  Brand/company data
└── backupService.ts    →  Database backup triggers
```

---

## 🔐 Authentication

### Flow

```
User Login
    │
    ▼
POST /auth/login  ──►  { accessToken, refreshToken, user }
    │
    ▼
Store in localStorage:
  • token (accessToken)
  • refreshToken
  • user (JSON)
    │
    ▼
Redirect → /admin/dashboard
```

### Token Refresh

When a `401 Unauthorized` response is received:

1. The Axios interceptor catches the error
2. Sends `POST /auth/refresh` with the stored refresh token
3. Updates `localStorage` with the new access token
4. Retries the original failed request
5. If refresh fails → clears all auth data → redirects to `/login`

### Role-Based Access

| Role | Dashboard | Inventory | Stock Mgmt | Analytics | Users | Stock Summary |
|------|-----------|-----------|------------|-----------|-------|---------------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Owner** | ✅ | ✅ (view only) | ❌ | ✅ | ✅ | ✅ |

---

## 🤝 Contributing

1. **Create a feature branch** from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the existing patterns:**
   - Place new pages under `src/app/(public)/` or `src/app/admin/`
   - Add reusable components to `src/components/ui/`
   - Create API wrappers in `src/services/`
   - Use the design tokens from `globals.css`

3. **Run linting before committing:**

   ```bash
   pnpm lint
   ```

4. **Submit a pull request** with a clear description of your changes

---

<div align="center">

**Built with ❤️ for MultiKitchen Co (Pvt) Ltd**

Sri Lanka · 2024 – 2026

</div>
