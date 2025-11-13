# apps/orders-management-service/Dockerfile
################################
# Stage 1: build
################################
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# copy workspace files first (speeds up cache)
COPY package.json package-lock.json ./
COPY services/orders-management-service/package.json services/orders-management-service/package.json
COPY services/orders-management-service/tsconfig.json services/orders-management-service/tsconfig.json
# copy the rest
COPY . .

# install deps (root workspace)
RUN npm ci

# build orders-management-service
WORKDIR /usr/src/app/services/orders-management-service
RUN npm run build

################################
# Stage 2: production image
################################
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# copy built app from builder
COPY --from=builder /usr/src/app/services/orders-management-service/dist ./dist
COPY --from=builder /usr/src/app/services/orders-management-service/package.json ./package.json
COPY --from=builder /usr/src/app/services/orders-management-service/package-lock.json ./package-lock.json
# install only production deps for orders-management-service
RUN npm ci --omit=dev

EXPOSE 3001
CMD ["node", "dist/main.js"]
