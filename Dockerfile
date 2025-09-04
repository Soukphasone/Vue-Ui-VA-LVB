# Stage 1: Build
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy build output to nginx html folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Optional: custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
