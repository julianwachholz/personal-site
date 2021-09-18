FROM nginx:alpine

COPY site.conf /etc/nginx/conf.d/default.conf
COPY html /usr/share/nginx/html
