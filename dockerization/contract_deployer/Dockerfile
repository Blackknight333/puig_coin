FROM node:lts-alpine3.23
RUN mkdir -p /home/node/app && chown node:node /home/node/app
RUN mkdir -p /home/node/app/ignition && chown node:node /home/node/app/ignition
RUN mkdir -p /home/node/app/contracts && chown node:node /home/node/app/ignition
RUN mkdir -p /home/node/app/dockerization && chown node:node /home/node/app/dockerization
RUN mkdir -p /home/node/app/dockerization/contract_deployer && chown node:node /home/node/app/dockerization/contract_deployer

WORKDIR /home/node/app
USER node
COPY --chown=node:node package*.json ./
COPY --chown=node:node hardhat.config.ts ./
COPY --chown=node:node tsconfig.json ./

RUN npm install

CMD ["./dockerization/contract_deployer/entry_point.sh"]