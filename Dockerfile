# 1단계: 빌드 단계
FROM node:18 AS build

WORKDIR /dongdaemunkiller

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/

COPY --from=build /dongdaemunkiller/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]