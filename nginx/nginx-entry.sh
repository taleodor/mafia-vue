#!/bin/sh
envsubst '$HUB_HOST $HUB_PORT' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf
nginx -g 'daemon off;'