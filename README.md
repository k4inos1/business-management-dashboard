# Business Management Dashboard

A React-based Business Management Dashboard that provides a unified interface for managing customers, products, orders, and reports. Built with **React 19** and **Material UI (MUI)**.

---

## Features

| Module        | Description                                                            |
|---------------|------------------------------------------------------------------------|
| **Dashboard** | Overview with KPI cards (Revenue, Customers, Orders, Stock) and a recent-orders snapshot |
| **Customers** | Searchable customer list with status indicators and order counts        |
| **Products**  | Product catalog with SKU, category, price, and live stock status        |
| **Orders**    | Order management table with status filtering and running totals         |
| **Reports**   | Monthly sales analytics and top-product breakdown with visual bars      |

---

## Tech Stack

- **React 19** – UI library
- **Material UI v7** – Component library (AppBar, Drawer, DataTable, Chips…)
- **Parcel** – Zero-config bundler

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:1234](http://localhost:1234) in your browser.

---

## Project Structure

```
business-management-dashboard/
├── components/
│   ├── Sidebar.js      # Navigation drawer
│   ├── Dashboard.js    # KPI cards + recent orders
│   ├── Customers.js    # Customer management
│   ├── Products.js     # Product catalog
│   ├── Orders.js       # Order management
│   └── Reports.js      # Analytics & reports
├── App.js              # Root component with layout & navigation state
├── index.js            # React DOM entry point
├── index.html          # HTML shell
└── package.json
```

---

## Migration Notes

This repository was previously named **gesapp** and was a stub React project. The dashboard modules have been ported over from the Angular-based **gesp** application, recreating equivalent functionality as React functional components using Material UI.

---

## License

ISC
