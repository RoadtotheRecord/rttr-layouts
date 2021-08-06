### nodecg install
FROM node:14-alpine AS nodecg
WORKDIR /app
RUN apk --no-cache add git &&\
    git clone --branch legacy-1.x https://github.com/nodecg/nodecg.git &&\
    cd nodecg &&\
    npm install --production

### node_modules install
FROM node:14-alpine AS node_modules
RUN apk --no-cache add git
WORKDIR /app
COPY package*.json ./
RUN npm install

### nodecg start
FROM node:14-alpine
ARG LAYOUTS_NAME
WORKDIR /app
COPY --from=nodecg /app/nodecg ./nodecg
COPY --from=node_modules /app/node_modules ./nodecg/bundles/${LAYOUTS_NAME}/node_modules
COPY package*.json ./nodecg/bundles/${LAYOUTS_NAME}/
WORKDIR /app/nodecg
CMD ["node", "index.js"]