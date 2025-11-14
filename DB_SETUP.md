# Database Setup Guide

Both backend services are now configured to connect to the PostgreSQL instance provided.

## PostgreSQL Connection Details

```
Host: dpg-d4bi1gm3jp1c73bincvg-a.oregon-postgres.render.com
User: podb_mveu_user
Password: 6jGoFugftRwgslkMXQvkM3Xn52lGGB0p
Database: podb_mveu
Port: 5432
```

## Configuration

Both services have the following setup:

### 1. Dependencies Added
- `@nestjs/typeorm`: ^11.0.0 — NestJS TypeORM integration
- `typeorm`: ^0.3.19 — ORM library
- `pg`: ^8.11.3 — PostgreSQL driver

### 2. Database Configuration

Each service has a `src/config/database.config.ts` file that:
- Parses the PostgreSQL connection string (uses `DATABASE_URL` env var or the hardcoded connection string)
- Configures TypeORM for PostgreSQL
- Auto-creates tables from entities (synchronize: true in development)
- Enables query logging in development

### 3. Entity Definitions

#### Orders Service
- **Entity**: `Order` (`src/entities/order.entity.ts`)
- **Table**: `orders`
- **Fields**: id, orderNumber, totalAmount, status (enum), description, timestamps

#### Products Service
- **Entity**: `Product` (`src/entities/product.entity.ts`)
- **Table**: `products`
- **Fields**: id, sku, name, description, price, stock, timestamps

## Setup Instructions

### 1. Install Dependencies

From the repository root:
```bash
npm install
```

Or for individual services:
```bash
npm --workspace=services/orders-management-service install
npm --workspace=services/products-management-service install
```

### 2. Start the Services

From repository root:
```bash
npm run dev:orders
npm run dev:products
```

Or individually:
```bash
npm --workspace=services/orders-management-service run start:dev
npm --workspace=services/products-management-service run start:dev
```

### 3. Database Tables Auto-Creation

On first startup with `synchronize: true` (development mode), TypeORM will:
1. Connect to the PostgreSQL instance
2. Automatically create the required tables based on entity definitions
3. Log connection status and queries to console

## Environment Variables

You can override the database connection by setting:
```bash
export DATABASE_URL="postgresql://user:password@host:port/database"
```

Or in a `.env` file (if supported by the service).

## Development Mode vs Production

| Setting | Development | Production |
|---------|-------------|-----------|
| Synchronize | true | false |
| Logging | enabled | disabled |
| SSL | disabled | required |

## Troubleshooting

### Connection Issues
- Verify the PostgreSQL host is accessible
- Check if credentials are correct
- Ensure the database exists

### Table Creation Fails
- Check if the user has CREATE TABLE permissions
- Review TypeORM logs for detailed errors
- Verify entity decorators are correct

### SSL Certificate Issues
- In development, SSL is disabled
- In production, SSL connections are enforced

## Next Steps

1. Run `npm install` to fetch new dependencies
2. Start each service with `npm run dev:orders` and `npm run dev:products`
3. Services will auto-create tables and connect to the database
4. You can now add more entities and DTOs as needed

For more information:
- [TypeORM Documentation](https://typeorm.io/)
- [NestJS Database Integration](https://docs.nestjs.com/techniques/database)
