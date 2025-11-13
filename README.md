# PO Management App

A comprehensive monorepo application for managing purchase orders (PO). This project follows a workspace-based architecture with a modern frontend and backend microservices.

## Project Overview

**PO Management App** is a full-stack application designed to streamline purchase order management. It comprises:

- **Client Frontend** (`apps/client-next`): A modern Next.js 16 application with React 19, providing an intuitive user interface for managing purchase orders.
- **Orders Management Service** (`apps/orders-management-service`): A NestJS 11-based backend microservice handling all order-related operations, business logic, and API endpoints.
- **Products Management Service** (`apps/products-management-service`): Reserved for future product-related microservice implementation.

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | Next.js | 16.0.3 |
| Frontend UI Library | React | 19.2.0 |
| Backend Framework | NestJS | 11.0.1 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Testing | Jest | 30.0.0 |
| Linting | ESLint | 9.x |

## Repository Structure

```
.
├── apps/
│   ├── client-next/                 # Next.js frontend application
│   │   ├── src/app/                 # App router directory
│   │   ├── package.json             # Frontend dependencies
│   │   └── next.config.ts           # Next.js configuration
│   ├── orders-management-service/   # NestJS backend service
│   │   ├── src/                     # Source code (controllers, services, modules)
│   │   ├── test/                    # Test files
│   │   └── package.json             # Backend dependencies
│   └── products-management-service/ # Future product service (currently empty)
├── packages/                         # Shared libraries (currently empty)
├── package.json                      # Root workspace configuration
└── README.md                         # This file
```

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)

Verify installation:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Joysingh1709/PO-mang-app.git
   cd PO-mang-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   This command installs dependencies for all workspace packages (root, frontend, and backend services).

## Running the Application

This is a monorepo with multiple independently runnable applications. You can start them individually or together.

### Option 1: Run All Services (Recommended for Development)

Start all three components in separate terminal windows:

```bash
# Terminal 1: Start the frontend (Next.js)
npm run dev:client

# Terminal 2: Start the orders management service (NestJS)
npm run dev:orders

# Terminal 3: Start the products management service (NestJS - currently a no-op)
npm run dev:products
```

### Option 2: Run Individual Services

#### Frontend Only

Start the Next.js development server:

```bash
npm run dev:client
```

- **URL**: [http://localhost:3000](http://localhost:3000)
- **Auto-reload**: Enabled. Changes to `apps/client-next/src/app/**` files automatically refresh the browser.

#### Orders Management Service Only

Start the NestJS orders service:

```bash
npm run dev:orders
```

- **Default Port**: 3001 (or the configured port in the service)
- **Auto-reload**: Enabled with `--watch` flag for development

### Option 3: Run Services with npm workspace Commands

If you prefer to run commands directly inside each app folder:

```bash
# Frontend development server
npm --workspace=apps/client-next run dev

# Frontend production build
npm --workspace=apps/client-next run build

# Frontend production server
npm --workspace=apps/client-next run start

# Frontend linting
npm --workspace=apps/client-next run lint

# Orders service development server
npm --workspace=apps/orders-management-service run start:dev

# Orders service production server
npm --workspace=apps/orders-management-service run start:prod

# Orders service linting
npm --workspace=apps/orders-management-service run lint

# Orders service testing
npm --workspace=apps/orders-management-service run test
```

## Building for Production

### Build Frontend

```bash
npm --workspace=apps/client-next run build
```

Output: `apps/client-next/.next` directory

### Build Orders Service

```bash
npm --workspace=apps/orders-management-service run build
```

Output: `apps/orders-management-service/dist` directory

## Testing

### Run Unit Tests (Orders Service)

```bash
npm --workspace=apps/orders-management-service run test
```

### Run Tests in Watch Mode

```bash
npm --workspace=apps/orders-management-service run test:watch
```

### Run Tests with Coverage Report

```bash
npm --workspace=apps/orders-management-service run test:cov
```

### Run End-to-End Tests

```bash
npm --workspace=apps/orders-management-service run test:e2e
```

## Linting & Code Formatting

### Lint Frontend

```bash
npm --workspace=apps/client-next run lint
```

### Lint Orders Service

```bash
npm --workspace=apps/orders-management-service run lint
```

### Format Code (Orders Service)

```bash
npm --workspace=apps/orders-management-service run format
```

Formats TypeScript files in `src/` and `test/` directories using Prettier.

## Debugging

### Debug NestJS Service

Start the service in debug mode with watch enabled:

```bash
npm --workspace=apps/orders-management-service run start:debug
```

Then attach your debugger to the Node.js process (e.g., Chrome DevTools or VS Code debugger).

### Debug Next.js Frontend

VS Code:
1. Add a breakpoint in your code
2. Run: `npm run dev:client`
3. Open the VS Code debugger and attach to the Node process

Browser DevTools:
1. Open [http://localhost:3000](http://localhost:3000)
2. Press `F12` or right-click → Inspect to open DevTools
3. Set breakpoints and debug normally

## Development Workflow

1. **Start all services** in separate terminals using the commands above
2. **Make changes** to the respective app code:
   - Frontend: `apps/client-next/src/app/**`
   - Backend: `apps/orders-management-service/src/**`
3. **Auto-reload** will refresh the development servers
4. **Test your changes** using the testing commands
5. **Lint code** before committing: `npm run lint`
6. **Build for production** using the build commands

## Environment Variables

Each application may require environment variables. Check the respective `README.md` files:

- Frontend: `apps/client-next/README.md`
- Orders Service: `apps/orders-management-service/README.md`

Create `.env.local` files in each app directory as needed.

## Common Issues & Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

**For Next.js (port 3000)**:
```bash
npm run dev:client -- --port 3001
```

**For NestJS (port 3001)**:
Export `PORT` environment variable:
```bash
PORT=3002 npm run dev:orders
```

### Dependency Installation Issues

Clear cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Services Not Communicating

Ensure both frontend and backend are running. Check:
1. Frontend is at `http://localhost:3000`
2. Backend is running and accessible
3. Frontend is configured with the correct backend API URL

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Testing Documentation](https://jestjs.io/docs/getting-started)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes with clear messages: `git commit -m "Add feature description"`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

**Please ensure**:
- Code is linted before committing
- Tests pass for your changes
- Commit messages are descriptive

## License

ISC License - See `package.json` for details.

## Support

For questions or issues, please open a GitHub Issue or contact the project maintainers.

---

**Last Updated**: November 2025  
**Version**: 1.0.0
