FROM node:10.14.2-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --production --no-progress --silent && mv node_modules ../
COPY . .
EXPOSE 8080
CMD node bin/www
