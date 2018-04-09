FROM node:8
ENV HOME=/home/graphql
WORKDIR $HOME
COPY package.json package-lock.json $HOME/
RUN npm install
