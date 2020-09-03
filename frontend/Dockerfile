FROM node:14.0.9-alpine as build

WORKDIR /app

# copy the react app to the container
COPY . /app/

# prepare for build
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm run build

# nginx
FROM nginx:1.19.2-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]