# Coffee Catalog Client

A modern coffee storefront and admin dashboard built with React, Vite, Tailwind CSS, Zustand, React Hook Form, Zod, and Stripe checkout integration.

## Overview

This project is the frontend client for a coffee catalog system. It supports two main experiences:

- Guest users can browse coffees, filter the catalog, view product details, add items to cart, and checkout with Stripe.
- Admin users can log in, manage coffee items, and review order history.

## Features

- Coffee catalog with search and roast or availability filters
- Coffee detail pages
- Persistent shopping cart with Zustand
- Guest checkout flow with Stripe
- Admin login with protected routes
- Admin create, edit, and delete coffee entries
- Admin order history page
- Form validation with Zod and React Hook Form
- Toast notifications with React Toastify

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zustand
- React Hook Form
- Zod
- Lucide React
- React Toastify

## Project Structure

```text
src/
  api/          API request modules
  auth/         Admin auth context and session helpers
  components/   Reusable UI and feature components
  layouts/      Shared application layout
  pages/        Route-level pages
  routes/       App route config and route guards
  stores/       Zustand global state
  utils/        Validation schemas and helpers
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Coffee catalog |
| `/coffees/:id` | Coffee detail page |
| `/cart` | Guest shopping cart |
| `/cart/success` | Checkout success page |
| `/login` | Admin login |
| `/admin/coffees` | Admin coffee management |
| `/admin/coffees/new` | Create a new coffee |
| `/admin/coffees/:id/edit` | Edit a coffee |
| `/orders` | Admin order history |

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL="http://localhost:3333/api"
```

The client expects a backend API running locally on port `3333` by default.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Run lint

```bash
npm run lint
```

## API Expectations

This client is built to work with an API that provides endpoints similar to:

- `POST /auth/login`
- `GET /auth/me`
- `GET /coffees`
- `GET /coffees/:id`
- `POST /coffees`
- `PATCH /coffees/:id`
- `DELETE /coffees/:id`
- `GET /orders`
- `POST /checkout/session`
- `POST /checkout/session/complete`

Admin requests automatically send the stored bearer token through the shared Axios client.

## Notes

- Cart data is persisted in local storage using Zustand middleware.
- Admin session state is stored locally in the browser.
- Stripe checkout is started from the cart page and redirects users out to the hosted checkout page.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

