# Stage 1 - build
FROM node:20-alpine AS builder
WORKDIR /app

# copy root package.json & workspace lockfile if needed:
COPY package.json package-lock.json ./
COPY apps/products-management-service/package.json apps/products-management-service/package.json
COPY . .

RUN npm ci
WORKDIR /app/apps/products-management-service
RUN npm run build

# Stage 2 - runtime
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/products-management-service/dist ./dist
COPY apps/products-management-service/package.json ./package.json
RUN npm ci --production
EXPOSE 3002
CMD ["node", "dist/main.js"]
