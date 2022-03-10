FROM node:16.13.2 AS builder

#crear directorio
WORKDIR /user/src/app

COPY  package.json ./
COPY  package-lock.json ./

RUN npm install

# PARAMETROS IMAGEN
ARG ARG_PORT=3500
# VARIABLES ENTORNO
ENV PORT=${ARG_PORT}

COPY . .
EXPOSE ${ARG_PORT}
CMD ["npm", "run", "start:dev"]