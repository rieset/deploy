FROM node:18-alpine as build

ENV NODE_ENV="production" \
    USER="source" \
    BUILD_DEPS="" \
    NODE_OPTIONS="--max_old_space_size=2048" \
    HOST="0.0.0.0" \
    PORT="1338"

RUN set -x && \
    apk add --no-cache --virtual build_deps $BUILD_DEPS && \
    addgroup -g 2000 source && \
    adduser -u 2000 -G source -s /bin/sh -D source

WORKDIR /home/$USER

USER $USER

COPY --chown=$USER:$USER . .

RUN yarn install --production=false && \
    yarn build


# -----------
# Serve image
FROM node:18-alpine as serve

LABEL authors="Rie" \
      org.label-schema.vendor="Frontend" \
      org.label-schema.name="Frontend Docker Image" \
      org.label-schema.description="Frontend" \
      org.label-schema.schema-version="1.0"

ENV NODE_ENV="production" \
    USER="app" \
    BUILD_DEPS="bash curl" \
    NODE_OPTIONS="--max_old_space_size=2048" \
    HOST="0.0.0.0" \
    PORT="1338"

RUN set -x && \
    apk add --no-cache --virtual build_deps $BUILD_DEPS && \
    addgroup -g 2000 app && \
    adduser -u 2000 -G app -s /bin/sh -D app

WORKDIR /home/$USER

USER $USER

COPY --chown=$USER:$USER . .
COPY --chown=$USER:$USER --from=build ["/home/source/server.js", "/home/$USER/"]

RUN yarn install --production=true

ENTRYPOINT ["node", "server.js"]
