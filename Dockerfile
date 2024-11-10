FROM node:hydrogen-alpine3.18 as build
WORKDIR /var/www/html
COPY . .
ENV VITE_API_SERVICE=https://api.haik.my.id
RUN npm install
RUN npm run build

FROM nginx:latest
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/html
COPY --from=build /var/www/html/dist .
EXPOSE 80