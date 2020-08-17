FROM node:14.8.0-buster as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:1.19.1 as artifact-stage
ARG CI_ENV=noci
ARG GIT_COMMIT=git_commit_undefined
ARG GIT_BRANCH=git_branch_undefined
ARG VERSION=not_versioned
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN echo "version=$VERSION" > /usr/share/nginx/html/version.html && echo "commit=$GIT_COMMIT" >> /usr/share/nginx/html/version.html && echo "branch=$GIT_BRANCH" >> /usr/share/nginx/html/version.html
RUN chmod 0755 /usr/share/nginx/html && chmod 0644 -R /usr/share/nginx/html/*
RUN find /usr/share/nginx/html -type d -exec chmod 0755 {} \;
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.template /etc/nginx/
COPY nginx/nginx-entry.sh /
RUN chmod 0700 /nginx-entry.sh
ENV HUB_HOST 172.17.0.1
ENV HUB_PORT 3000
LABEL git_commit $GIT_COMMIT
LABEL git_branch $GIT_BRANCH
LABEL ci_environment $CI_ENV
LABEL version $VERSION
CMD ["/nginx-entry.sh"]