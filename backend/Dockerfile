FROM node:16-alpine AS backend

RUN apk update && \
    apk upgrade && \
    apk add git

RUN npm install -g @types/node \
    && npm install -g typescript@4.3.5

WORKDIR /backend
COPY ./backend/package.json ./
RUN npm install --force
COPY ./backend ./
RUN tsc -b

ENV DISCORD_TOKEN=""
ENV DISCORD_CLIENT_ID=""
ENV DISCORD_CLIENT_SECRET=""
ENV MONGO_URI=""
ENV GITHUB_CLIENT_ID=""
ENV GITHUB_CLIENT_SECRET=""
ENV SMTP_HOST=""
ENV SMTP_PORT=""
ENV SMTP_USER=""
ENV SMTP_PASS=""

CMD [ "node", "./build/Main.js" ]