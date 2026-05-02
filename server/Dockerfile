FROM node:20-alpine 

WORKDIR ./

COPY db.json .

RUN npm install -g json-server 

EXPOSE 3001

CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3001"]
