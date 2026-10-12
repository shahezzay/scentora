# Scentora

Full-stack perfume store: **Next.js 14 (App Router) + Tailwind CSS + PostgreSQL**.

## Features
- Storefront: collections, product pages, search, blog, cart (saved in the browser), responsive on mobile
- Checkout with Cash on Delivery. Prices and shipping are always recalculated on the server
- Customer accounts (register / login / order history) with secure httpOnly cookie sessions
- Order tracking by order number + phone
- Contact form saved to the database
- "Spot Fake" authenticity codes verified against the database
- Admin panel at `/admin`: manage order status, read messages, generate authenticity codes

## Setup
```bash
cp .env.example .env.local     # then fill in the values
npm install
npm run dev                    # http://localhost:3000
```
Tables are created automatically on the first request. The admin account is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Environment variables
| Name | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `JWT_SECRET` | yes | Random string (32+ chars) used to sign login cookies |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | yes | Admin login |
| `PGSSL` | no | `true` if your DB needs SSL and the URL has no `sslmode` |

## Editing content
- Products and prices: `data/products.js`
- Store name, phone, email, outlets, menu: `data/site.js`
- Policy and About text: `data/pages.js`

See `DEPLOY.md` for Railway and Vercel steps.
