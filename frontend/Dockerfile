# Build Stage
FROM node:18 AS builder

WORKDIR /app

# Install build dependencies for sqlite3 if needed (debian-based node:18 has most)
# RUN apt-get update && apt-get install -y build-essential python3

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage
FROM node:18 AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/database.sqlite ./database.sqlite

EXPOSE 3000

CMD ["npm", "start"]
