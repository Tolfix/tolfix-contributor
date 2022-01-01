FROM node:14-alpine AS frontend
WORKDIR /app
COPY ./frontend/package.json ./
RUN npm install --force
COPY ./frontend/ .
RUN npm run build

FROM nginx:1.19-alpine AS nginx
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend ./app/out /usr/share/nginx/html

FROM node:16-alpine AS backend
WORKDIR /b
COPY ./backend/package.json ./
RUN npm install --force
COPY ./backend/ .

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