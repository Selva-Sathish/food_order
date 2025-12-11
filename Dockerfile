FROM node:25-alpine3.22 AS deps

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN if [-f package-lock.json ]; then npm ci --only=production; else npm install --only=production; fi


FROM node:25-alpine3.22 AS builder

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

FROM node:25-alpine3.22 AS runner

WORKDIR /usr/src/app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /usr/src/app ./
RUN chown appuser:appgroup /usr/src/app
USER appuser

ENV NODE_ENV=production
ENV PORT=3000

CMD [ "npm", "start" ]