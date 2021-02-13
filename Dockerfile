FROM node:14-alpine AS nodecg

WORKDIR /app

RUN apk --no-cache add git &&\
    git clone --branch legacy-1.x https://github.com/nodecg/nodecg.git &&\
    cd nodecg &&\
    npm install --production


FROM node:14-alpine AS node_modules

RUN apk --no-cache add git

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM node:14-alpine

WORKDIR /app

COPY --from=nodecg /app/nodecg ./nodecg
COPY --from=node_modules /app/node_modules ./nodecg/bundles/rttr_layouts/node_modules
COPY package*.json ./nodecg/bundles/rttr_layouts/

WORKDIR /app/nodecg

CMD ["node", "index.js"]