FROM node:14-alpine AS frontend
WORKDIR /app
COPY ./frontend/package.json ./
RUN npm install --force
COPY ./frontend .
RUN npm run build

FROM nginx:1.19-alpine AS nginx
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend ./app/out /usr/share/nginx/html