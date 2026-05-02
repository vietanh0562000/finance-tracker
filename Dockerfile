# INSTALL DEPENDENCIES 
FROM node:20-alpine as dps 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# BUILD
FROM node:20-alpine as builder 
WORKDIR /app 
COPY --from=dps app/node_modules ./node_modules 
COPY . . 
RUN npm run build

# ======== SERVE BY NGINX ============
FROM nginx:1.27-alpine 
COPY --from=builder ./app/dist ./usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]