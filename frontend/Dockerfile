FROM node:15.0.1-alpine3.12 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
# install dependecies, delete node_modules, to ensure clean state
RUN npm ci --silent
# install react scripts and configuration
RUN npm install react-scripts -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.19.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]