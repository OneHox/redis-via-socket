FROM node:20

ARG NODE_ENV=development

# Please dont change this here, You can change this via outside
ENV NODE_ENV=${NODE_ENV}

# Set environment variables
ENV PORT=8080

WORKDIR /app
COPY package*.json .
COPY tsconfig.json .

# RUN redis-cli ping
# RUN service redis-server stop
# RUN service redis-server start
# RUN service redis-server status
# RUN service redis-server enable
# RUN service redis-server restart

RUN apt-get update
RUN apt-get -y install nano
RUN apt-get install htop -y
RUN apt-get install redis-server -y
RUN npm install

COPY . .

EXPOSE ${PORT}
CMD [ "npm", "run", "watch" ]