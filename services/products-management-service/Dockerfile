# apps/products-management-service/Dockerfile
################################
# Stage 1: build
################################
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY apps/products-management-service/package.json apps/products-management-service/package.json
COPY apps/products-management-service/tsconfig.json apps/products-management-service/tsconfig.json
COPY . .

RUN npm ci

WORKDIR /usr/src/app/apps/products-management-service
RUN npm run build

################################
# Stage 2: production image
################################
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/apps/products-management-service/dist ./dist
COPY --from=builder /usr/src/app/apps/products-management-service/package.json ./package.json
RUN npm ci --production

EXPOSE 3002
CMD ["node", "dist/main.js"]
