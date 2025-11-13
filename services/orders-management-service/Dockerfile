# Stage 1 - build
FROM node:20-alpine AS builder
WORKDIR /app

# copy root package.json & workspace lockfile if needed:
COPY package.json package-lock.json ./
COPY apps/orders-management-service/package.json apps/orders-management-service/package.json
COPY . .

RUN npm ci
WORKDIR /app/apps/orders-management-service
RUN npm run build

# Stage 2 - runtime
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/orders-management-service/dist ./dist
COPY apps/orders-management-service/package.json ./package.json
RUN npm ci --production
EXPOSE 3001
CMD ["node", "dist/main.js"]
