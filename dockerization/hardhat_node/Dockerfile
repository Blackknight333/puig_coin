FROM node:lts-alpine3.23
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node package*.json ./
COPY --chown=node:node hardhat.config.ts ./
COPY --chown=node:node tsconfig.json ./
RUN npm install 

EXPOSE 8545

CMD ["npx", "hardhat", "node"]