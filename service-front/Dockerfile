FROM node:14.13.1-alpine3.10 as build
WORKDIR /usr/src/app
COPY . .
RUN ls -las
RUN npm i
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /usr/share/nginx/html
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
