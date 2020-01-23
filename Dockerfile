FROM node:11.15

WORKDIR /usr/src/stepping-stone

COPY . .

RUN npm audit fix 
RUN npm install

EXPOSE 3000

CMD npm run start
