# Inventory and Data Management System

This project implements a backend API for product inventory management using Node.js, Express.js, and MongoDB with Mongoose.

## Features
- Product schema with validation
- CRUD operations for products
- Filtering, sorting, and pagination
- Low-stock alert report
- Category-wise inventory summary
- Safe stock adjustment for restock and sales
- Centralized error handling

## Setup
1. Install dependencies:
   npm install
2. Create a `.env` file using `.env.example` and adjust the MongoDB URI.
3. Start the server:
   npm start

## API Base URL
`/api/products`

## Endpoints
- `GET /api/products` — get all products with filtering, sorting, and pagination
- `GET /api/products/:id` — get one product by ID
- `POST /api/products` — create a product
- `PATCH /api/products/:id` — update product details
- `PATCH /api/products/:id/stock` — update stock with `type` and `quantity`
- `DELETE /api/products/:id` — delete a product
- `GET /api/products/low-stock` — list products below threshold
- `GET /api/products/summary/category` — category-wise summary

## Example stock adjustment payload
```json
{
  "type": "restock",
  "quantity": 20
}
```
