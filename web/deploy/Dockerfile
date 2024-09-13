FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN yarn global add pnpm@8.0.0 && pnpm i --frozen-lockfile

FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 80
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/locales ./locales
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 80
CMD ["npm", "run", "start"]
