FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN yarn global add pnpm@8.0.0 && pnpm i --frozen-lockfile

FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM nginx:stable-alpine as runner

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
